"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * 构建日期视图
 */
var MnDatePickerComponent = (function () {
    function MnDatePickerComponent() {
    }
    MnDatePickerComponent.prototype.ngOnInit = function () {
    };
    MnDatePickerComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'mn-datepicker',
                    encapsulation: core_1.ViewEncapsulation.None,
                    styles: ['mn-datesingle,mn-datecalendar,mn-datedraw,mn-datemultiple,mn-datepicker {  display: block;}mn-datepicker .mnc-picker {  padding-right: 8px;  height: 28px !important;  border: 1px solid #dedede;  border-radius: 3px;}mn-datepicker .mnc-picker mn-input {  height: 100%;  border: 1px solid transparent;  min-width: 105px;}.mnc-weekdays > mn-col,mn-datesingle {  margin-bottom: 2px;  padding: 4px;  width: 28px;  height: 28px;  text-align: center;  border-radius: 2px;  transition: color .3s ease;}mn-datedraw .start {  background: rgba(61, 168, 245, 0.3);}mn-datedraw .end {  background: rgba(61, 168, 245, 0.5);}mn-datedraw .range {  background: #e2f2fe;}mn-datedraw .hover {  background: rgba(255, 240, 0, 0.5);}mn-datedraw .re-hover {  background: #fef2e2;}mn-datedraw .max {  color: #aaa;  text-decoration: line-through;}mn-datedraw .min {  color: #aaa;  text-decoration: line-through;}mn-datedraw .current {  cursor: pointer;}mn-datedraw .current:not(.max):not(.min):hover {  background: rgba(237, 107, 117, 0.8);}mn-datedraw .next,mn-datedraw .prev {  color: #999;}'],
                    template: "\n        <mn-dropdown (mnResult)=\"_dropDownResult = $event\">\n            <mn-fill class=\"mnc-picker\">\n                <mn-col [span]=\"1\">\n                    <mn-input [mnReadonly]=\"true\"\n                            [mnValue]=\"_selected?.start\">\n                    </mn-input>\n                </mn-col>\n                <mn-col>\n                    <span>-</span>\n                </mn-col>\n                <mn-col  [span]=\"1\">\n                    <mn-input\n                            [mnReadonly]=\"true\"\n                            [mnValue]=\"_selected?.end\">\n                    </mn-input>\n                </mn-col>\n                <mn-col>\n                    <i class=\"fa fa-calendar mnc-next\"></i>\n                </mn-col>\n            </mn-fill>\n\n            <mn-dropdown-content class=\"p-8 mnc-block\">\n                <mn-datemultiple\n                        [mnMinDate]=\"'2017-11-30'\"\n                        [mnMaxDate]=\"'2029-01-29'\"\n                        [mnStartDate]=\"'2017-12-13'\"\n                        [mnEndDate]=\"'2018-03-11'\"\n                        [mnView]=\"'days'\"></mn-datemultiple>\n            </mn-dropdown-content>\n        </mn-dropdown>\n    \n    "
                },] },
    ];
    /** @nocollapse */
    MnDatePickerComponent.ctorParameters = function () { return []; };
    return MnDatePickerComponent;
}());
exports.MnDatePickerComponent = MnDatePickerComponent;
//# sourceMappingURL=mn-date-picker.component.js.map