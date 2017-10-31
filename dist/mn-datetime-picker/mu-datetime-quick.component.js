"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_datetime_services_1 = require("./mn-datetime.services");
var MuDatetimeQuickComponent = (function () {
    function MuDatetimeQuickComponent(_mds) {
        this._mds = _mds;
        this.status = 'relatively';
        this.result = new core_1.EventEmitter();
    }
    Object.defineProperty(MuDatetimeQuickComponent.prototype, "mnQuick", {
        set: function (o) {
            this._relatively = o.relatively;
            this._absolute = o._absolute;
        },
        enumerable: true,
        configurable: true
    });
    MuDatetimeQuickComponent.prototype.ngOnInit = function () {
    };
    MuDatetimeQuickComponent.prototype.getDate = function (rule) {
        var range = this._mds.getRangeDate(rule.value);
        this.result.emit(range);
    };
    return MuDatetimeQuickComponent;
}());
MuDatetimeQuickComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-datetime-quick',
                template: "\n        <mn-fill [hph]=\"false\">\n            <mn-col\n                    [class.active]=\"status === 'relatively'\"\n                    [span]=\"1\"\n                    (click)=\"status ='relatively'\">\u76F8\u5BF9\n            </mn-col>\n            <mn-col [class.active]=\"status === 'absolute'\"\n                    [span]=\"1\"\n                    (click)=\"status ='absolute'\">\u7EDD\u5BF9\n            </mn-col>\n        </mn-fill>\n\n        <div class=\"mt-16\">\n            <section [class.active]=\"status === 'relatively'\">\n                <ol>\n                    <li *ngFor=\"let rl of _relatively\" (click)=\"getDate(rl)\">\n                        {{rl.name}}\n                    </li>\n                </ol>\n            </section>\n\n            <section [class.active]=\"status === 'absolute'\">\n                <ol>\n                    <li>\u6309\u5E74</li>\n                    <li>\u6309\u5B63\u5EA6</li>\n                    <li>\u6309\u6708</li>\n                    <li>\u6309\u5468</li>\n                    <li *ngFor=\"let ab of _absolute\">\n                        {{ab.name}}\n                    </li>\n                </ol>\n            </section>\n        </div>\n\n        <button mn-btn class=\"primary full\">\u81EA\u5B9A\u4E49\u65E5\u671F</button>\n    "
            },] },
];
/** @nocollapse */
MuDatetimeQuickComponent.ctorParameters = function () { return [
    { type: mn_datetime_services_1.MnDatetimeServices, },
]; };
MuDatetimeQuickComponent.propDecorators = {
    'mnQuick': [{ type: core_1.Input },],
    'result': [{ type: core_1.Output },],
};
exports.MuDatetimeQuickComponent = MuDatetimeQuickComponent;
//# sourceMappingURL=mu-datetime-quick.component.js.map