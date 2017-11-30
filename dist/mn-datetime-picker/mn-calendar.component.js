"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_datetime_services_1 = require("./mn-datetime.services");
var mn_calendar_view_component_1 = require("./mn-calendar-view.component");
var mn_date_class_1 = require("./mn-date.class");
exports.YEAR_MILLISECONDS = 864000;
var MnCalendarComponent = (function () {
    function MnCalendarComponent(_mds) {
        var _this = this;
        this._mds = _mds;
        this.date = 1;
        // 日历类型，normal, prev, next
        this.viewType = 'normal';
        // 日历模式, single, multiple
        this.mode = 'single';
        this.result = new core_1.EventEmitter();
        this._current = new Date();
        this._show = {
            prev_year: true,
            prev_month: true,
            next_year: true,
            next_month: true
        };
        this._getPrevMonth = this.getPrevMonth;
        this._getPrevYear = this.getPrevYear;
        this._getNextMonth = this.getNextMonth;
        this._getNextYear = this.getNextYear;
        this._getView = this.getView;
        // 设置按钮显示
        // FIXED NG ERROR::: Expression has changed after it was checked.
        this.getShow = mu.debounce(function () {
            mu.run(_this._show, function () {
                mu.run(_this.maxDate_, function (max) {
                    // 获取下一年这月的时间戳
                    var next_year = _this._view.yoy(1);
                    _this._show.next_year = next_year.start < max._ts;
                    _this._show.next_month = _this._view.months.end < max._ts;
                });
                mu.run(_this.minDate_, function (min) {
                    var prev_year = _this._view.yoy(-1);
                    _this._show.prev_year = prev_year.end > min._ts;
                    _this._show.prev_month = _this._view.months.start > min._ts;
                });
            });
        }, 300);
        mu.run(!(this.year && this.month), function () {
            _this._year = _this._current.getFullYear();
            _this._month = _this._current.getMonth() + 1;
        });
    }
    Object.defineProperty(MnCalendarComponent.prototype, "minDate", {
        set: function (date) {
            this.minDate_ = new mn_date_class_1.MnDate(date);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnCalendarComponent.prototype, "maxDate", {
        set: function (date) {
            this.maxDate_ = new mn_date_class_1.MnDate(date);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnCalendarComponent.prototype, "viewComponent", {
        set: function (_vc) {
            var _this = this;
            this._viewComponent = _vc;
            _vc.selectedDate = function (date) {
                if (_this.mode === 'single' && !date.no_selected) {
                    if (date.status !== 'current') {
                        var _md = _this._view.mom(date.status === 'prev' ? -1 : 1);
                        _this._year = _md.year;
                        _this._month = _md.month;
                        date.status = 'current';
                    }
                    _vc.selected_start = date;
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    MnCalendarComponent.prototype.ngOnInit = function () {
    };
    MnCalendarComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        mu.run(mu.prop(changes, 'year.currentValue'), function (year) {
            _this._year = year;
        });
        mu.run(mu.prop(changes, 'month.currentValue'), function (month) {
            _this._month = month;
        });
    };
    MnCalendarComponent.prototype.getPrevMonth = function () {
        var _prev = this._view.mom(-1);
        this._month = _prev.month;
        this._year = _prev.year;
        return _prev;
    };
    MnCalendarComponent.prototype.getPrevYear = function () {
        var _prev = this._view.yoy(-1);
        this._year = _prev.year;
        return _prev;
    };
    MnCalendarComponent.prototype.getNextMonth = function () {
        var _next = this._view.mom(1);
        this._month = _next.month;
        this._year = _next.year;
        return _next;
    };
    MnCalendarComponent.prototype.getNextYear = function () {
        var _next = this._view.yoy(1);
        this._year = _next.year;
        return _next;
    };
    MnCalendarComponent.prototype.getView = function (e) {
        this._view = e;
        this.getShow();
        this.result.emit(e);
    };
    return MnCalendarComponent;
}());
MnCalendarComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-calendar',
                template: "\n        <mn-fill [hph]=\"false\" class=\"mnc-header\">\n            <mn-col [style.width.px]=\"60\" class=\"mnc-header-prev\">\n                <i class=\"fa fa-angle-double-left\"\n                   (click)=\"getPrevYear()\"\n                   *ngIf=\"viewType !== 'next' && _show.prev_year\">\n                </i>\n                <i class=\"fa fa-angle-left\"\n                   (click)=\"getPrevMonth()\"\n                   *ngIf=\"(viewType !== 'next') && _show.prev_month\">\n                </i>\n\n            </mn-col>\n            <mn-col [span]=\"1\" class=\"mnc-header-current\">\n                {{this._view?.months.year}}-{{this._view?.months.month | mu: 'leftpad': 2}}\n            </mn-col>\n            <mn-col [style.width.px]=\"60\" class=\"mnc-header-next\">\n                <i class=\"fa fa-angle-right\"\n                   (click)=\"getNextMonth()\"\n                   *ngIf=\"viewType !== 'prev' && _show.next_month\">\n                </i>\n                <i class=\"fa fa-angle-double-right\"\n                   (click)=\"getNextYear()\"\n                   *ngIf=\"viewType !== 'prev' && _show.next_year\">\n                </i>\n            </mn-col>\n        </mn-fill>\n\n        <mn-calendar-view\n                [mnYear]=\"_year\"\n                [mnMonth]=\"_month\"\n                [mnDate]=\"23\"\n                [mnMinDate]=\"minDate_\"\n                [mnMaxDate]=\"maxDate_\"\n                [mnViewType]=\"viewType\"\n                [mnMode]=\"mode\"\n                [mnStartDate]=\"startDate\"\n                [mnEndDate]=\"endDate\"\n                (mnResult)=\"getView($event)\">\n        </mn-calendar-view>\n    "
            },] },
];
/** @nocollapse */
MnCalendarComponent.ctorParameters = function () { return [
    { type: mn_datetime_services_1.MnDatetimeServices, },
]; };
MnCalendarComponent.propDecorators = {
    'year': [{ type: core_1.Input, args: ['mnYear',] },],
    'month': [{ type: core_1.Input, args: ['mnMonth',] },],
    'date': [{ type: core_1.Input, args: ['mnDate',] },],
    'viewType': [{ type: core_1.Input, args: ['mnViewType',] },],
    'mode': [{ type: core_1.Input, args: ['mnMode',] },],
    'minDate': [{ type: core_1.Input, args: ['mnMinDate',] },],
    'maxDate': [{ type: core_1.Input, args: ['mnMaxDate',] },],
    'startDate': [{ type: core_1.Input, args: ['mnStartDate',] },],
    'endDate': [{ type: core_1.Input, args: ['mnEndDate',] },],
    'result': [{ type: core_1.Output, args: ['mnResult',] },],
    'viewComponent': [{ type: core_1.ViewChild, args: [mn_calendar_view_component_1.MnCalendarViewComponent,] },],
};
exports.MnCalendarComponent = MnCalendarComponent;
//# sourceMappingURL=mn-calendar.component.js.map