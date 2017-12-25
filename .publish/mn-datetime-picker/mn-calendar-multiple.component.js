"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_calendar_component_1 = require("./mn-calendar.component");
var mn_datetime_services_1 = require("./mn-datetime.services");
var mn_date_class_1 = require("./mn-date.class");
var MnCalendarMultipleComponent = (function () {
    function MnCalendarMultipleComponent(_mds) {
        var _this = this;
        this._mds = _mds;
        this.result = new core_1.EventEmitter();
        this.prev = new Date();
        this.next = new Date();
        this._hasChanges = false;
        mu.empty(this.prev_year, function () {
            _this.prev_year = _this.prev.getFullYear();
            _this.prev_month = _this.prev.getMonth() + 1;
            _this.prev_date = _this.prev.getDate();
        });
        mu.empty(this.next_year, function () {
            _this.next.setMonth(_this.prev_month);
            _this.next_year = _this.next.getFullYear();
            _this.next_month = _this.next.getMonth() + 1;
            _this.next_date = _this.next.getDate();
        });
    }
    Object.defineProperty(MnCalendarMultipleComponent.prototype, "minDate", {
        set: function (date) {
            if (!date) {
                return;
            }
            this.minDate_ = new mn_date_class_1.MnDate(date);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnCalendarMultipleComponent.prototype, "maxDate", {
        set: function (date) {
            if (!date) {
                return;
            }
            this.maxDate_ = new mn_date_class_1.MnDate(date);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnCalendarMultipleComponent.prototype, "startDate", {
        set: function (date) {
            var _this = this;
            if (mu.isEmpty(date)) {
                return;
            }
            this.startDate_ = new mn_date_class_1.MnDate(date);
            this.startDate_ = this._mds.reStartDate(this.startDate_, this.maxDate_, this.minDate_);
            if (!this._hasChanges) {
                this.prev_year = this.startDate_.days.year;
                this.prev_month = this.startDate_.days.month;
                this._hasChanges = true;
            }
            // 若两个月份指向同一个月份
            if (this.next_year === this.prev_year && this.next_month === this.prev_month) {
                var _adjust_next = this.startDate_.mom(1);
                this.next_year = _adjust_next.year;
                this.next_month = _adjust_next.month;
                this.next_date = this.startDate_.days.date;
            }
            this.prev_date = this.startDate_.days.date;
            setTimeout(function () {
                if (!_this.endDate_) {
                    _this.result.emit({ startDate: _this.startDate_ });
                }
            }, 100);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnCalendarMultipleComponent.prototype, "endDate", {
        set: function (date) {
            if (mu.isEmpty(date)) {
                return;
            }
            this.endDate_ = new mn_date_class_1.MnDate(date);
            this.endDate_ = this._mds.reEndDate(this.endDate_, this.maxDate_, this.minDate_);
            this.next_year = this.endDate_.days.year;
            this.next_month = this.endDate_.days.month;
            this.next_date = this.endDate_.days.date;
            // 若两个月份指向同一个月份
            if (this.next_year === this.prev_year && this.next_month === this.prev_month) {
                var _adjust_next = this.startDate_.mom(1);
                this.next_year = _adjust_next.year;
                this.next_month = _adjust_next.month;
                this.next_date = this.startDate_.days.date;
            }
            this.result.emit({
                startDate: this.startDate_,
                endDate: this.endDate_
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnCalendarMultipleComponent.prototype, "calendars", {
        set: function (calendars_) {
            var _this = this;
            this.prev_calendar = mu.prop(calendars_, '_results.0');
            this.next_calendar = mu.prop(calendars_, '_results.1');
            this.prev_calendar.getPrevMonth = function () { return _this.getPrevMonth(); };
            this.prev_calendar.getPrevYear = function () { return _this.getPrevYear(); };
            this.next_calendar.getNextMonth = function () { return _this.getNextMonth(); };
            this.next_calendar.getNextYear = function () { return _this.getNextYear(); };
            this.prev_view = mu.prop(this.prev_calendar, '_viewComponent');
            this.next_view = mu.prop(this.next_calendar, '_viewComponent');
            this.prev_view.selectedDate = function (date, type, mode) { return _this.selectedDate(date, type, mode); };
            this.next_view.selectedDate = function (date, type, mode) { return _this.selectedDate(date, type, mode); };
            this.prev_view.hovered = function (date) { return _this.hovered(date); };
            this.next_view.hovered = function (date) { return _this.hovered(date); };
        },
        enumerable: true,
        configurable: true
    });
    MnCalendarMultipleComponent.prototype.ngOnInit = function () {
    };
    MnCalendarMultipleComponent.prototype.getPrevYear = function () {
        var rst = this.prev_calendar._getPrevYear();
        this.prev_year = rst.year;
        this.prev_month = rst.month;
        this.next_year = this.next_year + 1;
    };
    MnCalendarMultipleComponent.prototype.getPrevMonth = function () {
        var rst = this.prev_calendar._getPrevMonth();
        this.prev_year = rst.year;
        this.prev_month = rst.month;
        var mom = rst.mom(1);
        this.next_year = mom.year;
        this.next_month = mom.month;
    };
    MnCalendarMultipleComponent.prototype.getNextYear = function () {
        var rst = this.next_calendar._getNextYear();
        this.next_year = rst.year;
        this.next_month = rst.month;
        this.prev_year = this.next_year - 1;
    };
    MnCalendarMultipleComponent.prototype.getNextMonth = function () {
        var rst = this.next_calendar._getNextMonth();
        this.next_year = rst.year;
        this.next_month = rst.month;
        var mom = rst.mom(-1);
        this.prev_year = mom.year;
        this.prev_month = mom.month;
    };
    MnCalendarMultipleComponent.prototype.prev_result_ = function (e) {
        this.prev_result = e;
    };
    MnCalendarMultipleComponent.prototype.next_result_ = function (e) {
        this.next_result = e;
    };
    MnCalendarMultipleComponent.prototype.selectedDate = function (date, type, mode) {
        var _this = this;
        /**
                 * 切换选择日期视图
                 */
        if (date.no_selected) {
            return;
        }
        mu.run(this.startDate_, function () {
            mu.run(_this.endDate_, function () {
                _this.startDate_ = date;
                _this.endDate_ = void 0;
            }, function () {
                if (date.days.start < _this.startDate_.days.end) {
                    _this.endDate_ = _this.startDate_;
                    _this.startDate_ = date;
                }
                else {
                    _this.endDate_ = date;
                }
            });
        }, function () {
            _this.startDate_ = date;
        });
        if (date.status === type) {
            if (date.status === 'prev') {
                this.getPrevMonth();
            }
            if (date.status === 'next') {
                this.getNextMonth();
            }
        }
        this.switchView();
        this.result.emit({
            startDate: this.startDate_,
            endDate: this.endDate_
        });
    };
    MnCalendarMultipleComponent.prototype.hovered = function (date) {
        this.prev_view._selected_end = date;
        this.next_view._selected_end = date;
    };
    MnCalendarMultipleComponent.prototype.switchView = function () {
        if (this.next_calendar._view.months.start - this.prev_calendar._view.months.end > 10000) {
            if (this.startDate_ && this.startDate_.days.start > this.next_calendar._view.months.start) {
                this.getNextMonth();
            }
            else {
                var _next = this.prev_calendar._view.mom(1);
                this.next_year = _next.year;
                this.next_month = _next.month;
                this.next_date = _next.day;
            }
        }
    };
    MnCalendarMultipleComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'mn-calendar-multiple',
                    template: "\n        <mn-fill [gutter]=\"16\">\n            <mn-col [span]=\"1\">\n                <mn-calendar\n                        [mnYear]=\"prev_year\"\n                        [mnMonth]=\"prev_month\"\n                        [mnDate]=\"prev_date\"\n                        [mnViewType]=\"'prev'\"\n                        [mnMode]=\"'multiple'\"\n                        [mnMinDate]=\"minDate_\"\n                        [mnMaxDate]=\"maxDate_\"\n                        [mnStartDate]=\"startDate_\"\n                        [mnEndDate]=\"endDate_\"\n                        (mnResult)=\"prev_result_($event)\">\n                </mn-calendar>\n            </mn-col>\n            <mn-col [span]=\"1\">\n                <mn-calendar\n                        [mnYear]=\"next_year\"\n                        [mnMonth]=\"next_month\"\n                        [mnDate]=\"next_date\"\n                        [mnMinDate]=\"minDate_\"\n                        [mnMaxDate]=\"maxDate_\"\n                        [mnViewType]=\"'next'\"\n                        [mnMode]=\"'multiple'\"\n                        [mnStartDate]=\"startDate_\"\n                        [mnEndDate]=\"endDate_\"\n                        (mnResult)=\"next_result_($event)\">\n                </mn-calendar>\n            </mn-col>\n        </mn-fill>\n    "
                },] },
    ];
    /** @nocollapse */
    MnCalendarMultipleComponent.ctorParameters = function () { return [
        { type: mn_datetime_services_1.MnDatetimeServices, },
    ]; };
    MnCalendarMultipleComponent.propDecorators = {
        "minDate": [{ type: core_1.Input, args: ['mnMinDate',] },],
        "maxDate": [{ type: core_1.Input, args: ['mnMaxDate',] },],
        "startDate": [{ type: core_1.Input, args: ['mnStartDate',] },],
        "endDate": [{ type: core_1.Input, args: ['mnEndDate',] },],
        "result": [{ type: core_1.Output, args: ['mnResult',] },],
        "calendars": [{ type: core_1.ViewChildren, args: [mn_calendar_component_1.MnCalendarComponent,] },],
    };
    return MnCalendarMultipleComponent;
}());
exports.MnCalendarMultipleComponent = MnCalendarMultipleComponent;
//# sourceMappingURL=mn-calendar-multiple.component.js.map