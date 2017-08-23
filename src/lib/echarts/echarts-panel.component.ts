import {Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild, ViewChildren} from '@angular/core';
import {EchartsService} from './echarts.service';
import './jquery.resize.js';
declare const mu: any, jQuery: any;

@Component({
    selector: 'echarts-panel',
    template: `
        <panel>
            <panel-header>
                <panel-title [innerHTML]="_title"></panel-title>
                <panel-toolbar [tools]="[{
                    name: 'fullscreen',
                    click: fullscreen_click
                }]">
                    <cols (click)="download_click($event)">
                        <i class="fa fa-download"></i>
                    </cols>

                    <cols (click)="dataView_click($event)">
                        <i class="fa fa-database"></i>
                    </cols>

                    <cols (click)="line_click($event)">
                        <i class="fa fa-line-chart"></i>
                    </cols>

                    <cols (click)="bar_click($event)">
                        <i class="fa fa-bar-chart"></i>
                    </cols>

                    <cols (click)="exchange_click($event)">
                        <i class="fa fa-retweet"></i>
                    </cols>

                    <cols (click)="precent_rate_click($event)">
                        <i class="fa fa-align-justify"></i>
                    </cols>

                    <cols (click)="label_show_all_click($event)">
                        <i class="fa fa-ellipsis-h"></i>
                    </cols>

                    <cols (click)="legend_show_click($event)">
                        <i class="fa fa-bookmark"></i>
                    </cols>

                    <cols (click)="reload_click($event)">
                        <i class="fa fa-refresh"></i>
                    </cols>
                </panel-toolbar>
            </panel-header>
            <panel-body>
                <req-http [req]="req" (result)="_data = $event.data" #panel>
                    <mn-handsontable *ngIf="handson" [data]="_dataView"></mn-handsontable>
                    <echarts *ngIf="!handson"  
                             [style.height]="height"
                             [setting]="setting"
                             [options]="options"
                             [type]="type"
                             [data]="_data"
                             (result)="result($event)"
                             (mycharts)="mycharts($event)"></echarts>
                </req-http>
            </panel-body>
        </panel>
    `,
    styles: [
            `:host {
            display: block;
            width: 100%;
        }`
    ]
})
export class EchartsPanelComponent implements OnChanges {

    @ViewChild('panel', {read: ElementRef}) _panel: ElementRef;

    @Input() req: any;
    @Input() type: string;
    @Input() height: string;
    @Input() options: any;
    @Input() setting: any;
    @Input() where: any;

    /**
     * tool bar
     *
     * tb: [type, ...tools]
     */
    @Input() tb: string;

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

    _title: string;
    _data: any;
    _src_setting: any;
    _myChart: any;
    _options: any;

    _dataView: any;

    handson: any;

    constructor(private _es: EchartsService) {
    }

    ngOnChanges(changes: SimpleChanges) {
        mu.exist(changes['setting'], () => {
            this._src_setting = mu.clone(this.setting);
            this.setting.__where__ = this.where;
        });
    }

    result($event) {
        this._options = $event.options;
        this._dataView = $event.dataView;
    }

    mycharts($event) {
        console.debug('mycharts::::::::', $event);
        this._myChart = $event;
    }

    download_click($event) {
        this._es.JSONToCSVConvertor('MasterNg.csv', this._dataView);
    }

    dataView_click($event) {
        this.handson = !this.handson;
    }

    line_click($event): void {
        this.type = 'line';
    }

    bar_click($event): void {
        this.type = 'bar';
    }

    exchange_click($event): void {
        this.setting = mu.clone(this.setting || {});
        this.setting.xy_exchange = !this.setting.xy_exchange;
    }

    /**
     * 百分比结构图
     * @param $event
     */
    precent_rate_click($event): void {
        this.setting = mu.clone(this.setting || {});
        this.setting.percent_rate = !this.setting.percent_rate;
        this.setting.yAxis_value_percent = !this.setting.yAxis_value_percent;
    }

    label_show_all_click($event): void {
        this.setting = mu.clone(this.setting || {});
        this.setting.rotate = this.setting.rotate ? 0 : 30;
    }

    legend_show_click($event): void {
        this.setting = mu.clone(this.setting || {});
        this.setting.legend_show = !this.setting.legend_show;
    }

    reload_click($event): void {
        this.req = mu.clone(this.req);
    }

    fullscreen_click: any = (full: any, $event: any) => {
        console.debug( this._panel );
        jQuery(this._panel.nativeElement).resize((a, b) => {
            this._myChart.resize({
                width: a.target.clientWidth,
                height: a.target.clientHeight
            });
        });
    }
}
