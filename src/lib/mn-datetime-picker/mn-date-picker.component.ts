import {Component, OnInit, Output, ViewEncapsulation} from '@angular/core';

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
            <mn-fill class="mnc-picker">
                <mn-col [span]="1">
                    <mn-input [mnReadonly]="true"
                            [mnValue]="_selected?.start">
                    </mn-input>
                </mn-col>
                <mn-col>
                    <span>-</span>
                </mn-col>
                <mn-col  [span]="1">
                    <mn-input
                            [mnReadonly]="true"
                            [mnValue]="_selected?.end">
                    </mn-input>
                </mn-col>
                <mn-col>
                    <i class="fa fa-calendar mnc-next"></i>
                </mn-col>
            </mn-fill>

            <mn-dropdown-content class="p-8 mnc-block">
                <mn-datemultiple
                        [mnMinDate]="'2017-11-30'"
                        [mnMaxDate]="'2029-01-29'"
                        [mnStartDate]="'2017-12-13'"
                        [mnEndDate]="'2018-03-11'"
                        [mnView]="'days'"></mn-datemultiple>
            </mn-dropdown-content>
        </mn-dropdown>
    
    `
})
export class MnDatePickerComponent implements OnInit {

    _dropDownResult: any;

    constructor() {
    }

    ngOnInit() {
    }

}
