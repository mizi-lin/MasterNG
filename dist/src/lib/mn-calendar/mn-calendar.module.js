"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var CalendarModule = (function () {
    function CalendarModule() {
    }
    CalendarModule.forRoot = function () {
        return {
            ngModule: CalendarModule
        };
    };
    return CalendarModule;
}());
CalendarModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    common_1.CommonModule
                ],
                declarations: [],
                exports: [],
                providers: []
            },] },
];
/** @nocollapse */
CalendarModule.ctorParameters = function () { return []; };
exports.CalendarModule = CalendarModule;
//# sourceMappingURL=mn-calendar.module.js.map