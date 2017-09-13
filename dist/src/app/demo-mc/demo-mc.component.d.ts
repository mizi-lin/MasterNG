import { OnInit } from '@angular/core';
import { EchartsService } from '../../lib/mn-echarts/echarts.service';
import { Http } from '@angular/http';
export declare class DemoMcComponent implements OnInit {
    private _es;
    private _http;
    categorys: string[];
    data: any[];
    total_data: any[];
    _weibo_data_boi: any[];
    _weibo_data_mc: any[];
    weibo_data: any[];
    constructor(_es: EchartsService, _http: Http);
    ngOnInit(): void;
    setData(d: any): any;
    _date: number;
    getDate(d?: any): any;
}
