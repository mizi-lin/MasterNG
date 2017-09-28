import { ElementRef, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MnEchartsService } from './mn-echarts.service';
import '../assets/jquery.resize.js';
import { MnFileSaverServices } from '../mn-common/services/mn-file-saver.services';
export declare class MnEchartsPanelComponent implements OnChanges {
    private _es;
    private _mnFileSaverServ;
    private _ref;
    _panel: ElementRef;
    req: any;
    type: string;
    height: string;
    options: any;
    setting: any;
    where: any;
    tools: string;
    filename: string;
    /**
     * show_tools
     * show, toggle
     */
    show_tools: string;
    data: any;
    hph: boolean | string;
    readonly getHph: string;
    title: any;
    result: any;
    chartClick: EventEmitter<any>;
    chartDblClick: EventEmitter<any>;
    chartMouseDown: EventEmitter<any>;
    chartMouseUp: EventEmitter<any>;
    chartMouseOver: EventEmitter<any>;
    chartMouseOut: EventEmitter<any>;
    chartGlobalOut: EventEmitter<any>;
    _title: string;
    _data: any;
    _src_setting: any;
    _src_type: any;
    _show_dataView: boolean;
    _tools: any[];
    _sort: string;
    _chart: any;
    _dataView: any;
    _options: any;
    _source: any;
    statusMap: any;
    toolMap: any;
    hide_title: boolean;
    setStatus(fnKey: string): void;
    constructor(_es: MnEchartsService, _mnFileSaverServ: MnFileSaverServices, _ref: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
    _result(rst: any): void;
    download_click($event: any): void;
    dataView_click($event: any): void;
    line_click($event: any): void;
    bar_click($event: any): void;
    exchange_click($event: any): void;
    /**
     * 百分比结构图
     * @param $event
     */
    precent_rate_click($event: any): void;
    label_show_all_click($event: any): void;
    legend_show_click($event: any): void;
    reload_click($event: any): void;
    sort_click(legend: any): void;
    fullscreen_click: any;
}
