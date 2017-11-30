"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_datetime_services_1 = require("./mn-datetime.services");
var MuDatetimeRangesComponent = (function () {
    function MuDatetimeRangesComponent(_mds) {
        this._mds = _mds;
        this._type = 'range';
        this._ranges = [];
        this.result = new core_1.EventEmitter();
        this.selected = new core_1.EventEmitter();
        this._view = 'calendar';
    }
    Object.defineProperty(MuDatetimeRangesComponent.prototype, "type", {
        set: function (_type) {
            this._type = _type;
        },
        enumerable: true,
        configurable: true
    });
    MuDatetimeRangesComponent.prototype.ngOnInit = function () {
        var _this = this;
        mu.run(function () {
            if (!_this._ranges.length) {
                _this._type = 'view';
            }
            if (!_this._views.length) {
                _this._type = 'range';
            }
        });
        mu.run(this._views, function () { return _this._view = _this._views[0].view; });
    };
    MuDatetimeRangesComponent.prototype.getDate = function (rule) {
        var range = this._mds.getRangeDate(rule.value);
        this.result.emit(range);
        this.selected.emit(range);
    };
    MuDatetimeRangesComponent.prototype.selectView = function (_view) {
        var rst = {
            view: _view
        };
        this._view = _view;
        this.result.emit(rst);
        this.selected.emit(rst);
    };
    return MuDatetimeRangesComponent;
}());
MuDatetimeRangesComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-datetimeranges',
                template: "\n        <mn-fill [hph]=\"false\" class=\"mnc-header\">\n            <mn-col *ngIf=\"_ranges.length\"\n                    [class.active]=\"_type === 'range'\"\n                    [span]=\"1\"\n                    (click)=\"_type ='range'\">Range\n            </mn-col>\n            <mn-col *ngIf=\"_views.length\"\n                    [class.active]=\"_type === 'view'\"\n                    [span]=\"1\"\n                    (click)=\"_type ='view'\">View\n            </mn-col>\n        </mn-fill>\n\n        <div class=\"mt-8\">\n            <section [class.active]=\"_type === 'range'\">\n                <ol>\n                    <li *ngFor=\"let rl of _ranges\" (click)=\"getDate(rl)\">\n                        {{rl.name}}\n                    </li>\n                </ol>\n            </section>\n\n            <section [class.active]=\"_type === 'view'\">\n                <ol>\n                    <li *ngFor=\"let _v of _views\" \n                        [class.selected]=\"_view === _v.view\"\n                        (click)=\"selectView(_v.view)\">\n                        By {{_v.view}}\n                    </li>\n                </ol>\n            </section>\n        </div>\n\n        <!--<button mn-btn class=\"default mn-btn-full mt-8\"-->\n                <!--[class.primary]=\"_view === 'calendar'\"-->\n                <!--(click)=\"selectView('calendar')\">Custom Date</button>-->\n    "
            },] },
];
/** @nocollapse */
MuDatetimeRangesComponent.ctorParameters = function () { return [
    { type: mn_datetime_services_1.MnDatetimeServices, },
]; };
MuDatetimeRangesComponent.propDecorators = {
    '_ranges': [{ type: core_1.Input, args: ['mnRanges',] },],
    '_views': [{ type: core_1.Input, args: ['mnViews',] },],
    'type': [{ type: core_1.Input, args: ['mnType',] },],
    'result': [{ type: core_1.Output, args: ['mnResult',] },],
    'selected': [{ type: core_1.Output, args: ['mnSelected',] },],
};
exports.MuDatetimeRangesComponent = MuDatetimeRangesComponent;
//# sourceMappingURL=mn-datetime-ranges.component.js.map