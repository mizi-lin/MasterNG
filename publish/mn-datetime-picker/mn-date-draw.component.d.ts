import { OnInit } from '@angular/core';
/**
 * 构建日期视图
 */
export declare class MnDateDrawComponent implements OnInit {
    _maxDate: any;
    _minDate: any;
    _year: any;
    _month: any;
    _view: string;
    constructor();
    ngOnInit(): void;
    /**
     * 根据不同的视图，创建时间集合架子
     */
    buildFrame(view: any): any;
}
