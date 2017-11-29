import {Component, Input, OnInit} from '@angular/core';

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

}

