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
        this._prev = {};
        this._next = {};
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
            this._startDate = this.reStartDate(dt);
            this._prev = this._startDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateMultipleComponent.prototype, "endDate_", {
        set: function (dt) {
            this._endDate = this.reEndDate(dt);
            this._next = this.next_(this._prev, this._endDate);
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
    MnDateMultipleComponent.prototype.getPreCalendar = function (ds) {
        this._prev = ds;
    };
    MnDateMultipleComponent.prototype.getNextCalendar = function (ds) {
        this._next = ds;
    };
    /**
     * 重新计算startDate
     * @param dt
     * @return {any}
     */
    /**
         * 重新计算startDate
         * @param dt
         * @return {any}
         */
    MnDateMultipleComponent.prototype.reStartDate = /**
         * 重新计算startDate
         * @param dt
         * @return {any}
         */
    function (dt) {
        dt = new mn_date_class_1.MnDate(dt);
        if (this._minDate) {
            return this._minDate._date > dt._date ? this._minDate : dt;
        }
        return dt;
    };
    /**
     * 重新计算结束时间
     * @param dt
     * @return {any}
     */
    /**
         * 重新计算结束时间
         * @param dt
         * @return {any}
         */
    MnDateMultipleComponent.prototype.reEndDate = /**
         * 重新计算结束时间
         * @param dt
         * @return {any}
         */
    function (dt) {
        dt = new mn_date_class_1.MnDate(dt);
        if (this._maxDate) {
            return this._maxDate._date < dt._date ? this._maxDate : dt;
        }
        return dt;
    };
    /**
     * 获得下个月的期间区域
     * @private
     */
    /**
         * 获得下个月的期间区域
         * @private
         */
    MnDateMultipleComponent.prototype.next_ = /**
         * 获得下个月的期间区域
         * @private
         */
    function (prev, next) {
        return prev._d === next._d ? new mn_date_class_1.MnDate(prev.mom(1).start) : next;
    };
    MnDateMultipleComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'mn-datemultiple',
                    template: "\n        <mn-fill [gutter]=\"16\">\n            <mn-col [span]=\"1\">\n                <mn-datecalendar\n                        [mnMinDate]=\"_minDate\"\n                        [mnMaxDate]=\"_maxDate\"\n                        [mnStartDate]=\"_startDate\"\n                        [mnEndDate]=\"_endDate\"\n                        [mnHoverDate]=\"_hoverDate\"\n                        [mnView]=\"'days'\"\n\n                        [mnYear]=\"_prev.days.year\"\n                        [mnMonth]=\"_prev.days.month\"\n\n                        [mnNextDate]=\"_next\"\n\n                        (mnResult)=\"getPreCalendar($event)\"\n                        (mnStartEnd)=\"getStartEnd($event)\"\n                        (mnHover)=\"_hoverDate = $event\"></mn-datecalendar>\n            </mn-col>\n\n            <mn-col [span]=\"1\">\n                <mn-datecalendar\n                        [mnMinDate]=\"_minDate\"\n                        [mnMaxDate]=\"_maxDate\"\n                        [mnStartDate]=\"_startDate\"\n                        [mnEndDate]=\"_endDate\"\n                        [mnHoverDate]=\"_hoverDate\"\n                        [mnView]=\"'days'\"\n\n                        [mnYear]=\"_next.days.year\"\n                        [mnMonth]=\"_next.days.month\"\n\n                        [mnPrevDate]=\"_prev\"\n\n                        (mnResult)=\"getNextCalendar($event)\"\n                        (mnStartEnd)=\"getStartEnd($event)\"\n                        (mnHover)=\"_hoverDate = $event\"></mn-datecalendar>\n            </mn-col>\n\n        </mn-fill>\n    "
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