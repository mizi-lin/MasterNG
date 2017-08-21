import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

declare const mu: any;

import './jquery.json2csv.js';
import {escape} from 'querystring';

function JSONToCSVConvertor(JSONData: any, colHeaders?: any) {
    let
        arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData,
        CSV = '',
        row = '',
        fileName = 'MasterNg.csv';

    // Put the header (based on the colHeaders of my table in my example)
    for (const index in colHeaders) {
        row += colHeaders[index] + ',';
    }
    row = row.slice(0, -1);
    CSV += row + '\r\n';

    // Adding each rows of the table
    for (let i = 0; i < arrData.length; i++) {
        let row = '';
        for (let index in arrData[i]) {
            row += arrData[i][index] + ',';
        }
        row = row.slice(0, -1);
        CSV += row + '\r\n';
    }

    if (CSV === '') {
        alert('Invalid data');
        return;
    }

    // Downloading the new generated csv.
    // For IE >= 9
    if (window.navigator.msSaveOrOpenBlob) {
        const fileData = [CSV];
        const blobObject = new Blob(fileData);
        window.navigator.msSaveOrOpenBlob(blobObject, fileName);
    } else {
        // For Chome/Firefox/Opera
        const uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(CSV);

        let link = document.createElement('a');
        link.href = uri;
        // link.style = 'visibility:hidden';
        link.download = fileName;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

@Component({
    selector: 'echarts-panel',
    template: `
        <panel>
            <panel-header>
                <panel-title [innerHTML]="_title"></panel-title>
                <panel-toolbar>
                    <cols (click)="download_click($event)">
                        <i class="fa fa-download"></i>
                    </cols>
                    
                    <cols (click)="database_click($event)">
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
                <req-http [req]="req" (result)="_data = $event.data">
                    <mn-handsontable *ngIf="handson" [data]="handson"></mn-handsontable>
                    <echarts *ngIf="!handson"
                             [style.height]="height"
                             [setting]="setting"
                             [options]="options"
                             [type]="type"
                             [data]="_data"
                             (result)="result($event)"
                             (mycharts)="_myChart = $event"></echarts>
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

    @Input() req: any;
    @Input() type: string;
    @Input() height: string;
    @Input() options: any;
    @Input() setting: any;

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

    handson: any;

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges) {
        mu.exist(changes['setting'], () => {
            this._src_setting = mu.clone(this.setting);
        });
    }



    result($event) {
        this._options = $event;

        console.debug(this._options);

        // console.debug(JSON.stringify(this._options));
    }

    download_click($event) {
        JSONToCSVConvertor(this.handson);
    }

    database_click($event) {
        let data, x_data, header;

        if (this.handson) {
            this.handson = null;
            return false;
        }

        mu.run(this._options.xAxis[0], (xs) => {
            x_data = mu.map(xs.data, (x) => {
                return x.value || x;
            });
        });

        mu.run(this._options.series, (series, index) => {
            header = mu.map(series, (d) => {
                console.debug(d);
                return d.name;
            });

            header.unshift('');

            data = mu.map(series, (d) => {
                return mu.map(d.data, (dd) => dd.value || dd);
            });

            data.unshift(x_data);

            const _data = [];

            for (let i = 0; i < data[0].length; i++) {
                _data[i] = [];
            }

            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].length; j++) {
                    _data[j][i] = data[i][j];
                }
            }

            _data.unshift(header);

            this.handson = _data;

        });
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
}
