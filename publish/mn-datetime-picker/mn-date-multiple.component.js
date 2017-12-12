"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_date_class_1 = require("./mn-date.class");
/**
 * 构建日期视图
 */
var MnDateMultipleComponent = (function () {
    function MnDateMultipleComponent() {
        this._view = 'days';
    }
    Object.defineProperty(MnDateMultipleComponent.prototype, "maxDate_", {
        set: function (dt) {
            this._maxDate = new mn_date_class_1.MnDate(dt);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateMultipleComponent.prototype, "minDate_", {
        set: function (dt) {
            this._minDate = new mn_date_class_1.MnDate(dt);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateMultipleComponent.prototype, "startDate_", {
        set: function (dt) {
            this._startDate = new mn_date_class_1.MnDate(dt);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateMultipleComponent.prototype, "endDate_", {
        set: function (dt) {
            this._endDate = new mn_date_class_1.MnDate(dt);
        },
        enumerable: true,
        configurable: true
    });
    MnDateMultipleComponent.prototype.ngOnInit = function () {
    };
    MnDateMultipleComponent.prototype.getStartEnd = function (ds) {
        this._startDate = ds.startDate;
        this._endDate = ds.endDate;
    };
    MnDateMultipleComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'mn-datemultiple',
                    template: "\n        <mn-fill>\n            <mn-col [span]=\"1\">\n                <mn-datecalendar\n                        [mnMinDate]=\"_minDate\"\n                        [mnMaxDate]=\"_maxDate\"\n                        [mnStartDate]=\"_startDate\"\n                        [mnEndDate]=\"_endDate\"\n                        [mnHoverDate]=\"_hoverDate\"\n                        [mnYear]=\"2017\"\n                        [mnMonth]=\"12\"\n                        [mnDay]=\"17\"\n                        [mnView]=\"'days'\"\n                        (mnStartEnd)=\"getStartEnd($event)\"\n                        (mnHover)=\"_hoverDate = $event\"></mn-datecalendar>\n            </mn-col>\n            \n            <mn-col [span]=\"1\">\n                <mn-datecalendar\n                        [mnMinDate]=\"_minDate\"\n                        [mnMaxDate]=\"_maxDate\"\n                        [mnStartDate]=\"_startDate\"\n                        [mnEndDate]=\"_endDate\"\n                        [mnHoverDate]=\"_hoverDate\"\n                        [mnYear]=\"2018\"\n                        [mnMonth]=\"1\"\n                        [mnDay]=\"17\"\n                        [mnView]=\"'days'\"\n                        (mnStartEnd)=\"getStartEnd($event)\"\n                        (mnHover)=\"_hoverDate = $event\"></mn-datecalendar>\n            </mn-col>\n            \n        </mn-fill>\n    "
                },] },
    ];
    /** @nocollapse */
    MnDateMultipleComponent.ctorParameters = function () { return []; };
    MnDateMultipleComponent.propDecorators = {
        "maxDate_": [{ type: core_1.Input, args: ['mnMaxDate',] },],
        "minDate_": [{ type: core_1.Input, args: ['mnMinDate',] },],
        "startDate_": [{ type: core_1.Input, args: ['mnStartDate',] },],
        "endDate_": [{ type: core_1.Input, args: ['mnEndDate',] },],
        "_view": [{ type: core_1.Input, args: ['mnView',] },],
    };
    return MnDateMultipleComponent;
}());
exports.MnDateMultipleComponent = MnDateMultipleComponent;
//# sourceMappingURL=mn-date-multiple.component.js.map