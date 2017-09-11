/**
 * https://github.com/xieziyu/angular2-echarts/blob/master/src/directive/angular-echarts.directive.ts
 */

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

declare const mu: any, jQuery: any;

@Directive({
    selector: '[mn-echarts-render]'
})
export class MnEchartsRenderDirective implements OnChanges, OnDestroy, AfterViewInit {
    @Input() options: any;
    @Input() dataset: any[];
    @Input() theme: string;
    @Input() loading: boolean;

    // chart events:
    @Output() mycharts: EventEmitter<any> = new EventEmitter<any>();
    @Output() element: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartDblClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartMouseDown: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartMouseUp: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartMouseOver: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartMouseOut: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartGlobalOut: EventEmitter<any> = new EventEmitter<any>();

    private _chart: any = null;
    private currentWindowWidth: any = null;

    constructor(private _ref: ElementRef) {
    }

    ngAfterViewInit(): void {
        this.element.emit(this._ref.nativeElement);
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
        console.debug('ooOoooOoooOOOooo');
        let echarts_ = echarts.init(this._ref.nativeElement);
        this.mycharts.emit(echarts_);
        return echarts_;
    }

    private updateChart(): void {
        // this._chart.clear();

        const width = this.getWidth(this._ref.nativeElement);
        const height = this.getHeight(this._ref.nativeElement);
        mu.run(width || height, () => {
            this._ref.nativeElement.style.width = width + 'px';
            this._ref.nativeElement.style.height = height + 'px';

        });

        /**
         * 根据 legend， 调整 grid.top || grid bottom
         */
        // mu.run(mu.prop(this.options, 'legend.show'), () => {
        //     let legend = mu.map(mu.prop(this.options, 'legend.data'), (o) => o.name || o);
        //     let len = legend.join(',').length + 5 * legend.length;
        //     let h = Math.ceil(len * 7 / width) + 1.5;
        //
        //     this.options.grid.bottom = h * 54;
        //
        //     console.debug(this.options.grid.bottom, h, len, width);
        //
        // });
        this._chart.setOption(this.options);
        this._chart.resize();
    }

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

        console.debug(':::::opt', opt);

        if (opt) {
            if (!this._chart) {
                this._chart = this.createChart();

                // register events:
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

    private registerEvents(myChart: any): void {
        if (myChart) {
            // register mouse events:
            myChart.on('click', (e: any) => {
                this.chartClick.emit(e);
            });
            myChart.on('dblClick', (e: any) => {
                this.chartDblClick.emit(e);
            });
            myChart.on('mousedown', (e: any) => {
                this.chartMouseDown.emit(e);
            });
            myChart.on('mouseup', (e: any) => {
                this.chartMouseUp.emit(e);
            });
            myChart.on('mouseover', (e: any) => {
                this.chartMouseOver.emit(e);
            });
            myChart.on('mouseout', (e: any) => {
                this.chartMouseOut.emit(e);
            });
            myChart.on('globalout', (e: any) => {
                this.chartGlobalOut.emit(e);
            });
        }
    }
}
