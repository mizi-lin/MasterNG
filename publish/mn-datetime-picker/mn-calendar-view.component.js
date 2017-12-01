"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_datetime_services_1 = require("./mn-datetime.services");
var mn_date_class_1 = require("./mn-date.class");
var MnCalendarViewComponent = (function () {
    function MnCalendarViewComponent(_mds) {
        this._mds = _mds;
        this.day = 1;
        this.viewType = 'view';
        this.mode = 'single';
        this.result = new core_1.EventEmitter();
        this.selected_start = {};
        this.selected_end = {};
    }
    Object.defineProperty(MnCalendarViewComponent.prototype, "minDate", {
        set: function (date) {
            this.minDate_ = new mn_date_class_1.MnDate(date);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnCalendarViewComponent.prototype, "maxDate", {
        set: function (date) {
            this.maxDate_ = new mn_date_class_1.MnDate(date);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnCalendarViewComponent.prototype, "startDate", {
        set: function (date) {
            this.selected_start = new mn_date_class_1.MnDate(date);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnCalendarViewComponent.prototype, "endDate", {
        set: function (date) {
            this.selected_end = new mn_date_class_1.MnDate(date);
        },
        enumerable: true,
        configurable: true
    });
    MnCalendarViewComponent.prototype.ngOnInit = function () {
    };
    MnCalendarViewComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        // year or month change
        mu.run(mu.prop(changes, 'year.currentValue') || mu.prop(changes, 'month.currentValue'), function () {
            // 年月必须同时存在
            if (!(_this.year && _this.month)) {
                var d = new Date();
                _this.year = d.getFullYear();
                _this.month = d.getMonth() + 1;
            }
            // 获取当前时间信息
            var current = _this.current = new mn_date_class_1.MnDate(_this._getDate(_this.year, _this.month, _this.day));
            var prev = _this.prev_month = current.mom(-1);
            var next = _this.next_month = current.mom(1);
            _this.result.emit(current);
            // 获取日历时间列表
            var dates = mu.run(function () {
                var prev_dates = [], current_dates = [], next_dates = [];
                var i = 0;
                while (i < current.months.startWeekday) {
                    var _d = _this.getDate(prev.year, prev.month, prev.days - i);
                    prev_dates.push(_d);
                    i++;
                }
                prev_dates = prev_dates.reverse();
                current_dates = mu.map(current.months.days, function (day) {
                    return _this.getDate(current.days.year, current.days.month, day);
                }, []);
                var len = 42 - prev_dates.length - current_dates.length;
                for (var j = 1; j <= len; j++) {
                    var _d = _this.getDate(next.year, next.month, j);
                    next_dates.push(_d);
                }
                return prev_dates.concat(current_dates, next_dates);
            });
            var _dates = mu.map(6, function (i) {
                return new Array(7);
            }, []);
            mu.each(42, function (i, ii) {
                var row = Math.floor(ii / 7);
                var col = ii % 7;
                _dates[row][col] = dates[ii];
            });
            _this.calendar = _dates;
        });
    };
    // 获得日期字符串
    // 获得日期字符串
    MnCalendarViewComponent.prototype._getDate = 
    // 获得日期字符串
    function (year, month, day) {
        if (month === void 0) { month = 1; }
        if (day === void 0) { day = 1; }
        return year + "-" + mu.leftpad(month, 2) + "-" + mu.leftpad(day, 2);
    };
    // 获得当前日期
    // 获得当前日期
    MnCalendarViewComponent.prototype.getDate = 
    // 获得当前日期
    function (year, month, day) {
        var date = this._getDate(year, month, day);
        var rst = new mn_date_class_1.MnDate(date);
        rst.is_today = rst.days.start === mu.timestamp(new Date(), 'hhmmssSS');
        rst.status = this.prev_month.end > rst.months.start
            ? 'prev' : this.next_month.start < rst.months.end
            ? 'next' : 'current';
        mu.run(this.minDate_, function (min) {
            rst.min_date = min._ts;
            rst.min = rst.days.end < min._ts;
        });
        mu.run(this.maxDate_, function (max) {
            rst.max_date = max._ts;
            rst.max = rst.days.start > max._ts;
        });
        rst.no_selected = mu.ifnvl(rst.min, false) || mu.ifnvl(rst.max, false);
        return rst;
    };
    MnCalendarViewComponent.prototype.selectedDate = function (date, type, mode) {
        if (this.mode === 'single' && !date.no_selected) {
            this.selected_start = date;
            this.result.emit(date);
        }
    };
    MnCalendarViewComponent.prototype.selected = function (d) {
        var _this = this;
        if (this.mode === 'single') {
            return mu.run(this.selected_start, function () {
                return d.days.start === mu.prop(_this.selected_start, 'days.start');
            });
        }
    };
    MnCalendarViewComponent.prototype.hovered = function (d) {
        return d;
    };
    MnCalendarViewComponent.prototype.started = function (d) {
        var _this = this;
        if (d.status === 'current' && this.mode === 'multiple') {
            return mu.run(this.selected_start, function () {
                return d.days.start === mu.prop(_this.selected_start, 'days.start');
            });
        }
    };
    MnCalendarViewComponent.prototype.ended = function (d) {
        var _this = this;
        if (d.status === 'current' && this.mode === 'multiple') {
            return mu.run(this.selected_end, function () {
                return d.days.start === mu.prop(_this.selected_end, 'days.start');
            });
        }
    };
    /**
     * 判断时间区间
     * @param d
     */
    /**
         * 判断时间区间
         * @param d
         */
    MnCalendarViewComponent.prototype.ranged = /**
         * 判断时间区间
         * @param d
         */
    function (d) {
        var selected_end = mu.ifempty(this.selected_end, this._selected_end);
        if (this.mode === 'multiple' && mu.isNotEmpty(this.selected_start) && mu.isNotEmpty(selected_end)) {
            return d.days.start > this.selected_start.days.end && d.days.end < selected_end.days.end;
            // try {
            //     return d.days.start > this.selected_start.days.end && d.days.end < selected_end.days.end;
            // } catch (e) {
            //     console.log(this.selected_start);
            //     console.log(d);
            //     console.log(this.selected_end, this._selected_end);
            // }
        }
    };
    /**
     * 反向日期显示
     * @param d
     * @return {boolean}
     */
    /**
         * 反向日期显示
         * @param d
         * @return {boolean}
         */
    MnCalendarViewComponent.prototype.reverseRanged = /**
         * 反向日期显示
         * @param d
         * @return {boolean}
         */
    function (d) {
        if (this.mode === 'multiple' && mu.isNotEmpty(this._selected_end) && mu.isNotEmpty(this.selected_start)) {
            return d.days.end < this.selected_start.days.start && d.days.end > this._selected_end.days.start;
        }
    };
    MnCalendarViewComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'mn-calendar-view',
                    template: "\n        <div class=\"p-8 bordered\">\n            <ol>\n                <li>\n                    <mn-fill class=\"mnc-header\">\n                        <mn-col [span]=\"1\">\u65E5</mn-col>\n                        <mn-col [span]=\"1\">\u4E00</mn-col>\n                        <mn-col [span]=\"1\">\u4E8C</mn-col>\n                        <mn-col [span]=\"1\">\u4E09</mn-col>\n                        <mn-col [span]=\"1\">\u56DB</mn-col>\n                        <mn-col [span]=\"1\">\u4E94</mn-col>\n                        <mn-col [span]=\"1\">\u516D</mn-col>\n                    </mn-fill>\n\n                    <mn-fill *ngFor=\"let week of calendar\" class=\"mnc-items\" [gutter]=\"2\">\n                        <mn-col [span]=\"1\" *ngFor=\"let d of week\"\n                                [class.prev]=\"d?.status === 'prev'\"\n                                [class.next]=\"d?.status === 'next'\"\n                                [class.today]=\"d?.is_today\"\n                                [class.no-selected]=\"d?.no_selected\"\n                                [class.b]=\"d?.day === 1\"\n                                [class.selected]=\"selected(d)\"\n                                [class.start]=\"started(d)\"\n                                [class.end]=\"ended(d)\"\n                                [class.range]=\"ranged(d)\"\n                                [class.range-reverse]=\"reverseRanged(d)\"\n                                (mouseover)=\"hovered(d)\"\n                                (click)=\"selectedDate(d, viewType, mode, $event)\">\n                            {{d?.days?.date === 1 ? d?.days.month + '-' + d?.days.date : d?.days.date}}\n                            <!--{{d.year}}-{{d.month}}-{{d.date}}-->\n                        </mn-col>\n                    </mn-fill>\n                </li>\n            </ol>\n        </div>\n    ",
                    styles: ['mn-calendar-multiple,mn-datetimeranges,mn-calendar,mn-yearspicker,mn-monthspicker,mn-quarterspicker {  display: block;}mn-quarterspicker mn-fill mn-col .mn-col-content,mn-monthspicker mn-fill mn-col .mn-col-content {  padding: 4px;}mn-quarterspicker mn-fill mn-col .mn-col-content .mnc-quarterspicker-name,mn-monthspicker mn-fill mn-col .mn-col-content .mnc-quarterspicker-name,mn-quarterspicker mn-fill mn-col .mn-col-content .mnc-monthspicker-month,mn-monthspicker mn-fill mn-col .mn-col-content .mnc-monthspicker-month {  text-align: right;  font-size: 15px;  line-height: 1.5;}mn-quarterspicker mn-fill mn-col .mn-col-content .mnc-quarterspicker-year,mn-monthspicker mn-fill mn-col .mn-col-content .mnc-quarterspicker-year,mn-quarterspicker mn-fill mn-col .mn-col-content .mnc-monthspicker-year,mn-monthspicker mn-fill mn-col .mn-col-content .mnc-monthspicker-year {  text-align: right;  font-size: 13px;  color: #999;  line-height: 1.5;}mn-yearspicker,mn-monthspicker,mn-quarterspicker {  padding: 8px;  border: 1px solid #d9d9d9;  min-height: 300px;  max-height: 300px;  overflow-y: auto;}mn-yearspicker section,mn-monthspicker section,mn-quarterspicker section {  padding-bottom: 8px;}mn-yearspicker section + section,mn-monthspicker section + section,mn-quarterspicker section + section {  padding-top: 8px;  margin-top: 8px;  border-top: 1px solid #d9d9d9;}mn-yearspicker mn-fill mn-col,mn-monthspicker mn-fill mn-col,mn-quarterspicker mn-fill mn-col {  text-align: center;  line-height: 28px;  font-size: 14px;  cursor: pointer;}mn-yearspicker mn-fill mn-col.range .mn-col-content,mn-monthspicker mn-fill mn-col.range .mn-col-content,mn-quarterspicker mn-fill mn-col.range .mn-col-content {  background: #e2f2fe;}mn-yearspicker mn-fill mn-col.range-reverse .mn-col-content,mn-monthspicker mn-fill mn-col.range-reverse .mn-col-content,mn-quarterspicker mn-fill mn-col.range-reverse .mn-col-content {  background: #fef2e2;}mn-yearspicker mn-fill mn-col.selected .mn-col-content,mn-monthspicker mn-fill mn-col.selected .mn-col-content,mn-quarterspicker mn-fill mn-col.selected .mn-col-content {  background: rgba(61, 168, 245, 0.6);  border-radius: 2px;}mn-yearspicker mn-fill mn-col.start .mn-col-content,mn-monthspicker mn-fill mn-col.start .mn-col-content,mn-quarterspicker mn-fill mn-col.start .mn-col-content {  background: rgba(61, 168, 245, 0.3);  border-radius: 2px;}mn-yearspicker mn-fill mn-col.end .mn-col-content,mn-monthspicker mn-fill mn-col.end .mn-col-content,mn-quarterspicker mn-fill mn-col.end .mn-col-content {  background: rgba(61, 168, 245, 0.5);  border-radius: 2px;}mn-yearspicker mn-fill mn-col.no-selected,mn-monthspicker mn-fill mn-col.no-selected,mn-quarterspicker mn-fill mn-col.no-selected {  cursor: not-allowed;}mn-yearspicker mn-fill mn-col.no-selected .mn-col-content,mn-monthspicker mn-fill mn-col.no-selected .mn-col-content,mn-quarterspicker mn-fill mn-col.no-selected .mn-col-content {  color: #aaa;  text-decoration: line-through;}mn-yearspicker mn-fill + mn-fill,mn-monthspicker mn-fill + mn-fill,mn-quarterspicker mn-fill + mn-fill {  margin-top: 2px;}mn-datetimepicker {  display: inline-block;  height: 28px;}mn-datetimepicker mn-dropdown {  border: 1px solid #d9d9d9;  border-radius: 2px;  height: 100%;}mn-datetimepicker mn-dropdown > div {  height: 100%;}mn-datetimepicker mn-dropdown mn-input {  border: 1px solid transparent;  height: 100%;  width: auto;  cursor: pointer;}mn-datetimepicker mn-dropdown mn-input span.mnc-next {  color: #ccc;  margin-right: -3px;  line-height: 23px;}mn-datetimepicker mn-dropdown mn-input i.mnc-next {  color: #666;  line-height: 25px;}mn-datetimepicker mn-dropdown mn-input input {  display: inline-block;  width: 100%;}mn-datetimeranges {  padding-right: 8px;}mn-datetimeranges mn-fill.mnc-header .mn-col-content {  padding-left: 8px;  height: 28px;  line-height: 28px;  border-bottom: 1px solid #d9d9d9;}mn-datetimeranges section {  display: none;}mn-datetimeranges section.active {  display: block;}mn-datetimeranges section li {  padding-left: 8px;  height: 28px;  line-height: 28px;  border-radius: 2px;}mn-datetimeranges section li:hover {  background: rgba(61, 168, 245, 0.3);  cursor: pointer;}mn-datetimeranges section li.selected {  background: #108ee9;  border-color: #0e77ca;  color: #fff;}mn-calendar .mnc-header {  height: 28px;  font-size: 15px;}mn-calendar .mnc-header .mnc-header-prev {  padding-left: 8px;  text-align: left;}mn-calendar .mnc-header .mnc-header-current {  text-align: center;}mn-calendar .mnc-header .mnc-header-next {  padding-right: 8px;  text-align: right;}mn-calendar .mnc-header i {  width: 16px;  text-align: center;  color: #999;  font-size: 16px;  transition: color 0.2s ease-in-out;}mn-calendar .mnc-header i:hover {  color: rgba(61, 168, 245, 0.8);}mn-calendar .mnc-header + mn-calendar-view {  margin-top: 8px;}mn-calendar-view {  display: block;  font-size: 15px;}mn-calendar-view .prev .mn-col-content {  color: #999;}mn-calendar-view .next .mn-col-content {  color: #999;}mn-calendar-view .b {  color: #666;  font-weight: 400;}mn-calendar-view .range:not(.next):not(.prev):not(.no-selected) .mn-col-content {  background: #e2f2fe;}mn-calendar-view .range-reverse:not(.next):not(.prev):not(.no-selected) .mn-col-content {  background: #fef2e2;}mn-calendar-view .mnc-header {  padding-bottom: 8px;  margin-bottom: 8px;  font-size: 14px;  border-bottom: 1px solid #e7ecf1;}mn-calendar-view .mnc-header + .mnc-items,mn-calendar-view .mnc-items + .mnc-items {  margin-top: 2px;}mn-calendar-view .mnc-header > mn-col .mn-col-content,mn-calendar-view .mnc-items > mn-col .mn-col-content {  height: 32px;  line-height: 32px;  text-align: center;}mn-calendar-view .mnc-header > mn-col.today,mn-calendar-view .mnc-items > mn-col.today {  color: #ed6b75;}mn-calendar-view .mnc-header > mn-col:not(.no-selected):not(.next):not(.prev):hover .mn-col-content,mn-calendar-view .mnc-items > mn-col:not(.no-selected):not(.next):not(.prev):hover .mn-col-content {  background: rgba(61, 168, 245, 0.4);  border-radius: 2px;  cursor: pointer;}mn-calendar-view .mnc-header > mn-col.selected .mn-col-content,mn-calendar-view .mnc-items > mn-col.selected .mn-col-content {  background: rgba(61, 168, 245, 0.6);  border-radius: 2px;}mn-calendar-view .mnc-header > mn-col.start .mn-col-content,mn-calendar-view .mnc-items > mn-col.start .mn-col-content {  background: rgba(61, 168, 245, 0.3);  border-radius: 2px;}mn-calendar-view .mnc-header > mn-col.end .mn-col-content,mn-calendar-view .mnc-items > mn-col.end .mn-col-content {  background: rgba(61, 168, 245, 0.5);  border-radius: 2px;}mn-calendar-view .mnc-header > mn-col.no-selected,mn-calendar-view .mnc-items > mn-col.no-selected {  cursor: not-allowed;}mn-calendar-view .mnc-header > mn-col.no-selected .mn-col-content,mn-calendar-view .mnc-items > mn-col.no-selected .mn-col-content {  color: #aaa;  text-decoration: line-through;}'],
                    encapsulation: core_1.ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    MnCalendarViewComponent.ctorParameters = function () { return [
        { type: mn_datetime_services_1.MnDatetimeServices, },
    ]; };
    MnCalendarViewComponent.propDecorators = {
        "year": [{ type: core_1.Input, args: ['mnYear',] },],
        "month": [{ type: core_1.Input, args: ['mnMonth',] },],
        "day": [{ type: core_1.Input, args: ['mnDate',] },],
        "viewType": [{ type: core_1.Input, args: ['mnViewType',] },],
        "mode": [{ type: core_1.Input, args: ['mnMode',] },],
        "minDate": [{ type: core_1.Input, args: ['mnMinDate',] },],
        "maxDate": [{ type: core_1.Input, args: ['mnMaxDate',] },],
        "startDate": [{ type: core_1.Input, args: ['mnStartDate',] },],
        "endDate": [{ type: core_1.Input, args: ['mnEndDate',] },],
        "result": [{ type: core_1.Output, args: ['mnResult',] },],
    };
    return MnCalendarViewComponent;
}());
exports.MnCalendarViewComponent = MnCalendarViewComponent;
//# sourceMappingURL=mn-calendar-view.component.js.map