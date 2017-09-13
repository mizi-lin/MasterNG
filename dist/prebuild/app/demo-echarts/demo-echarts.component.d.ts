import { OnInit } from '@angular/core';
import { EchartsService } from '../../lib/mn-echarts/echarts.service';
export declare class DemoEchartsComponent implements OnInit {
    private _serv;
    bar_options: any;
    pie_data: any;
    options_1: any;
    constructor(_serv: EchartsService);
    bar_options2: any;
    barOptions(options: any): void;
    pie_options: any;
    pieConversion(data: any): void;
    radarResult($event: any): void;
    ngOnInit(): void;
}
