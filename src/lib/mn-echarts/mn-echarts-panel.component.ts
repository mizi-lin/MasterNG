import {Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild, ViewChildren} from '@angular/core';
import {EchartsService} from './echarts.service';
import '../assets/jquery.resize.js';
import {MnFileSaverServices} from '../mn-common/services/mn-file-saver.services';

declare const mu: any, jQuery: any;

@Component({
    selector: 'mn-echarts-panel, mn-echarts-box',
    template: `
        <mn-panel>
            <mn-panel-header>
                <mn-panel-title [innerHTML]="_title"></mn-panel-title>
                <mn-panel-toolbar [tools]="_tools" [class.toggle]="show_tools === 'toggle'">

                    <ng-template [ngIf]="toolMap['download']">
                        <mn-col (click)="download_click($event)"
                              [order]="toolMap['download'].order">
                            <i class="fa fa-download"></i>
                        </mn-col>
                    </ng-template>

                    <ng-template [ngIf]="toolMap['data_view']">
                        <mn-col (click)="dataView_click($event)"
                              [order]="toolMap['data_view'].order"
                              [class.active]="statusMap.dataView_click">
                            <i class="fa fa-database"></i>
                        </mn-col>
                    </ng-template>

                    <ng-template [ngIf]="toolMap['line']">
                        <mn-col *ngIf="_src_type | mu:'or':'bar'"
                              (click)="line_click($event)"
                              [order]="toolMap['line'].order"
                              [class.active]="statusMap.line_click">
                            <i class="fa fa-line-chart"></i>
                        </mn-col>
                    </ng-template>

                    <ng-template [ngIf]="toolMap['bar']">
                        <mn-col *ngIf="_src_type | mu:'or':'line'"
                              (click)="bar_click($event)"
                              [order]="toolMap['bar'].order"
                              [class.active]="statusMap.bar_click">
                            <i class="fa fa-bar-chart"></i>
                        </mn-col>
                    </ng-template>

                    <ng-template [ngIf]="toolMap['exchange']">
                        <mn-col *ngIf="_src_type | mu:'or':'line':'bar'"
                              (click)="exchange_click($event)"
                              [order]="toolMap['exchange'].order"
                              [class.active]="statusMap.exchange_click">
                            <i class="fa fa-retweet"></i>
                        </mn-col>
                    </ng-template>

                    <ng-template [ngIf]="toolMap['rate']">
                        <mn-col *ngIf="_src_type | mu:'or':'line':'bar'"
                              (click)="precent_rate_click($event)"
                              [order]="toolMap['rate'].order"
                              [class.active]="statusMap.precent_rate_click">
                            <i class="fa fa-align-justify"></i>
                        </mn-col>
                    </ng-template>

                    <ng-template [ngIf]="toolMap['label_all']">
                        <mn-col *ngIf="_src_type | mu:'or':'line':'bar'"
                              (click)="label_show_all_click($event)"
                              [order]="toolMap['label_all'].order"
                              [class.active]="statusMap.label_show_all_click">
                            <i class="fa fa-ellipsis-h"></i>
                        </mn-col>
                    </ng-template>

                    <ng-template [ngIf]="toolMap['legend']">
                        <mn-col (click)="legend_show_click($event)"
                              [order]="toolMap['legend'].order"
                              [class.active]="statusMap.legend_show_click">
                            <i class="fa fa-bookmark"></i>
                        </mn-col>
                    </ng-template>

                    <ng-template [ngIf]="toolMap['reload']">
                        <mn-col (click)="reload_click($event)"
                              [order]="toolMap['reload'].order">
                            <i class="fa fa-refresh"></i>
                        </mn-col>
                    </ng-template>
                </mn-panel-toolbar>
            </mn-panel-header>
            <mn-panel-body>
                <req-http [req]="req" (result)="_data = $event.data" #panel>
                    <mn-handsontable *ngIf="handson" [data]="_dataView"></mn-handsontable>
                    <mn-echarts *ngIf="!handson"
                             [style.height]="height"
                             [setting]="setting"
                             [options]="options"
                             [type]="type"
                             [data]="_data"
                             (result)="_result($event)"
                             (mycharts)="mycharts($event)"></mn-echarts>
                </req-http>
            </mn-panel-body>
        </mn-panel>
    `,
    styleUrls: ['./echarts.scss']
})
export class EchartsPanelComponent implements OnChanges {

    @ViewChild('mn-panel', {read: ElementRef}) _panel: ElementRef;

    @Input() req: any;
    @Input() type: string;
    @Input() height: string;
    @Input() options: any;
    @Input() setting: any;
    @Input() where: any;
    @Input() tools: string;
    @Input() filename: string = 'MasterNg';

    /**
     * show_tools
     * show, toggle
     */
    @Input() show_tools = 'show';

    @Input()
    set data(v) {
        this._data = v;
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

    _title: string;
    _data: any;
    _src_setting: any;
    _src_type: any;
    _myChart: any;
    _options: any;

    _dataView: any;
    // fullscreen, download, data_view, line, bar, exchange, rate, label_all, legend, reload
    _tools: any[] = [];



    handson: any;
    statusMap: any = {};
    toolMap: any = {};
    hide_title: boolean = false;

    setStatus(fnKey: string): void {
        this.statusMap[fnKey] = !this.statusMap[fnKey];
    }

    constructor(private _es: EchartsService,
                private _mnFileSaverServ: MnFileSaverServices,
                private _ref: ElementRef) {
        if (this._ref.nativeElement.nodeName === 'ECHARTS-BOX') {
            this.hide_title = true;
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        mu.exist(changes['setting'], (changes_setting) => {
            if (changes_setting.first) {
                this._src_setting = mu.clone(this.setting);

            }
            this.setting.__where__ = this.where;
        });

        mu.exist(changes['type'], (type_changes) => {
            if (type_changes.firstChange) {
                this._src_type = type_changes.currentValue;
            }
        });

        mu.exist(changes['tools'], () => {
            this.toolMap = mu.map(this.tools || [], (key, i) => {

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

            mu.run(this.toolMap['fullscreen'], (o) => {
                this._tools.push({
                    name: 'fullscreen',
                    click: this.fullscreen_click,
                    order: o.order
                });
            });

        });
    }

    _result($event) {
        this._options = $event.options;
        this._dataView = $event.dataView;

        this.result.emit($event);
        // this.type === 'radar' && console.debug(JSON.stringify(this._options));
    }

    mycharts($event) {
        this._myChart = $event;
    }

    download_click($event) {
        const content = this._mnFileSaverServ.csvData(this._dataView);
        this._mnFileSaverServ.fileSaver([content], this.filename);
    }

    dataView_click($event) {
        this.handson = !this.handson;
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

    fullscreen_click: any = (full: any, $event: any) => {
        const $el = jQuery(this._panel.nativeElement);

        $el.mnResize(() => {
            this._myChart.resize({
                width: $el.width(),
                height: $el.height()
            });
        });

        // 自定义方法
        mu.run(this.toolMap['fullscreen'].click, fn => fn(full, $event));

        this.setStatus('fullscreen_click');
    };
}
