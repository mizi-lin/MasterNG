import {
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {MnEchartsServices} from './mn-echarts.service';
import '../assets/jquery.resize.js';
import {MnFileSaverServices} from '../mn-common/services/mn-fileSaver.services';

declare const mu: any, jQuery: any;

/**
 *  mnEchartPanel
 *  可由 ajax, data, options 快速会出charts
 *
 *  其构造由 mnPanel > mnReq + mnPrepend + mnAppend 组成
 *
 *  mnPanel > mnPanelHeader ( > mnPanelTitle > mnPanelToolbar ) + mnPanelBody
 *  mnReq > mnLoader + mnGutter + mnDynamic + mnEchart > mnEchartRender
 *
 *  mnEchartPanle 主体由 mnReq 构成
 *  所以默认 mnReq 的 loader UI 显示位置前置至 mnPanelBody prepend 位置
 */

@Component({
    selector: 'mn-echarts-panel, mn-echarts-box',
    styleUrls: ['./mn-echarts-box.scss', '../assets/fonts/iconfont.scss'],
    encapsulation: ViewEncapsulation.None,
    template: `
        <mn-panel [hph]="true">
            <mn-panel-header>
                <mn-panel-title [innerHTML]="_title"></mn-panel-title>
                <mn-panel-toolbar [tools]="_tools" [class.toggle]="showTools === 'toggle'" [class.hide]="showTools === 'hide'">

                    <ng-template [ngIf]="toolMap['download']">
                        <mn-col (click)="download_click($event)"
                                [order]="toolMap['download'].order">
                            <i class="icon iconfont icon-xiazai" mnTooltip="download"></i>
                        </mn-col>
                    </ng-template>

                    <ng-template [ngIf]="toolMap['data_view']">
                        <mn-col (click)="dataView_click($event)"
                                [order]="toolMap['data_view'].order"
                                [class.active]="statusMap.dataView_click">
                            <i class="icon iconfont icon-table" mnTooltip="table"></i>
                        </mn-col>
                    </ng-template>

                    <ng-template [ngIf]="toolMap['line']">
                        <mn-col *ngIf="_src_type | mu:'or':'bar'"
                                (click)="line_click($event)"
                                [order]="toolMap['line'].order"
                                [class.active]="statusMap.line_click">
                            <i class="fa fa-line-chart" mnTooltip="line chart"></i>
                        </mn-col>
                    </ng-template>

                    <ng-template [ngIf]="toolMap['bar']">
                        <mn-col *ngIf="_src_type | mu:'or':'line'"
                                (click)="bar_click($event)"
                                [order]="toolMap['bar'].order"
                                [class.active]="statusMap.bar_click">
                            <i class="icon iconfont icon-bar" mnTooltip="bar chart"></i>
                        </mn-col>
                    </ng-template>

                    <ng-template [ngIf]="toolMap['exchange']">
                        <mn-col *ngIf="_src_type | mu:'or':'line':'bar'"
                                (click)="exchange_click($event)"
                                [order]="toolMap['exchange'].order"
                                [class.active]="statusMap.exchange_click">
                            <i class="icon iconfont icon-rotate" mnTooltip="rotate"></i>
                        </mn-col>
                    </ng-template>

                    <ng-template [ngIf]="toolMap['rate']">
                        <mn-col *ngIf="_src_type | mu:'or':'line':'bar'"
                                (click)="precent_rate_click($event)"
                                [order]="toolMap['rate'].order"
                                [class.active]="statusMap.precent_rate_click">
                            <i class="icon iconfont icon-percent" mnTooltip="percentage"></i>
                        </mn-col>
                    </ng-template>

                    <ng-template [ngIf]="toolMap['label_all']">
                        <mn-col *ngIf="_src_type | mu:'or':'line':'bar'"
                                (click)="label_show_all_click($event)"
                                [order]="toolMap['label_all'].order"
                                [class.active]="statusMap.label_show_all_click">
                            <i class="icon iconfont icon-liebiaodanchu" mnTooltip="show all"></i>
                        </mn-col>
                    </ng-template>

                    <ng-template [ngIf]="toolMap['legend']">
                        <mn-col (click)="legend_show_click($event)"
                                [order]="toolMap['legend'].order"
                                [class.active]="statusMap.legend_show_click">
                            <i class="icon iconfont icon-yincang" mnTooltip="show/hide legends"></i>
                        </mn-col>
                    </ng-template>

                    <ng-template [ngIf]="toolMap['sort']">
                        <mn-col [order]="toolMap['sort'].order"
                                [class.active]="statusMap.sortClick">
                            <mn-dropdown (mnResult)="_dropDownResult = $event">
                                <i class="icon iconfont icon-sort-copy" mnTooltip="icon-sort-copy"></i>
                                <mn-dropdown-content>
                                    <ol class="mnc-list">
                                        <li (click)="sortAllClick($event)">
                                            By All
                                        </li>
                                        <li class="mnc-divider"></li>
                                        <li *ngFor="let legend of _options?.legend?.data"
                                            (click)="sortClick(legend.name, $event)">
                                            By {{legend.name}}
                                        </li>
                                        <li class="mnc-divider"></li>
                                        <li (click)="clearSortClick($event)">
                                            Clear
                                        </li>
                                    </ol>
                                </mn-dropdown-content>
                            </mn-dropdown>
                        </mn-col>
                    </ng-template>

                    <ng-template [ngIf]="toolMap['reload']">
                        <mn-col (click)="reload_click($event)"
                                [order]="toolMap['reload'].order">
                            <i class="icon iconfont icon-shuaxin" mnTooltip="refresh"></i>
                        </mn-col>
                    </ng-template>
                </mn-panel-toolbar>
            </mn-panel-header>
            <mn-panel-body class="mnc-tb" mnElement #panelBody="element">

                <ng-content select="mn-prepend"></ng-content>

                <div class="mnc-tb-row">
                    <mn-req #panel
                            [mnShowGutter]="_show_gutter"
                            [mnShowLoading]="_show_loading"
                            [loader]="loader || panelBody"
                            [loaderStyle]="loaderStyle"
                            [req]="req"
                            [mnData]="data"
                            (result)="_data = _reqResult($event.data, $event) || $event.data">

                        <div class="mn-dataView" *ngIf="_show_dataView">
                            <table class="table bordered td-top-bd td-left-bd">
                                <tbody>
                                    <tr *ngFor="let dd of _dataView">
                                        <td *ngFor="let d of dd">
                                            {{d || '-' | mu:'format'}}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <mn-echarts [style.height]="height"
                                    [setting]="setting"
                                    [options]="options"
                                    [type]="type"
                                    [data]="_data || data"
                                    (chartClick)="chartClick.emit($event)"
                                    (chartDblClick)="chartDblClick.emit($event)"
                                    (chartMouseDown)="chartMouseDown.emit($event)"
                                    (chartMouseUp)="chartMouseUp.emit($event)"
                                    (chartMouseOver)="chartMouseOver.emit($event)"
                                    (chartMouseOut)="chartMouseOut.emit($event)"
                                    (chartGlobalOut)="chartGlobalOut.emit($event)"
                                    (result)="_result($event)"></mn-echarts>
                    </mn-req>
                </div>

                <ng-content select="mn-append"></ng-content>
            </mn-panel-body>
        </mn-panel>
    `

})
export class MnEchartsPanelComponent implements OnChanges {

    @ViewChild('panel', {read: ElementRef}) _panel: ElementRef;

    @Input() req: any;
    @Input() type: string;
    @Input() height: string;
    @Input() options: any;
    @Input() setting: any;
    @Input() tools: string;
    @Input() filename: string = 'MasterNg';

    @Input() loader: ElementRef;
    @Input() loaderStyle: any;

    @Input('mnReqResult')
    _reqResult($event: any = {}, data: any = {}) {
        return $event.data;
    }

    /**
     * showTools
     * show, toggle
     */
    @Input('mnShowTools') showTools = 'show';
    @Input() data: any;

    // 让控件支持高度100%
    // height percent hundred
    @Input() hph: boolean | string = true;

    @HostBinding('style.height')
    get getHph() {
        return this.hph === true ? '100%' : this.hph === false ? 'auto' : this.hph;
    }

    @Input('mnShowGutter') _show_gutter: boolean = true;
    @Input('mnShowLoading') _show_loading: boolean = true;

    @Input()
    set title(v) {
        this._title = v || '';
        const [parent, sub] = this._title.split('::');
        mu.run(parent || sub, () => {
            this._title = parent + mu.run(sub, (sub) => `<small>${sub}</small>`, () => '');
        });
    }

    @Output() result: any = new EventEmitter();
    @Output() chartClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartDblClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartMouseDown: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartMouseUp: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartMouseOver: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartMouseOut: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartGlobalOut: EventEmitter<any> = new EventEmitter<any>();

    _title: string;
    _data: any;
    _src_setting: any;
    _src_type: any;
    _show_dataView = false;
    // fullscreen, download, data_view, line, bar, exchange, rate, label_all, legend, reload
    _tools: any[] = [];
    _sort: string;

    _chart: any;
    _dataView: any = [];
    _options: any;
    // 数据源
    _source: any;

    statusMap: any = {};
    toolMap: any = {};
    hide_title: boolean = false;

    def: any = {};

    _dropDownResult: any;

    setStatus(fnKey: string, bool?: boolean): void {
        this.statusMap[fnKey] = mu.ifnvl(bool, !this.statusMap[fnKey]);
    }

    _config: any;

    constructor(private _es: MnEchartsServices,
                private _mnFileSaverServ: MnFileSaverServices,
                private _ref: ElementRef) {
        if (this._ref.nativeElement.nodeName === 'ECHARTS-BOX') {
            this.hide_title = true;
        }

        this._config = this._es.getConfig();
    }

    ngOnChanges(changes: SimpleChanges) {

        /**
         * showTools 设置值
         */
        mu.empty(mu.prop(changes, 'showTools.currentValue'), () => {
            if (this._config.showTools) {
                this.showTools = this._config.showTools;
            }
        });

        mu.exist(changes['setting'], (changes_setting) => {
            this.setting = this.setting || {};
            if (changes_setting.firstChange) {
                this._src_setting = mu.clone(this.setting);
            }
        });

        mu.exist(changes['type'], (type_changes) => {
            if (type_changes.firstChange) {
                this._src_type = type_changes.currentValue;

                mu.empty(this.toolMap, () => {
                    if (this._config.toolbars) {
                        this.toolMap = this._getToolMap(this._config[type_changes.currentValue]);
                        mu.run(this.toolMap['fullscreen'], (o) => {
                            this._tools.push({
                                name: 'fullscreen',
                                click: this.fullScreenClick,
                                order: o.order
                            });
                        });
                    }
                });

            }
        });

        mu.exist(changes['tools'], () => {
            this.toolMap = this._getToolMap(this.tools);
            mu.run(this.toolMap['fullscreen'], (o) => {
                this._tools.push({
                    name: 'fullscreen',
                    click: this.fullScreenClick,
                    order: o.order
                });
            });
        });
    }

    _result(rst: any) {
        this._options = rst.options;
        this._dataView = rst.dataView;
        this._source = rst.source;
        this._chart = rst.$chart;
        this.result.emit(rst);
    }

    _getToolMap(maps: any = []): any {
        return mu.map(maps, (key, i) => {
            if (typeof key === 'string') {
                key = {
                    name: key
                };
            }

            key.order = key.order || (i + 1) * 10;
            // key.click = key.click || mu.noop;

            key._click = ($event) => {
                if (key.click) {
                    return key.click($event);
                }
            };

            return {
                __key__: key.name,
                __val__: key
            };
        }, {});
    }

    download_click($event) {
        const content = this._mnFileSaverServ.csvData(this._dataView);
        // console.debug(content);
        this._mnFileSaverServ.fileSaver([content], this.filename + ('_' + +new Date()) + '.csv');
    }

    dataView_click($event) {
        this._show_dataView = !this._show_dataView;
        this.setStatus('dataView_click');
    }

    line_click($event): void {
        this.type = 'line' === this.type ? this._src_type : 'line';
        this.setStatus('line_click');
    }

    bar_click($event): void {
        this.type = 'bar' === this.type ? this._src_type : 'bar';
        this.setStatus('bar_click');
    }

    exchange_click($event): void {
        this.setting = mu.clone(this.setting || {});
        this.setting.xy_exchange = !this.setting.xy_exchange;
        this.setStatus('exchange_click');
    }

    /**
     * 百分比结构图
     * @param $event
     */
    precent_rate_click($event): void {
        this.setting = mu.clone(this.setting || {});
        this.setting.percent_rate = !this.setting.percent_rate;
        this.setting.yAxis_value_percent = !this.setting.yAxis_value_percent;
        this.setStatus('precent_rate_click');
    }

    label_show_all_click($event): void {
        this.setting = mu.clone(this.setting || {});
        this.setting.rotate = this.setting.rotate ? 0 : 30;
        this.setStatus('label_show_all_click');
    }

    legend_show_click($event): void {
        this.setting = mu.clone(this.setting || {});
        this.setting.legend_show = !this._options.legend.show;
        this.setStatus('legend_show_click');
    }

    reload_click($event): void {
        mu.run(this.req, req => {
            this.req = mu.clone(req);
        });

        mu.run(this.data, data => {
            this.data = mu.clone(data);
        });

        this.setStatus('reload_click');
    }

    sortClick(legend): void {
        this._sort = this._sort === 'desc' ? 'asc' : 'desc';
        this.setting = mu.clone(this.setting || {});
        this.setting.legend_show = true;
        this.setting.sort = `${legend}:${this._sort}`;
        this.setting.zero = false;
        this.setting.sort_all = false;
        this.setStatus('sortClick', true);
        this._dropDownResult.hide();
    }

    sortAllClick(): void {
        this._sort = this._sort === 'desc' ? 'asc' : 'desc';
        this.setting = mu.clone(this.setting || {});
        this.setting.sort = `${mu.prop(this._options, 'legend.data.0.name')}:${this._sort}`;
        this.setting.sort_all = true;
        this.setting.zero = false;
        this.setStatus('sortClick', true);
        this._dropDownResult.hide();
    }

    clearSortClick($event): void {
        this.setting = mu.clone(this.setting || {});
        this.setting.sort = void 0;
        this.setting.zero = void 0;
        this.setStatus('sortClick', false);
        this._dropDownResult.hide();
    }

    fullScreenClick: any = (full: any, $event: any) => {
        // 自定义方法
        mu.run(this.toolMap['fullscreen'].click, fn => fn(full, $event));
        this.setStatus('fullScreenClick');
    };
}
