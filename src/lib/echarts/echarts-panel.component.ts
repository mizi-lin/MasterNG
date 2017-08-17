import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

declare const mu: any;

@Component({
    selector: 'echarts-panel',
    template: `
        <panel>
            <panel-header>
                <panel-title [innerHTML]="_title"></panel-title>
                <panel-toolbar>
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

                </panel-toolbar>
            </panel-header>
            <panel-body>
                <req-http [req]="req" (result)="_data = $event.data">
                    <echarts
                            [style.height]="height"
                            [setting]="setting"
                            [options]="options"
                            [type]="type"
                            [data]="_data"
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

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges) {
        mu.exist(changes['setting'], () => {
            this._src_setting = mu.clone(this.setting);
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

}
