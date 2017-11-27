import { EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MnEchartsServices } from './mn-echarts.service';
/**
 * 处理数据，将data转为echart_options
 */
export declare class MnEchartsComponent implements OnInit, OnChanges {
    private _es;
    data: any;
    options: any;
    setting?: any;
    type?: string;
    result: any;
    chartClick: EventEmitter<any>;
    chartDblClick: EventEmitter<any>;
    chartMouseDown: EventEmitter<any>;
    chartMouseUp: EventEmitter<any>;
    chartMouseOver: EventEmitter<any>;
    chartMouseOut: EventEmitter<any>;
    chartGlobalOut: EventEmitter<any>;
    echarts_options: any;
    _result: any;
    constructor(_es: MnEchartsServices);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    getRenderResult(rst: any): void;
}
