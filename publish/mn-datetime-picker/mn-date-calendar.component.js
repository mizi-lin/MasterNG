"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_date_class_1 = require("./mn-date.class");
var mn_datetime_services_1 = require("./mn-datetime.services");
/**
 * 构建日期视图
 */
var MnDateCalendarComponent = (function () {
    function MnDateCalendarComponent(_mds) {
        this._mds = _mds;
        this._result = new core_1.EventEmitter();
        this._startEnd = new core_1.EventEmitter();
        this._hover = new core_1.EventEmitter();
        this._day = 1;
        this._view = 'days';
        this._tools = true;
        this._title = '';
        this._show_prev_big = true;
        this._show_prev_small = true;
        this._show_next_big = true;
        this._show_next_small = true;
    }
    Object.defineProperty(MnDateCalendarComponent.prototype, "maxDate_", {
        set: function (dt) {
            this._maxDate = new mn_date_class_1.MnDate(dt);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateCalendarComponent.prototype, "minDate_", {
        set: function (dt) {
            this._minDate = new mn_date_class_1.MnDate(dt);
        },
        enumerable: true,
        configurable: true
    });
    MnDateCalendarComponent.prototype.ngOnInit = function () {
        var current = new mn_date_class_1.MnDate(new Date());
        this._year = mu.ifnvl(this._year, current.days.year);
        this._month = mu.ifnvl(this._month, current.days.month);
    };
    MnDateCalendarComponent.prototype.getResult = function ($event) {
        var _this = this;
        this._mdate = $event;
        switch (this._view) {
            case 'days':
                this._title = mu.format(this._mdate._date, 'yyyy-MM');
                var _prevMinDate = mu.run(this._prevDate, function () {
                    return new mn_date_class_1.MnDate(_this._prevDate.mom(1).start);
                });
                mu.run(_prevMinDate || this._minDate, function (_minDate) {
                    _this._show_prev_small = _this._mds.compared(_this._view, _this._mdate.months.start, _minDate) === 1;
                    if (!_this._show_prev_small) {
                        _this._show_prev_big = false;
                    }
                    else {
                        var _prev = _this._mdate.yoy(-1, true);
                        _this._show_prev_big = _this._mds.compared(_this._view, _prev.start, _minDate) === 1;
                    }
                });
                mu.run(this._nextDate || this._maxDate, function (_maxDate) {
                    _this._show_next_small = _this._mds.compared(_this._view, _this._mdate.months.end, _maxDate) === -1;
                    if (!_this._show_next_small) {
                        _this._show_next_big = false;
                    }
                    else {
                        var _next_year = _this._mdate.mom(12);
                        _this._show_next_big = _this._mds.compared(_this._view, _next_year.start, _maxDate) === -1;
                    }
                });
                break;
        }
        this._result.emit($event);
    };
    MnDateCalendarComponent.prototype.prevBig = function () {
        switch (this._view) {
            case 'days':
                this._year = this._mdate.days.year - 1;
                break;
        }
    };
    MnDateCalendarComponent.prototype.prevSmall = function () {
        switch (this._view) {
            case 'days':
                var _prev = this._mdate.mom(-1);
                this._month = _prev.month;
                this._year = _prev.year;
                break;
        }
    };
    MnDateCalendarComponent.prototype.nextBig = function () {
        switch (this._view) {
            case 'days':
                this._year = this._mdate.days.year + 1;
                break;
        }
    };
    MnDateCalendarComponent.prototype.nextSmall = function () {
        switch (this._view) {
            case 'days':
                var _next = this._mdate.mom(1);
                this._month = _next.month;
                this._year = _next.year;
                break;
        }
    };
    MnDateCalendarComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'mn-datecalendar',
                    encapsulation: core_1.ViewEncapsulation.None,
                    styles: ['.start {  background: #0e77ca;}.end {  background: #ed6b75;}.range {  background: #fff000;}.hover {  background: rgba(255, 240, 0, 0.5);}.re-hover {  background: rgba(14, 119, 202, 0.3);}.max {  color: #aaa;  text-decoration: line-through;}.min {  color: #f00;  text-decoration: line-through;}.current {  cursor: pointer;}.current:not(.max):not(.min):hover {  background: rgba(237, 107, 117, 0.8);}.next,.prev {  color: #ccc;}mn-datesingle,mn-datecalendar,mn-datedraw,mn-datemultiple {  display: block;}'],
                    template: "\n        <mn-fill [hph]=\"false\" class=\"mnc-header\">\n            <mn-col [style.width.px]=\"60\" class=\"mnc-header-prev\">\n                <i class=\"fa fa-angle-double-left\" *ngIf=\"_tools && _show_prev_big\"\n                   (click)=\"prevBig()\"></i>\n                <i class=\"fa fa-angle-left\" *ngIf=\"_tools && _show_prev_small\"\n                   (click)=\"prevSmall()\"></i>\n            </mn-col>\n            <mn-col [span]=\"1\" class=\"mnc-header-current\">\n                {{_title}}\n            </mn-col>\n            <mn-col [style.width.px]=\"60\" class=\"mnc-header-next\">\n                <i class=\"fa fa-angle-right\" *ngIf=\"_tools && _show_next_small\"\n                   (click)=\"nextSmall()\"></i>\n                <i class=\"fa fa-angle-double-right\" *ngIf=\"_tools && _show_next_big\"\n                   (click)=\"nextBig()\"></i>\n            </mn-col>\n        </mn-fill>\n\n        <mn-datedraw\n                [mnYear]=\"_year\"\n                [mnMonth]=\"_month\"\n                [mnDay]=\"_day\"\n                [mnView]=\"'days'\"\n                [mnMaxDate]=\"_maxDate\"\n                [mnMinDate]=\"_minDate\"\n                [mnStartDate]=\"_startDate\"\n                [mnEndDate]=\"_endDate\"\n                [mnHoverDate]=\"_hoverDate\"\n                (mnStartEnd)=\"_startEnd.emit($event)\"\n                (mnHover)=\"_hover.emit($event)\"\n                (mnResult)=\"getResult($event)\"></mn-datedraw>\n    "
                },] },
    ];
    /** @nocollapse */
    MnDateCalendarComponent.ctorParameters = function () { return [
        { type: mn_datetime_services_1.MnDatetimeServices, },
    ]; };
    MnDateCalendarComponent.propDecorators = {
        "_result": [{ type: core_1.Output, args: ['mnResult',] },],
        "_startEnd": [{ type: core_1.Output, args: ['mnStartEnd',] },],
        "_hover": [{ type: core_1.Output, args: ['mnHover',] },],
        "maxDate_": [{ type: core_1.Input, args: ['mnMaxDate',] },],
        "minDate_": [{ type: core_1.Input, args: ['mnMinDate',] },],
        "_prevDate": [{ type: core_1.Input, args: ['mnPrevDate',] },],
        "_nextDate": [{ type: core_1.Input, args: ['mnNextDate',] },],
        "_startDate": [{ type: core_1.Input, args: ['mnStartDate',] },],
        "_endDate": [{ type: core_1.Input, args: ['mnEndDate',] },],
        "_hoverDate": [{ type: core_1.Input, args: ['mnHoverDate',] },],
        "_year": [{ type: core_1.Input, args: ['mnYear',] },],
        "_month": [{ type: core_1.Input, args: ['mnMonth',] },],
        "_day": [{ type: core_1.Input, args: ['mnDay',] },],
        "_view": [{ type: core_1.Input, args: ['mnView',] },],
        "_tools": [{ type: core_1.Input, args: ['mnTools',] },],
    };
    return MnDateCalendarComponent;
}());
exports.MnDateCalendarComponent = MnDateCalendarComponent;
//# sourceMappingURL=mn-date-calendar.component.js.map