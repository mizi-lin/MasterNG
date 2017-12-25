"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_date_class_1 = require("./mn-date.class");
var mn_datetime_services_1 = require("./mn-datetime.services");
/**
 * 日历控件最小模块：日期块
 * 最小时间粒度，实现时间样式（max, min, start, end)
 *
 */
var MnDateSingleComponent = (function () {
    function MnDateSingleComponent(_mds) {
        this._mds = _mds;
        this._date = {};
        this._view = 'days';
        this._max = false;
        this._min = false;
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
        set: function (dt) {
            this._maxDate = new mn_date_class_1.MnDate(dt);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateSingleComponent.prototype, "minDate_", {
        set: function (dt) {
            this._minDate = new mn_date_class_1.MnDate(dt);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateSingleComponent.prototype, "startDate_", {
        set: function (dt) {
            this._startDate = new mn_date_class_1.MnDate(dt);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateSingleComponent.prototype, "endDate_", {
        set: function (dt) {
            this._endDate = new mn_date_class_1.MnDate(dt);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateSingleComponent.prototype, "hoverDate_", {
        set: function (dt) {
            this._hoverDate = new mn_date_class_1.MnDate(dt);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateSingleComponent.prototype, "status_", {
        set: function (st) {
            this._current = st === 'current';
            this._next = st === 'next';
            this._prev = st === 'prev';
            this._status = st;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateSingleComponent.prototype, "classMax_", {
        get: function () {
            var _this = this;
            return mu.run(this._maxDate, function (_maxDate) {
                _this._maxDate = _this.mndate(_maxDate);
                _this._max = _this._mds.compared(_this._view, _this._date, _this._maxDate) === 1;
                return _this._max;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateSingleComponent.prototype, "classMin_", {
        get: function () {
            var _this = this;
            return mu.run(this._minDate, function (_minDate) {
                _this._minDate = _this.mndate(_minDate);
                _this._min = _this._mds.compared(_this._view, _this._date, _this._minDate) === -1;
                return _this._min;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateSingleComponent.prototype, "classStart_", {
        get: function () {
            var _this = this;
            return mu.run(this._startDate, function (_startDate) {
                _this._startDate = _this.mndate(_startDate);
                return !_this._max && !_this._min && _this._current && _this._mds.compared(_this._view, _this._date, _this._startDate) === 0;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateSingleComponent.prototype, "classEnd_", {
        get: function () {
            var _this = this;
            return mu.run(this._endDate, function (_endDate) {
                _this._endDate = _this.mndate(_endDate);
                return !_this._max && !_this._min && _this._current && _this._mds.compared(_this._view, _this._date, _this._endDate) === 0;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateSingleComponent.prototype, "classStartEndRange_", {
        get: function () {
            if (this._current && mu.isNotEmpty(this._startDate) && mu.isNotEmpty(this._endDate)) {
                return !this._max
                    && !this._min
                    && this._current && this._mds.range(this._view, this._date, this._startDate, this._endDate) === 2;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateSingleComponent.prototype, "classHover_", {
        get: function () {
            if (this._current && mu.isEmpty(this._endDate) && mu.isNotEmpty(this._startDate) && mu.isNotEmpty(this._hoverDate)) {
                return !this._max
                    && !this._min
                    && this._current && this._mds.range(this._view, this._date, this._startDate, this._hoverDate) === 2;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateSingleComponent.prototype, "classReHover_", {
        get: function () {
            if (this._current && mu.isEmpty(this._endDate) && mu.isNotEmpty(this._startDate) && mu.isNotEmpty(this._hoverDate)) {
                return !this._max
                    && !this._min
                    && this._current && this._mds.range(this._view, this._date, this._hoverDate, this._startDate) === 2;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateSingleComponent.prototype, "classPrev_", {
        get: function () {
            return this._prev;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateSingleComponent.prototype, "classCurrent_", {
        get: function () {
            return this._current;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateSingleComponent.prototype, "classNext_", {
        get: function () {
            return this._next;
        },
        enumerable: true,
        configurable: true
    });
    MnDateSingleComponent.prototype.ngOnInit = function () {
    };
    MnDateSingleComponent.prototype.mndate = function (date) {
        return new mn_date_class_1.MnDate(date);
    };
    MnDateSingleComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'mn-datesingle',
                    template: "\n        <div class=\"content\">\n            {{_date[_view]?.value}}\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    MnDateSingleComponent.ctorParameters = function () { return [
        { type: mn_datetime_services_1.MnDatetimeServices, },
    ]; };
    MnDateSingleComponent.propDecorators = {
        "date_": [{ type: core_1.Input, args: ['mnDate',] },],
        "maxDate_": [{ type: core_1.Input, args: ['mnMaxDate',] },],
        "minDate_": [{ type: core_1.Input, args: ['mnMinDate',] },],
        "startDate_": [{ type: core_1.Input, args: ['mnStartDate',] },],
        "endDate_": [{ type: core_1.Input, args: ['mnEndDate',] },],
        "hoverDate_": [{ type: core_1.Input, args: ['mnHoverDate',] },],
        "_view": [{ type: core_1.Input, args: ['mnView',] },],
        "status_": [{ type: core_1.Input, args: ['mnStatus',] },],
        "classMax_": [{ type: core_1.HostBinding, args: ['class.max',] },],
        "classMin_": [{ type: core_1.HostBinding, args: ['class.min',] },],
        "classStart_": [{ type: core_1.HostBinding, args: ['class.start',] },],
        "classEnd_": [{ type: core_1.HostBinding, args: ['class.end',] },],
        "classStartEndRange_": [{ type: core_1.HostBinding, args: ['class.range',] },],
        "classHover_": [{ type: core_1.HostBinding, args: ['class.hover',] },],
        "classReHover_": [{ type: core_1.HostBinding, args: ['class.re-hover',] },],
        "classPrev_": [{ type: core_1.HostBinding, args: ['class.prev',] },],
        "classCurrent_": [{ type: core_1.HostBinding, args: ['class.current',] },],
        "classNext_": [{ type: core_1.HostBinding, args: ['class.next',] },],
    };
    return MnDateSingleComponent;
}());
exports.MnDateSingleComponent = MnDateSingleComponent;
//# sourceMappingURL=mn-date-single.component.js.map