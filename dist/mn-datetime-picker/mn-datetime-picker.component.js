"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_date_class_1 = require("./mn-date.class");
var MnDatetimePickerComponent = (function () {
    function MnDatetimePickerComponent() {
        this.result = new core_1.EventEmitter();
        this.selected = new core_1.EventEmitter();
        this._selected = {};
        this._viewed = {
            startDate: {},
            endDate: {}
        };
        this._hasChange = false;
        // 默认视图
        this._view = 'calendar';
        this._views = [
            {
                view: 'calendar',
                formatter: 'yyyy-MM-dd'
            }, {
                view: 'month',
                formatter: 'yyyy-MM-dd'
            }, {
                view: 'quarter',
                formatter: 'yyyy-MM-dd'
            }, {
                view: 'year',
                formatter: 'yyyy-MM-dd'
            }
        ];
    }
    Object.defineProperty(MnDatetimePickerComponent.prototype, "startDate", {
        /**
         * string: 标准的日期格式 '2017-12-08 11:05:28'
         * number: 时间戳
         * any: mndate 对象
         */
        set: function (date) {
            this._startDate = new mn_date_class_1.MnDate(date);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDatetimePickerComponent.prototype, "endDate", {
        set: function (date) {
            this._endDate = new mn_date_class_1.MnDate(date);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDatetimePickerComponent.prototype, "minDate", {
        set: function (date) {
            this._minDate = new mn_date_class_1.MnDate(date);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDatetimePickerComponent.prototype, "maxDate", {
        set: function (date) {
            this._maxDate = new mn_date_class_1.MnDate(date);
        },
        enumerable: true,
        configurable: true
    });
    // 设置视图
    MnDatetimePickerComponent.prototype.views = function (items) {
        var _this = this;
        if (!items) {
            return;
        }
        this._views = mu.map(items, function (item, index) {
            if (mu.type(item, 'string')) {
                var _a = item.split('-:>'), view = _a[0], formatter = _a[1];
                formatter = formatter || 'yyyy-MM-dd';
                item = {
                    view: view,
                    formatter: formatter
                };
            }
            if (!index) {
                _this._view = item.view;
            }
            return item;
        });
    };
    MnDatetimePickerComponent.prototype._rangeResult = function (rst) {
        var _this = this;
        this._startDate = rst.startDate || this._viewed.startDate || this._selected.startDate;
        this._endDate = rst.endDate || this._viewed.endDate || this._selected.endDate;
        mu.run(rst.view, function (view) { return _this._view = view; });
    };
    MnDatetimePickerComponent.prototype.ngOnInit = function () {
        this._viewsMap = mu.map(this._views, function (o) {
            return {
                __key__: o.view,
                __val__: o.formatter
            };
        }, {});
    };
    MnDatetimePickerComponent.prototype._mcmResult = function ($event) {
        var _this = this;
        mu.run($event.startDate, function () {
            _this._viewed.startDate = $event.startDate.clone();
        });
        mu.run($event.endDate, function () {
            _this._viewed.endDate = $event.endDate.clone();
        });
        // this._startDate = $event.startDate;
        // this._endDate = $event.endDate;
        if (!this._hasChange) {
            // Hack fixed angular error
            // ERROR Error:
            //      ExpressionChangedAfterItHasBeenCheckedError:
            //      Expression has changed after it was checked
            // public ngDoCheck(): void { this.cdr.detectChanges(); }
            setTimeout(function () {
                mu.run(_this._startDate, function () {
                    _this._selected = {
                        startDate: _this._startDate,
                        endDate: _this._endDate,
                        start: _this._format(_this._startDate),
                        end: _this._format(_this._endDate)
                    };
                });
            }, 0);
            this._hasChange = true;
        }
        this.result.emit($event);
    };
    // 确认事件
    MnDatetimePickerComponent.prototype._confirmDate = function () {
        this._startDate = this._viewed.startDate;
        this._endDate = this._viewed.endDate;
        this._selected = {
            startDate: this._startDate,
            endDate: this._endDate,
            start: this._format(this._startDate),
            end: this._format(this._endDate)
        };
        this.selected.emit(this._selected);
        this._dropDownResult.hide();
    };
    MnDatetimePickerComponent.prototype._format = function (date) {
        if (!date) {
            return '';
        }
        return mu.format(date._date, this._viewsMap[this._view]);
    };
    return MnDatetimePickerComponent;
}());
MnDatetimePickerComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-datetimepicker',
                template: "\n        <mn-dropdown (mnResult)=\"_dropDownResult = $event\">\n            <mn-fill>\n                <mn-input\n                        class=\"mnc-col\"\n                        [style.minWidth.px]=\"95\"\n                        [mnReadonly]=\"true\"\n                        [mnValue]=\"_selected?.start\">\n                    <span class=\"mnc-next\">-</span>\n                </mn-input>\n                <mn-input\n                        class=\"mnc-col\"\n                        [style.minWidth.px]=\"105\"\n                        [mnReadonly]=\"true\"\n                        [mnValue]=\"_selected?.end\">\n                    <i class=\"fa fa-calendar mnc-next\"></i>\n                </mn-input>\n            </mn-fill>\n\n            <mn-dropdown-content class=\"p-8 mnc-block\">\n                <mn-fill [style.width.px]=\"760\">\n                    <mn-col [style.width.px]=\"120\">\n                        <mn-datetimeranges\n                                [mnViews]=\"_views\"\n                                (mnResult)=\"_rangeResult($event)\"\n                        ></mn-datetimeranges>\n                    </mn-col>\n                    <mn-col [span]=\"1\">\n                        <ng-container *ngIf=\"_view === 'calendar'\">\n                            <mn-calendar-multiple\n                                    [mnStartDate]=\"_startDate\"\n                                    [mnEndDate]=\"_endDate\"\n                                    [mnMinDate]=\"_minDate\"\n                                    [mnMaxDate]=\"_maxDate\"\n                                    (mnResult)=\"_mcmResult($event)\"\n                            ></mn-calendar-multiple>\n                        </ng-container>\n\n                        <ng-container *ngIf=\"_view === 'year'\">\n                            <mn-yearspicker\n                                    [mnStartDate]=\"_startDate\"\n                                    [mnEndDate]=\"_endDate\"\n                                    [mnMinDate]=\"_minDate\"\n                                    [mnMaxDate]=\"_maxDate\"\n                                    (mnResult)=\"_mcmResult($event)\"\n                            ></mn-yearspicker>\n                        </ng-container>\n\n                        <ng-container *ngIf=\"_view === 'month'\">\n                            <mn-monthspicker\n                                    [mnStartDate]=\"_startDate\"\n                                    [mnEndDate]=\"_endDate\"\n                                    [mnMinDate]=\"_minDate\"\n                                    [mnMaxDate]=\"_maxDate\"\n                                    (mnResult)=\"_mcmResult($event)\"\n                            ></mn-monthspicker>\n                        </ng-container>\n\n                        <ng-container *ngIf=\"_view === 'quarter'\">\n                            <mn-quarterspicker\n                                    [mnStartDate]=\"_startDate\"\n                                    [mnEndDate]=\"_endDate\"\n                                    [mnMinDate]=\"_minDate\"\n                                    [mnMaxDate]=\"_maxDate\"\n                                    (mnResult)=\"_mcmResult($event)\"\n                            ></mn-quarterspicker>\n                        </ng-container>\n\n                        <mn-fill class=\"mt-8\">\n                            <mn-col [span]=\"1\" class=\"pt-2 mnc-mark\">\n                                {{_viewed.startDate?._date | mu: 'format' : _viewsMap[_view] }}\n                                <ng-container *ngIf=\"_viewed.startDate\">-</ng-container>\n                                {{_viewed.endDate?._date | mu: 'format' : _viewsMap[_view] }}\n                            </mn-col>\n                            <mn-col [style.width.px]=\"120\" class=\"mnc-tr\">\n                                <button mn-btn class=\"primary\" (click)=\"_confirmDate()\">\u786E\u8BA4</button>\n                            </mn-col>\n                        </mn-fill>\n                    </mn-col>\n                </mn-fill>\n            </mn-dropdown-content>\n        </mn-dropdown>\n    "
            },] },
];
/** @nocollapse */
MnDatetimePickerComponent.ctorParameters = function () { return []; };
MnDatetimePickerComponent.propDecorators = {
    'mode': [{ type: core_1.Input, args: ['mnMode',] },],
    'startDate': [{ type: core_1.Input, args: ['mnStartDate',] },],
    'endDate': [{ type: core_1.Input, args: ['mnEndDate',] },],
    'minDate': [{ type: core_1.Input, args: ['mnMinDate',] },],
    'maxDate': [{ type: core_1.Input, args: ['mnMaxDate',] },],
    'views': [{ type: core_1.Input, args: ['mnViews',] },],
    'quicks': [{ type: core_1.Input, args: ['mnQuicks',] },],
    'result': [{ type: core_1.Input, args: ['mnResult',] },],
    'selected': [{ type: core_1.Input, args: ['mnSelected',] },],
};
exports.MnDatetimePickerComponent = MnDatetimePickerComponent;
//# sourceMappingURL=mn-datetime-picker.component.js.map