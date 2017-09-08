import { ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { EchartsService } from './echarts.service';
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
    title: any;
    result: any;
    _title: string;
    _data: any;
    _src_setting: any;
    _src_type: any;
    _myChart: any;
    _options: any;
    _show_dataView: boolean;
    _dataView: any;
    _tools: any[];
    handson: any;
    statusMap: any;
    toolMap: any;
    hide_title: boolean;
    setStatus(fnKey: string): void;
    constructor(_es: EchartsService, _mnFileSaverServ: MnFileSaverServices, _ref: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
    _result($event: any): void;
    mycharts($event: any): void;
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
    fullscreen_click: any;
}
