"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_date_class_1 = require("./mn-date.class");
var mn_datetime_services_1 = require("./mn-datetime.services");
var MnQuartersPickerComponent = (function () {
    function MnQuartersPickerComponent(_mds) {
        this._mds = _mds;
        this.result = new core_1.EventEmitter();
        this.current = new mn_date_class_1.MnDate(new Date());
        this.calendar = [];
        this._tenshow = {};
    }
    Object.defineProperty(MnQuartersPickerComponent.prototype, "_maxDate", {
        set: function (value) {
            if (value) {
                this.maxDate = new mn_date_class_1.MnDate(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnQuartersPickerComponent.prototype, "_minDate", {
        set: function (value) {
            if (value) {
                this.minDate = new mn_date_class_1.MnDate(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnQuartersPickerComponent.prototype, "_startDate", {
        set: function (value) {
            if (value) {
                var startDate = new mn_date_class_1.MnDate(value);
                this.startDate = this._mds.reStartDate(startDate, this.maxDate, this.minDate);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnQuartersPickerComponent.prototype, "_endDate", {
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
    Object.defineProperty(MnQuartersPickerComponent.prototype, "_date", {
        set: function (value) {
            if (this.startDate || this.endDate) {
                console.warn('startDate or endDate can not exist with the date');
            }
            var date = new mn_date_class_1.MnDate(value);
            this.startDate = new mn_date_class_1.MnDate(date.months.start);
            this.endDate = new mn_date_class_1.MnDate(date.months.end);
            this.result.emit(this.backStartEnd(this.startDate, this.endDate, true));
        },
        enumerable: true,
        configurable: true
    });
    MnQuartersPickerComponent.prototype.ngOnInit = function () {
        // 设置startDate, endDate 默认值
        if (!(mu.isNotEmpty(this.endDate) && mu.isNotEmpty(this.startDate))) {
            this.startDate = new mn_date_class_1.MnDate(this.current.quarters.start);
            this.endDate = new mn_date_class_1.MnDate(this.current.quarters.end);
        }
        // 设置minDate, maxDate默认值
        if (mu.isNotExist(this.minDate)) {
            var minDate = this.startDate.yoy(-3);
            this.minDate = new mn_date_class_1.MnDate(minDate.start);
        }
        // 设置minDate, maxDate默认值
        if (mu.isNotExist(this.maxDate)) {
            var maxDate = this.endDate.yoy(2);
            this.maxDate = new mn_date_class_1.MnDate(maxDate.start);
        }
        var _start_years = this.minDate.quarters.year;
        var _end_years = this.maxDate.quarters.year;
        for (var i = _start_years; i <= _end_years; i++) {
            this.calendar.unshift({
                year: i,
                quarters: this.getQuartersByYear(i)
            });
        }
    };
    MnQuartersPickerComponent.prototype.getQuartersByYear = function (year) {
        var _this = this;
        return mu.map(4, function (i, index) {
            var _sm = 12 - (i * 3) + 1;
            var _year_month = year + '-' + mu.leftpad(_sm, 2);
            var _mndate = new mn_date_class_1.MnDate(_year_month);
            _mndate.show = true;
            if (_this.minDate) {
                _mndate.show = _mndate.quarters.start > _this.minDate._ts;
            }
            if (_this.maxDate && _mndate.show) {
                _mndate.show = _mndate.quarters.end < _this.maxDate._ts;
            }
            return _mndate;
        }, []);
    };
    MnQuartersPickerComponent.prototype.selected = function (date) {
        var _this = this;
        if (!date.show) {
            return;
        }
        mu.run(this.startDate, function () {
            mu.run(_this.endDate, function () {
                _this.startDate = date;
                _this.endDate = void 0;
            }, function () {
                if (date.quarters.start < _this.startDate.quarters.end) {
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
    MnQuartersPickerComponent.prototype.hovered = function (date) {
        this._hoverDate = date;
    };
    MnQuartersPickerComponent.prototype.started = function (date) {
        var _this = this;
        return mu.run(this.startDate, function () {
            return date.show && date.quarters.start === mu.prop(_this.startDate, 'quarters.start');
        });
    };
    MnQuartersPickerComponent.prototype.ended = function (date) {
        var _this = this;
        return mu.run(this.endDate, function () {
            return date.show && date.quarters.end === mu.prop(_this.endDate, 'quarters.end');
        });
    };
    /**
     * 判断时间区间
     * @param date
     */
    MnQuartersPickerComponent.prototype.ranged = function (date) {
        var endDate = mu.ifempty(this.endDate, this._hoverDate);
        if (this.startDate && endDate) {
            return date.show && this.startDate.quarters.end < date.quarters.start && date.quarters.start < endDate.quarters.end;
        }
    };
    /**
     * 反向日期显示
     * @param date
     * @return {boolean}
     */
    MnQuartersPickerComponent.prototype.reverseRanged = function (date) {
        if (this.startDate && this._hoverDate && !this.endDate) {
            return date.show && this.startDate.quarters.end > date.quarters.start && date.quarters.end > this._hoverDate.quarters.start;
        }
    };
    MnQuartersPickerComponent.prototype.backStartEnd = function (_startDate, _endDate, first) {
        // let startDate = _startDate.months.start;
        // // _endDate = _endDate || _startDate;
        // // let endDate = _endDate.years.end;
        //
        // let endDate = _endDate ? new MnDate(_endDate.months.end) : void 0;
        var endDate = mu.run(_endDate, function (_end) {
            var end = _end.clone();
            return new mn_date_class_1.MnDate(end.quarters.end);
        });
        return {
            startDate: _startDate,
            endDate: endDate,
            first: first,
        };
    };
    return MnQuartersPickerComponent;
}());
MnQuartersPickerComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-quarterspicker',
                template: "\n        <ng-container *ngFor=\"let year of calendar\">\n            <mn-fill [gutter]=\"2\">\n                <ng-container *ngFor=\"let quarter of year.quarters\">\n                    <mn-col [span]=\"2\"\n                            [class.no-selected]=\"!quarter.show\"\n                            [class.start]=\"started(quarter)\"\n                            [class.end]=\"ended(quarter)\"\n                            [class.range]=\"ranged(quarter)\"\n                            [class.range-reverse]=\"reverseRanged(quarter)\"\n                            (mouseover)=\"hovered(quarter)\"\n                            (click)=\"selected(quarter)\">\n                        <div class=\"mnc-quarterspicker-name\">{{quarter.quarters.name}}</div>\n                        <div class=\"mnc-quarterspicker-year\">{{quarter.quarters.year}}Q{{quarter.quarters.quarter}}</div>\n                    </mn-col>\n                </ng-container>\n            </mn-fill>\n        </ng-container>\n    "
            },] },
];
/** @nocollapse */
MnQuartersPickerComponent.ctorParameters = function () { return [
    { type: mn_datetime_services_1.MnDatetimeServices, },
]; };
MnQuartersPickerComponent.propDecorators = {
    '_maxDate': [{ type: core_1.Input, args: ['mnMaxDate',] },],
    '_minDate': [{ type: core_1.Input, args: ['mnMinDate',] },],
    '_startDate': [{ type: core_1.Input, args: ['mnStartDate',] },],
    '_endDate': [{ type: core_1.Input, args: ['mnEndDate',] },],
    '_date': [{ type: core_1.Input, args: ['mnDate',] },],
    'result': [{ type: core_1.Output, args: ['mnResult',] },],
};
exports.MnQuartersPickerComponent = MnQuartersPickerComponent;
//# sourceMappingURL=mn-quarters-picker.component.js.map