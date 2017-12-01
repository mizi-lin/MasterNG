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
        var _this = this;
        this._mds = _mds;
        this._view = 'days';
        this._rst = {};
        _mds.date$.subscribe(function (rst) {
            if (rst === void 0) { rst = {}; }
            _this._rst = rst;
            // this._hoverDate = rst._hoverDate;
            // this._startDate = rst._startDate;
            // this._endDate = rst._endDate;
            // this._maxDate = rst._maxDate;
            // this._minDate = rst._minDate;
        });
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
    Object.defineProperty(MnDateSingleComponent.prototype, "classStart_", {
        get: function () {
            var _this = this;
            return mu.run(this._rst._startDate, function (_startDate) {
                _this._startDate = _this.mndate(_startDate);
                _this._endDate = void 0;
                return _this.compared(_this._date, _this._startDate) === 0;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateSingleComponent.prototype, "classEnd_", {
        get: function () {
            var _this = this;
            return mu.run(this._rst._endDate, function (_endDate) {
                _this._endDate = _this.mndate(_endDate);
                return _this.compared(_this._date, _this._endDate) === 0;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateSingleComponent.prototype, "classRange_", {
        get: function () {
            var _this = this;
            return mu.run(this._rst._hoverDate, function (_hoverDate) {
                _this._hoverDate = _this.mndate(_hoverDate);
                return _this.compared(_this._date, _this._hoverDate) === 1;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateSingleComponent.prototype, "classReverseRange_", {
        get: function () {
            var _this = this;
            return mu.run(this._rst._hoverDate, function (_hoverDate) {
                _this._hoverDate = _this.mndate(_hoverDate);
                return _this.compared(_this._date, _this._hoverDate) === -1;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateSingleComponent.prototype, "classMax_", {
        get: function () {
            var _this = this;
            return mu.run(this._rst._maxDate, function (_maxDate) {
                _this._maxDate = _this.mndate(_maxDate);
                return _this.compared(_this._date, _this._maxDate) === 1;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDateSingleComponent.prototype, "classMin_", {
        get: function () {
            var _this = this;
            return mu.run(this._rst._hoverDate, function (_minDate) {
                _this._minDate = _this.mndate(_minDate);
                return _this.compared(_this._date, _this._minDate) === -1;
            });
        },
        enumerable: true,
        configurable: true
    });
    MnDateSingleComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this._mds.setDate({
                _startDate: '2017-09-08'
            });
        }, 10000);
    };
    /**
     * 根据当前视图比较两个时间
     * @param src
     * @param target
     *
     * @return 1 大于; 0: 等于; -1: 小于; 2 范围内; -2 有交集
     */
    /**
         * 根据当前视图比较两个时间
         * @param src
         * @param target
         *
         * @return 1 大于; 0: 等于; -1: 小于; 2 范围内; -2 有交集
         */
    MnDateSingleComponent.prototype.compared = /**
         * 根据当前视图比较两个时间
         * @param src
         * @param target
         *
         * @return 1 大于; 0: 等于; -1: 小于; 2 范围内; -2 有交集
         */
    function (src, target) {
        var _src = src[this._view];
        var _target = target[this._view];
        if (_src.start > _target.end) {
            return -1;
        }
        else if (_src.end < _target.start) {
            return 1;
        }
        else if (_src.start === _target.start && _src.end === _target.end) {
            return 0;
        }
        else if (_src.start < _target.start && _target.end < _src.end) {
            return 2;
        }
        else {
            return -2;
        }
    };
    MnDateSingleComponent.prototype.mndate = function (date) {
        return new mn_date_class_1.MnDate(date);
    };
    MnDateSingleComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'mn-datesingle',
                    template: "\n        <div class=\"content\">\n            {{_date[_view].value}}\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    MnDateSingleComponent.ctorParameters = function () { return [
        { type: mn_datetime_services_1.MnDatetimeServices, },
    ]; };
    MnDateSingleComponent.propDecorators = {
        "date_": [{ type: core_1.Input, args: ['mnDate',] },],
        "_view": [{ type: core_1.Input, args: ['mnView',] },],
        "classStart_": [{ type: core_1.HostBinding, args: ['class.start',] },],
        "classEnd_": [{ type: core_1.HostBinding, args: ['class.end',] },],
        "classRange_": [{ type: core_1.HostBinding, args: ['class.range',] },],
        "classReverseRange_": [{ type: core_1.HostBinding, args: ['class.range-reverse',] },],
        "classMax_": [{ type: core_1.HostBinding, args: ['class.max',] },],
        "classMin_": [{ type: core_1.HostBinding, args: ['class.min',] },],
    };
    return MnDateSingleComponent;
}());
exports.MnDateSingleComponent = MnDateSingleComponent;
//# sourceMappingURL=mn-date-single.component.js.map