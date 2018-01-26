import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MnDate} from './mn-date.class';

declare const mu: any;

/**
 * 构建日期视图
 */
@Component({
    selector: 'mn-datepicker',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./mn-date2.scss'],
    template: `
        <mn-dropdown (mnResult)="_dropDownResult = $event">
            <mn-fill class="mnc-picker" [ngClass]="{disabled: _disabled$ || _disabled}">
                <mn-col [span]="1">
                    <mn-input [mnPlaceHolder]="_startPlaceHolder"
                              [mnReadonly]="true"
                              [mnDisabled]="_disabled$ || _disabled"
                              [mnValue]="_$selected?.start">
                    </mn-input>
                </mn-col>
                <mn-col>
                    <span>~</span>
                </mn-col>
                <mn-col [span]="1">
                    <mn-input [mnPlaceHolder]="_endPlaceHolder"
                            [mnReadonly]="true"
                            [mnDisabled]="_disabled$ || _disabled"
                            [mnValue]="_$selected?.end">
                    </mn-input>
                </mn-col>
                <mn-col>
                    <i class="fa fa-calendar mnc-next"></i>
                </mn-col>
            </mn-fill>

            <mn-dropdown-content class="p-8 mnc-block">
                <mn-datemultiple
                        [ngClass]="{disabled: _disabled$ || _disabled}"
                        [mnMinDate]="_minDate"
                        [mnMaxDate]="_maxDate"
                        [mnStartDate]="_startDate"
                        [mnEndDate]="_endDate"
                        [mnView]="_view"
                        [mnDisabled]="_disabled$ || _disabled"
                        (mnSelected)="getSelected($event)"
                        (mnResult)="getResult($event)"></mn-datemultiple>
            </mn-dropdown-content>
        </mn-dropdown>

    `
})
export class MnDatePickerComponent implements OnInit {

    _dropDownResult: any;
    _$selected: any = {};

    _maxDate: any;

    @Input('mnStartPlaceHolder') _startPlaceHolder: string = 'Start Date';
    @Input('mnEndPlaceHolder') _endPlaceHolder: string = 'End Date';
    @Input('mnFormatter') _formatter: string = 'yyyy-MM-dd';

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

    _disabled: boolean = false;
    _disabled$: boolean = false;

    @Input('mnDisabled')
    set disabled_(disabled) {
        this._disabled$ = disabled;
        this._disabled = disabled;
    }

    @Output('mnResult') _result = new EventEmitter<any>();
    @Output('mnSelected') _selected = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
    }

    getResult(rst) {
        this._disabled = rst.disabled;
        this._setSelected(rst.startDate, rst.endDate);
        this._result.emit(rst);
    }

    getSelected(rst) {
        this._setSelected(rst.startDate, rst.endDate);
        this._dropDownResult.hide();
    }

    _setSelected(start, end) {
        this._$selected = {};

        mu.run(start, () => {
            this._$selected.start = mu.format(start._date, this._formatter);
        });

        mu.run(end, () => {
            this._$selected.end = mu.format(end._date, this._formatter);
        });

        this._selected.emit({
            startDate: start,
            endDate: end
        });
    }

}
