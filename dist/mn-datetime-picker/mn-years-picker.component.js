"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_date_class_1 = require("./mn-date.class");
var mn_datetime_services_1 = require("./mn-datetime.services");
var MnYearsPickerComponent = (function () {
    function MnYearsPickerComponent(_mds) {
        this._mds = _mds;
        this.result = new core_1.EventEmitter();
        this.current = new mn_date_class_1.MnDate(new Date());
        this.calendar = [];
        this._tenshow = {};
    }
    Object.defineProperty(MnYearsPickerComponent.prototype, "_maxDate", {
        set: function (value) {
            if (value) {
                this.maxDate = new mn_date_class_1.MnDate(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnYearsPickerComponent.prototype, "_minDate", {
        set: function (value) {
            if (value) {
                this.minDate = new mn_date_class_1.MnDate(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnYearsPickerComponent.prototype, "_startDate", {
        set: function (value) {
            if (value) {
                var startDate = new mn_date_class_1.MnDate(value);
                this.startDate = this._mds.reStartDate(startDate, this.maxDate, this.minDate);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnYearsPickerComponent.prototype, "_endDate", {
        set: function (value) {
            if (!value) {
                return;
            }
            if (!this.startDate) {
                console.warn('startDate and endDate must exist at the same time');
            }
            var endDate = new mn_date_class_1.MnDate(value);
            this.endDate = this._mds.reEndDate(endDate, this.maxDate, this.minDate);
            this.result.emit(this.backStartEnd(this.startDate, this.endDate, true));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnYearsPickerComponent.prototype, "_date", {
        set: function (value) {
            if (this.startDate || this.endDate) {
                console.warn('startDate or endDate can not exist with the date');
            }
            var date = new mn_date_class_1.MnDate(value);
            this.startDate = new mn_date_class_1.MnDate(date.years.start);
            this.endDate = new mn_date_class_1.MnDate(date.years.end);
        },
        enumerable: true,
        configurable: true
    });
    MnYearsPickerComponent.prototype.ngOnInit = function () {
        // 设置startDate, endDate 默认值
        if (!(mu.isNotEmpty(this.endDate) && mu.isNotEmpty(this.startDate))) {
            this.startDate = new mn_date_class_1.MnDate(this.current.years.start);
            this.endDate = new mn_date_class_1.MnDate(this.current.years.end);
        }
        // 设置minDate, maxDate默认值
        if (mu.isNotExist(this.minDate)) {
            var _y = (this.startDate.years.year % 10 + 21);
            var minDate = this.startDate.yoy(-_y);
            this.minDate = new mn_date_class_1.MnDate(minDate.start);
        }
        // 设置minDate, maxDate默认值
        if (mu.isNotExist(this.maxDate)) {
            var _y = (10 - this.endDate.years.year % 10 + 20);
            var maxDate = this.endDate.yoy(_y);
            this.maxDate = new mn_date_class_1.MnDate(maxDate.start);
        }
        this.result.emit(this.backStartEnd(this.startDate, this.endDate, true));
        var _start_century = Math.floor(this.minDate.years.year / 100);
        var _end_century = Math.floor(this.maxDate.years.year / 100);
        for (var i = _start_century; i <= _end_century; i++) {
            this.calendar.unshift({
                century: i + 1,
                years: this.getCenturyYears(i)
            });
        }
    };
    MnYearsPickerComponent.prototype.getCenturyYears = function (century) {
        var _this = this;
        return mu.map(10, function (i, index) {
            var _ten_show = false;
            return mu.map(10, function (_i, _index) {
                var year = century + mu.leftpad(99 - (10 * index + _index), 2);
                var _mndate = new mn_date_class_1.MnDate(year);
                _mndate.show = true;
                if (_this.minDate) {
                    _mndate.show = _mndate.years.start > _this.minDate._ts;
                }
                if (_this.maxDate && _mndate.show) {
                    _mndate.show = _mndate.years.end < _this.maxDate._ts;
                }
                _mndate._ten = Math.floor(year / 10);
                if (!_mndate.show) {
                    _this._tenshow[_mndate._ten] = (_this._tenshow[_mndate._ten] || 0) + 1;
                }
                return _mndate;
            }, []);
        }, []);
    };
    MnYearsPickerComponent.prototype.selected = function (date) {
        var _this = this;
        if (!date.show) {
            return;
        }
        mu.run(this.startDate, function () {
            mu.run(_this.endDate, function () {
                _this.startDate = date;
                _this.endDate = void 0;
            }, function () {
                if (date.years.start < _this.startDate.years.end) {
                    _this.endDate = _this.startDate;
                    _this.startDate = date;
                }
                else {
                    _this.endDate = date;
                }
            });
        }, function () {
            _this.startDate = date;
        });
        this.result.emit(this.backStartEnd(this.startDate, this.endDate, false));
    };
    MnYearsPickerComponent.prototype.hovered = function (date) {
        this._hoverDate = date;
    };
    MnYearsPickerComponent.prototype.started = function (date) {
        var _this = this;
        return mu.run(this.startDate, function () {
            return date.show && date.years.start === mu.prop(_this.startDate, 'years.start');
        });
    };
    MnYearsPickerComponent.prototype.ended = function (date) {
        var _this = this;
        return mu.run(this.endDate, function () {
            return date.show && date.years.start === mu.prop(_this.endDate, 'years.start');
        });
    };
    /**
     * 判断时间区间
     * @param date
     */
    MnYearsPickerComponent.prototype.ranged = function (date) {
        var endDate = mu.ifempty(this.endDate, this._hoverDate);
        if (this.startDate && endDate) {
            return date.show && this.startDate.years.end < date.years.start && date.years.start < endDate.years.end;
        }
    };
    /**
     * 反向日期显示
     * @param date
     * @return {boolean}
     */
    MnYearsPickerComponent.prototype.reverseRanged = function (date) {
        if (this.startDate && this._hoverDate && !this.endDate) {
            return date.show && this.startDate.years.end > date.years.start && date.years.end > this._hoverDate.years.start;
        }
    };
    MnYearsPickerComponent.prototype.backStartEnd = function (_startDate, _endDate, first) {
        var startDate = mu.isNotEmpty(_startDate) ? new mn_date_class_1.MnDate(_startDate.years.start) : void 0;
        var endDate = mu.isNotEmpty(_endDate) ? new mn_date_class_1.MnDate(_endDate.years.end) : void 0;
        return {
            startDate: startDate,
            endDate: endDate,
            first: first,
        };
    };
    return MnYearsPickerComponent;
}());
MnYearsPickerComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-yearspicker',
                template: "\n        <section *ngFor=\"let century of calendar\">\n            <!--<h5>{{century.century}}st</h5>-->\n            <ng-container *ngFor=\"let tenYears of century.years\">\n                <mn-fill *ngIf=\"(_tenshow[tenYears[0]._ten] || 0) !== 10\" [gutter]=\"2\">\n                    <ng-container *ngFor=\"let year of tenYears\">\n                        <mn-col *ngIf=\"year.show || _tenshow[year._ten] < 10\" [span]=\"2\"\n                                [class.no-selected]=\"!year.show\"\n                                [class.start]=\"started(year)\"\n                                [class.end]=\"ended(year)\"\n                                [class.range]=\"ranged(year)\"\n                                [class.range-reverse]=\"reverseRanged(year)\"\n                                (mouseover)=\"hovered(year)\"\n                                (click)=\"selected(year)\">\n                            {{year.years.year}}\n                        </mn-col>\n                    </ng-container>\n                </mn-fill>\n            </ng-container>\n        </section>\n    "
            },] },
];
/** @nocollapse */
MnYearsPickerComponent.ctorParameters = function () { return [
    { type: mn_datetime_services_1.MnDatetimeServices, },
]; };
MnYearsPickerComponent.propDecorators = {
    '_maxDate': [{ type: core_1.Input, args: ['mnMaxDate',] },],
    '_minDate': [{ type: core_1.Input, args: ['mnMinDate',] },],
    '_startDate': [{ type: core_1.Input, args: ['mnStartDate',] },],
    '_endDate': [{ type: core_1.Input, args: ['mnEndDate',] },],
    '_date': [{ type: core_1.Input, args: ['mnDate',] },],
    'result': [{ type: core_1.Output, args: ['mnResult',] },],
};
exports.MnYearsPickerComponent = MnYearsPickerComponent;
//# sourceMappingURL=mn-years-picker.component.js.map