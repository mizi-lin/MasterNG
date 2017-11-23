"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_date_class_1 = require("./mn-date.class");
var MnDateSingleComponent = (function () {
    function MnDateSingleComponent() {
        this._view = 'days';
    }
    Object.defineProperty(MnDateSingleComponent.prototype, "date_", {
        set: function (date) {
            if (date) {
                this._date = new mn_date_class_1.MnDate(date);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateSingleComponent.prototype, "maxDate_", {
        set: function (date) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateSingleComponent.prototype, "minDate_", {
        set: function (date) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateSingleComponent.prototype, "startDate_", {
        set: function (date) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateSingleComponent.prototype, "endDate_", {
        set: function (date) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateSingleComponent.prototype, "hoverDate_", {
        set: function (date) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateSingleComponent.prototype, "classStart_", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateSingleComponent.prototype, "classEnd_", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateSingleComponent.prototype, "classRange_", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateSingleComponent.prototype, "classRangeReverse_", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    MnDateSingleComponent.prototype.ngOnInit = function () {
    };
    return MnDateSingleComponent;
}());
MnDateSingleComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-datesingle',
                template: "\n        <div class=\"content\">\n            {{_date[_view].value}}\n        </div>\n    "
            },] },
];
/** @nocollapse */
MnDateSingleComponent.ctorParameters = function () { return []; };
MnDateSingleComponent.propDecorators = {
    'date_': [{ type: core_1.Input, args: ['MnDate',] },],
    '_view': [{ type: core_1.Input, args: ['MnView',] },],
    'maxDate_': [{ type: core_1.Input, args: ['MnMaxDate',] },],
    'minDate_': [{ type: core_1.Input, args: ['MnMinDate',] },],
    'startDate_': [{ type: core_1.Input, args: ['MnStartDate',] },],
    'endDate_': [{ type: core_1.Input, args: ['MnEndDate',] },],
    'hoverDate_': [{ type: core_1.Input, args: ['MnHoverDate',] },],
    'classStart_': [{ type: core_1.HostBinding, args: ['class.start',] },],
    'classEnd_': [{ type: core_1.HostBinding, args: ['class.end',] },],
    'classRange_': [{ type: core_1.HostBinding, args: ['class.range',] },],
    'classRangeReverse_': [{ type: core_1.HostBinding, args: ['class.range-reverse',] },],
};
exports.MnDateSingleComponent = MnDateSingleComponent;
//# sourceMappingURL=mn-date-single.component.js.map