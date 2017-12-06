import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {MnDate} from './mn-date.class';

declare const mu: any;

/**
 * 构建日期视图
 */

@Component({
    selector: 'mn-datecalendar',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./mn-date2.scss'],
    template: `
        <mn-fill [hph]="false" class="mnc-header">
            <mn-col [style.width.px]="60" class="mnc-header-prev">
                <i class="fa fa-angle-double-left"
                    (click)="prevBig()"></i>
                <i class="fa fa-angle-left"
                   (click)="prevSmall()"></i>
            </mn-col>
            <mn-col [span]="1" class="mnc-header-current">
                {{_title}}
            </mn-col>
            <mn-col [style.width.px]="60" class="mnc-header-next">
                <i class="fa fa-angle-right"
                   (click)="nextSmall()"></i>
                <i class="fa fa-angle-double-right"
                   (click)="nextBig()"></i>
            </mn-col>
        </mn-fill>

        <mn-datedraw
                [mnYear]="_year"
                [mnMonth]="_month"
                [mnDay]="_day"
                [mnView]="'days'"
                [mnMaxDate]="_maxDate"
                [mnMinDate]="_minDate"
                [mnStartDate]="_startDate"
                [mnEndDate]="_endDate"
                (mnResult)="getResult($event)"></mn-datedraw>
    `
})
export class MnDateCalendarComponent implements OnInit {

    @Output('mnResult') _result = new EventEmitter<any>();
    @Input('mnMaxDate') _maxDate: any;
    @Input('mnMinDate') _minDate: any;
    @Input('mnStartDate') _startDate: any;
    @Input('mnEndDate') _endDate: any;

    @Input('mnYear') _year: number;
    @Input('mnMonth') _month: number = 0;
    @Input('mnDay') _day: number = 1;
    @Input('mnView') _view: string = 'days';

    _title: string = '';
    _mdate: any;

    constructor() {
    }

    ngOnInit() {
    }

    getResult($event) {
        this._mdate = $event;
        switch (this._view) {
            case 'days':
                this._title = mu.format(this._mdate._date, 'yyyy-MM');
                break;
        }
    }

    prevBig() {
        switch (this._view) {
            case 'days':
                this._year = this._mdate.days.year - 1;
                break;
        }
    }

    prevSmall() {
        switch (this._view) {
            case 'days':
                this._month = this._mdate.days.month - 1;
                break;
        }
    }

    nextBig() {
        switch (this._view) {
            case 'days':
                this._year = this._mdate.days.year + 1;
                break;
        }
    }

    nextSmall() {
        switch (this._view) {
            case 'days':
                this._month = this._mdate.days.month + 1;
                break;
        }
    }

}

