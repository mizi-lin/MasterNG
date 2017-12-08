import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {MnDate} from './mn-date.class';

declare const mu: any;

/**
 * 构建日期视图
 */

@Component({
    selector: 'mn-datemultiple',
    template: `
        <mn-fill>
            <mn-col [span]="1">
                <mn-datecalendar
                        [mnMinDate]="_minDate"
                        [mnMaxDate]="_maxDate"
                        [mnStartDate]="_startDate"
                        [mnEndDate]="_endDate"
                        [mnHoverDate]="_hoverDate"
                        [mnYear]="2017"
                        [mnMonth]="12"
                        [mnDay]="17"
                        [mnView]="'days'"
                        (mnStartEnd)="getStartEnd($event)"
                        (mnHover)="_hoverDate = $event"></mn-datecalendar>
            </mn-col>
            
            <mn-col [span]="1">
                <mn-datecalendar
                        [mnMinDate]="_minDate"
                        [mnMaxDate]="_maxDate"
                        [mnStartDate]="_startDate"
                        [mnEndDate]="_endDate"
                        [mnHoverDate]="_hoverDate"
                        [mnYear]="2018"
                        [mnMonth]="1"
                        [mnDay]="17"
                        [mnView]="'days'"
                        (mnStartEnd)="getStartEnd($event)"
                        (mnHover)="_hoverDate = $event"></mn-datecalendar>
            </mn-col>
            
        </mn-fill>
    `
})
export class MnDateMultipleComponent implements OnInit {

    _hoverDate: any;

    _maxDate: any;

    @Input('mnMaxDate')
    set maxDate_(dt) {
        this._maxDate = new MnDate(dt);
    }

    _minDate: any;

    @Input('mnMinDate')
    set minDate_(dt) {
        this._minDate = new MnDate(dt);
    }

    _startDate: any;

    @Input('mnStartDate')
    set startDate_(dt) {
        this._startDate = new MnDate(dt);
    }

    _endDate: any;

    @Input('mnEndDate')
    set endDate_(dt) {
        this._endDate = new MnDate(dt);
    }

    @Input('mnView') _view: string = 'days';

    constructor() {

    }

    ngOnInit() {
    }

    getStartEnd(ds) {
        this._startDate = ds.startDate;
        this._endDate = ds.endDate;
    }



}

