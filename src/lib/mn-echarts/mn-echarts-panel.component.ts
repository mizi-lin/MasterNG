import {
    Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, Output, SimpleChanges, ViewChild,
    ViewChildren, ViewEncapsulation
} from '@angular/core';
import {MnEchartsServices} from './mn-echarts.service';
import '../assets/jquery.resize.js';
import {MnFileSaverServices} from '../mn-common/services/mn-file-saver.services';

declare const mu: any, jQuery: any;

@Component({
    selector: 'mn-echarts-panel, mn-echarts-box',
    styleUrls: ['./mn-echarts.scss', '../assets/fonts/iconfont.scss'],
    encapsulation: ViewEncapsulation.None,
    template: `
        <mn-panel [hph]="true">
            <mn-panel-header>
                <mn-panel-title [innerHTML]="_title"></mn-panel-title>
                <mn-panel-toolbar [tools]="_tools" [class.toggle]="show_tools === 'toggle'">

                    <ng-template [ngIf]="toolMap['download']">
                        <mn-col (click)="download_click($event)"
                                [order]="toolMap['download'].order">

                            <nz-tooltip [nzTitle]="'download'">
                                <i class="icon iconfont icon-xiazai" nz-tooltip></i>
                            </nz-tooltip>
                            
                        </mn-col>
                    </ng-template>

                    <ng-template [ngIf]="toolMap['data_view']">
                        <mn-col (click)="dataView_click($event)"
                                [order]="toolMap['data_view'].order"
                                [class.active]="statusMap.dataView_click">
                            <nz-tooltip [nzTitle]="'table'">
                                <i class="icon iconfont icon-table" nz-tooltip></i>
                            </nz-tooltip>
                        </mn-col>
                    </ng-template>

                    <ng-template [ngIf]="toolMap['line']">
                        <mn-col *ngIf="_src_type | mu:'or':'bar'"
                                (click)="line_click($event)"
                                [order]="toolMap['line'].order"
                                [class.active]="statusMap.line_click">
                            <nz-tooltip [nzTitle]="'line chart'">
                                <i class="fa fa-line-chart" nz-tooltip></i>
                            </nz-tooltip>
                            
                        </mn-col>
                    </ng-template>

                    <ng-template [ngIf]="toolMap['bar']">
                        <mn-col *ngIf="_src_type | mu:'or':'line'"
                                (click)="bar_click($event)"
                                [order]="toolMap['bar'].order"
                                [class.active]="statusMap.bar_click">
                            <nz-tooltip [nzTitle]="'bar chart'">
                                <i class="icon iconfont icon-bar" nz-tooltip></i>
                            </nz-tooltip>
                            
                        </mn-col>
                    </ng-template>

                    <ng-template [ngIf]="toolMap['exchange']">
                        <mn-col *ngIf="_src_type | mu:'or':'line':'bar'"
                                (click)="exchange_click($event)"
                                [order]="toolMap['exchange'].order"
                                [class.active]="statusMap.exchange_click">
                            <nz-tooltip [nzTitle]="'rotate'">
                                <i class="icon iconfont icon-rotate" nz-tooltip></i>
                            </nz-tooltip>
                        </mn-col>
                    </ng-template>

                    <ng-template [ngIf]="toolMap['rate']">
                        <mn-col *ngIf="_src_type | mu:'or':'line':'bar'"
                                (click)="precent_rate_click($event)"
                                [order]="toolMap['rate'].order"
                                [class.active]="statusMap.precent_rate_click">
                            <nz-tooltip [nzTitle]="'percentage'">
                                <i class="icon iconfont icon-percent" nz-tooltip></i>
                            </nz-tooltip>
                        </mn-col>
                    </ng-template>

                    <ng-template [ngIf]="toolMap['label_all']">
                        <mn-col *ngIf="_src_type | mu:'or':'line':'bar'"
                                (click)="label_show_all_click($event)"
                                [order]="toolMap['label_all'].order"
                                [class.active]="statusMap.label_show_all_click">
                            <nz-tooltip [nzTitle]="'show all'">
                                <i class="icon iconfont icon-liebiaodanchu" nz-tooltip></i>
                            </nz-tooltip>
                        </mn-col>
                    </ng-template>

                    <ng-template [ngIf]="toolMap['legend']">
                        <mn-col (click)="legend_show_click($event)"
                                [order]="toolMap['legend'].order"
                                [class.active]="statusMap.legend_show_click">
                            <nz-tooltip [nzTitle]="'show/hide legends'">
                                <i class="icon iconfont icon-yincang" nz-tooltip></i>
                            </nz-tooltip>
                        </mn-col>
                    </ng-template>

                    <ng-template [ngIf]="toolMap['sort']">
                        <mn-col [order]="toolMap['sort'].order"
                                [class.active]="statusMap.sort_click">

                            <!-- <todo 暂时先使用 nz-zorro> -->

                            <nz-dropdown>
                                <a class="ant-dropdown-link" nz-dropdown>
                                    <nz-tooltip [nzTitle]="'order'">
                                        <i class="icon iconfont icon-sort-copy" nz-tooltip></i>
                                    </nz-tooltip>
                                </a>
                                <ul nz-menu>
                                    <li nz-menu-item
                                        (click)="sort_all_click($event)">
                                        by All
                                    </li>
                                    <li nz-menu-divider></li>
                                    <li nz-menu-item
                                        *ngFor="let legend of _options?.legend?.data"
                                        (click)="sort_click(legend.name, $event)">
                                        by {{legend.name}}
                                    </li>
                                    
                                    <li nz-menu-divider></li>
                                    <li nz-menu-item
                                        (click)="clear_sort_click($event)">
                                        Clear
                                    </li>
                                </ul>
                            </nz-dropdown>
                        </mn-col>
                    </ng-template>

                    <ng-template [ngIf]="toolMap['reload']">
                        <mn-col (click)="reload_click($event)"
                                [order]="toolMap['reload'].order">

                            <nz-tooltip [nzTitle]="'refresh'">
                                <i class="icon iconfont icon-shuaxin" nz-tooltip></i>
                            </nz-tooltip>
                            
                        </mn-col>
                    </ng-template>
                </mn-panel-toolbar>
            </mn-panel-header>
            <mn-panel-body>
                <mn-req #panel
                        [loader]="loader"
                        [loaderStyle]="loaderStyle"
                        [req]="req"
                        (result)="_data = $event.data">

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
    @Input() where: any;
    @Input() tools: string;
    @Input() filename: string = 'MasterNg';

    @Input() loader: ElementRef;
    @Input() loaderStyle: any;

    /**
     * show_tools
     * show, toggle
     */
    @Input() show_tools = 'show';

    @Input() data: any;

    // 让控件支持高度100%
    // height percent hundred
    @Input() hph: boolean | string = true;

    @HostBinding('style.height')
    get getHph() {
        return this.hph === true ? '100%' : this.hph === false ? 'auto' : this.hph;
    }

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
         * show_tools 设置值
         */
        mu.empty(mu.prop(changes, 'show_tools.currentValue'), () => {
            if (this._config.show_tools) {
                this.show_tools = this._config.show_tools;
            }
        });

        mu.exist(changes['setting'], (changes_setting) => {
            if (changes_setting.first) {
                this._src_setting = mu.clone(this.setting);

            }
            this.setting.__where__ = this.where;
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
                                click: this.fullscreen_click,
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
                    click: this.fullscreen_click,
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
        console.debug(content);
        this._mnFileSaverServ.fileSaver([content], this.filename + ('_' + + new Date()) + '.csv');
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
        this.req = mu.clone(this.req);
        this.setStatus('reload_click');
    }

    sort_click(legend): void {
        this._sort = this._sort === 'desc' ? 'asc' : 'desc';
        this.setting = mu.clone(this.setting || {});
        this.setting.legend_show = true;
        this.setting.sort = `${legend}:${this._sort}`;
        this.setting.zero = false;
        this.setting.sort_all = false;
        this.setStatus('sort_click', true);
    }

    sort_all_click(): void {
        this._sort = this._sort === 'desc' ? 'asc' : 'desc';
        this.setting = mu.clone(this.setting || {});
        this.setting.sort = `${mu.prop(this._options, 'legend.data.0.name')}:${this._sort}`;
        this.setting.sort_all = true;
        this.setting.zero = false;
        this.setStatus('sort_click', true);
    }

    clear_sort_click($event): void {
        this.setting = mu.clone(this.setting || {});
        this.setting.sort = void 0;
        this.setting.zero = void 0;
        this.setStatus('sort_click', false);
    }

    fullscreen_click: any = (full: any, $event: any) => {
        const $el = jQuery(this._panel.nativeElement);
        $el.mnResize(() => {
            this._chart.resize({
                width: $el.width(),
                height: $el.height()
            });
        });

        // 自定义方法
        mu.run(this.toolMap['fullscreen'].click, fn => fn(full, $event));

        this.setStatus('fullscreen_click');
    };
}
