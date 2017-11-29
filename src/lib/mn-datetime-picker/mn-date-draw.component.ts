import {Component, Input, OnInit} from '@angular/core';

declare const mu: any;


/**
 * 构建日期视图
 */

@Component({
    selector: 'mn-datedraw',
    template: ``
})
export class MnDateDrawComponent implements OnInit {

    @Input() _maxDate: any;
    @Input() _minDate: any;

    @Input() _year: any;
    @Input() _month: any;

    @Input('mnView') _view: string;

    constructor() {
    }

    ngOnInit() {
    }

    /**
     * 根据不同的视图，创建时间集合架子
     */
    buildFrame(view) {

        switch (view) {

            // 年视图
            // 5 年视图
            // row 5 col 4
            case 'years':
                return mu.map(10, (i) => {
                    return new Array(5);
                }, []);


            // 季度视图
            // 5 年视图
            // row 5 col 4
            case 'quarter':
                return mu.map(5, (i) => {
                    return new Array(4);
                }, []);


            // 月视图
            // row 4 col 3
            case 'months':
                return mu.map(4, (i) => {
                    return new Array(3);
                }, []);

            // 周视图
            // 当年周数
            // row 7 col 8
            case 'weeks':
                return mu.map(7, (i) => {
                    return new Array(8);
                }, []);

            // 日视图
            case 'days':
                return mu.map(6, (i) => {
                    return new Array(7);
                }, []);
        }
    }

}

