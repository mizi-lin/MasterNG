import { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EchartsService } from './echarts.service';
/**
 * 处理数据，将data转为echart_options
 */
export declare class MnEchartsComponent implements OnInit, OnChanges {
    private _serv;
    data: any;
    options: any;
    setting?: any;
    type?: string;
    echarts_options: any;
    echarts_data: any;
    mycharts: any;
    result: any;
    constructor(_serv: EchartsService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
}
