/**
 * https://github.com/xieziyu/angular2-echarts/blob/master/src/directive/angular-echarts.directive.ts
 */

// "echarts": "3.6.2",
// "echarts-wordcloud": "1.1.0",
// "zrender": "3.5.2"

import {
    Directive,
    ElementRef,
    Input,
    Output,
    HostListener,
    OnChanges,
    OnDestroy,
    SimpleChange,
    EventEmitter, AfterViewInit
} from '@angular/core';

import * as echarts from 'echarts';
import 'echarts-wordcloud/dist/echarts-wordcloud.min';
import {MnEchartsServices} from './mn-echarts.service';

declare const mu: any, jQuery: any;

@Directive({
    selector: '[mn-echarts-render]'
})
export class MnEchartsRenderDirective implements OnChanges, OnDestroy, AfterViewInit {
    @Input() options: any;
    @Input() dataset: any[];
    @Input() theme: string;
    @Input() loading: boolean;

    @Output() result: EventEmitter<any> = new EventEmitter<any>();

    @Output() chartClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartDblClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartMouseDown: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartMouseUp: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartMouseOver: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartMouseOut: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartGlobalOut: EventEmitter<any> = new EventEmitter<any>();

    // callback 返回对象
    // ref, $chart, width, height
    private _result: any = {};

    private _chart: any = null;
    private currentWindowWidth: any = null;

    constructor(private _ref: ElementRef,
                private _es: MnEchartsServices) {

        this._result['ref'] = this._ref;
        this.result.emit(this._result);

        const $el = jQuery(this._ref.nativeElement.parentElement);

        $el.mnResize(() => {
            mu.run(this._chart, () => {
                this._chart.resize({
                    width: $el.width(),
                    height: $el.height()
                });
            });
        });

    }

    ngAfterViewInit(): void {
        mu.run(this._chart, () => {
            this._chart.resize();
        });
    }

    private getWidth(elm: Element): number {
        if (elm) {
            const $el = jQuery(elm);
            return $el.width() || this.getWidth(elm.parentElement);
        } else {
            return 0;
        }
    }

    private getHeight(elm: Element): number {
        return elm && (elm.clientHeight || this.getHeight(elm.parentElement));
    }

    private createChart(): any {
        this.theme = this.theme || 'default';
        this.currentWindowWidth = window.innerWidth;
        const $chart = echarts.init(this._ref.nativeElement);
        this._result['$chart'] = $chart;
        this.result.emit(this._result);
        return $chart;
    }

    private updateChart(): void {
        let _width = 0, _height = 0;

        /**
         * 在部分的浏览器或标签中不能正确的识别小数
         * 或多或少会四舍五入又或进一，造成最终计算宽度的时候
         * 超过 100%
         */
        mu.run(this.getWidth(this._ref.nativeElement), (w) => {
            _width = Math.floor(w);
            this._ref.nativeElement.style.width = _width + 'px';
        });
        mu.run(this.getHeight(this._ref.nativeElement), (h) => {
            _height = Math.floor(h);
            this._ref.nativeElement.style.height = _height + 'px';
        });
        this._result['width'] = _width;
        this._result['height'] = _height;
        this.result.emit(this._result);
        this.options = this._es.adjustOptionsWithLegend(this.options, _width, _height);
        this._de(this._chart, this.options);
    }

    _de: any = mu.debounce((_chart, options) => {
        // 确保 wordcloud 清理的缓存
        // 但可能会造成内存消耗过大
        // 持续跟踪
        if (mu.prop(options, 'series.0.type') === 'wordCloud') {
            _chart.clear();
        }
        _chart.setOption(options, true);
        _chart.resize();
    }, 300);

    @HostListener('window:resize', ['$event'])
    onWindowResize(event: any): void {
        if (event.target.innerWidth !== this.currentWindowWidth) {
            this.currentWindowWidth = event.target.innerWidth;
            if (this._chart) {
                this._chart.resize();
            }
        }
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }): void {
        if (changes['dataset']) {
            this.onDatasetChange(this.dataset);
        }

        if (changes['options']) {
            this.onOptionsChange(this.options);

            setTimeout(() => {
                this.onOptionsChange(this.options);
                this.onOptionsChange(this.options);
                this.onOptionsChange(this.options);
            }, 200);
        }

        // -> 空的options, 不渲染echarts
        // mu.run(mu.prop(changes, 'options.currentValue'), (options) => {
        //     this.onOptionsChange(options);
        // });

        // this.onLoadingChange(true);

        if (changes['loading']) {
            this.onLoadingChange(this.loading);
        }
    }

    ngOnDestroy(): void {
        if (this._chart) {
            this._chart.dispose();
            this._chart = null;
        }
    }

    private onOptionsChange(opt: any): void {

        if (opt) {
            if (!this._chart) {
                this._chart = this.createChart();
                this.registerEvents(this._chart);
            }

            if (this.hasData()) {
                this.updateChart();
            } else if (this.dataset && this.dataset.length) {
                this.mergeDataset(this.dataset);
                this.updateChart();
            } else {
                this.updateChart();
            }
        }
    }

    private onDatasetChange(dataset: any[]): void {
        if (this._chart && this.options) {
            if (!this.options.series) {
                this.options.series = [];
            }

            this.mergeDataset(dataset);
            this.updateChart();
        }
    }

    private onLoadingChange(loading: boolean): void {
        if (this._chart) {
            if (loading) {
                this._chart.showLoading({
                    text: '',
                    color: 'rgba(48, 127, 255, 0.9)',
                    textColor: '#000',
                    maskColor: 'rgba(255, 255, 255, 0.6)',
                    zlevel: 0
                });
            } else {
                this._chart.hideLoading();
            }
        }
    }

    private mergeDataset(dataset: any[]): void {
        for (let i = 0, len = dataset.length; i < len; i++) {
            if (!this.options.series[i]) {
                this.options.series[i] = {data: dataset[i]};
            } else {
                this.options.series[i].data = dataset[i];
            }
        }
    }

    /**
     * method to check if the option has dataset.
     */
    private hasData(): boolean {
        if (!this.options.series || !this.options.series.length) {
            return false;
        }

        for (const serie of this.options.series) {
            if (serie.data && serie.data.length > 0) {
                return true;
            }
        }

        return false;
    }

    private registerEvents(_chart: any): void {
        if (_chart) {
            // register mouse events:
            _chart.on('click', (e: any) => {
                this.chartClick.emit(e);
            });
            _chart.on('dblClick', (e: any) => {
                this.chartDblClick.emit(e);
            });
            _chart.on('mousedown', (e: any) => {
                this.chartMouseDown.emit(e);
            });
            _chart.on('mouseup', (e: any) => {
                this.chartMouseUp.emit(e);
            });
            _chart.on('mouseover', (e: any) => {
                this.chartMouseOver.emit(e);
            });
            _chart.on('mouseout', (e: any) => {
                this.chartMouseOut.emit(e);
            });
            _chart.on('globalout', (e: any) => {
                this.chartGlobalOut.emit(e);
            });
        }
    }
}
