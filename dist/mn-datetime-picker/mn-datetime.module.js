"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var mn_calendar_component_1 = require("./mn-calendar.component");
var mn_layout_module_1 = require("../mn-layout/mn-layout.module");
var mn_calendar_view_component_1 = require("./mn-calendar-view.component");
var mu_calendar_multiple_component_1 = require("./mu-calendar-multiple.component");
var mn_datetime_services_1 = require("./mn-datetime.services");
var mu_datetime_quick_component_1 = require("./mu-datetime-quick.component");
var MnDatetimeModule = (function () {
    function MnDatetimeModule() {
    }
    MnDatetimeModule.forRoot = function (modules) {
        if (modules === void 0) { modules = []; }
        return {
            ngModule: MnDatetimeModule,
            providers: []
        };
    };
    return MnDatetimeModule;
}());
MnDatetimeModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    common_1.CommonModule,
                    mn_layout_module_1.MnLayoutModule
                ],
                declarations: [
                    mn_calendar_component_1.MnCalendarComponent,
                    mn_calendar_view_component_1.MnCalendarViewComponent,
                    mu_calendar_multiple_component_1.MnCalendarMultipleComponent,
                    mu_datetime_quick_component_1.MuDatetimeQuickComponent
                ],
                exports: [
                    mn_calendar_component_1.MnCalendarComponent,
                    mn_calendar_view_component_1.MnCalendarViewComponent,
                    mu_calendar_multiple_component_1.MnCalendarMultipleComponent,
                    mu_datetime_quick_component_1.MuDatetimeQuickComponent
                ],
                providers: [
                    mn_datetime_services_1.MnDatetimeServices
                ]
            },] },
];
/** @nocollapse */
MnDatetimeModule.ctorParameters = function () { return []; };
exports.MnDatetimeModule = MnDatetimeModule;
//# sourceMappingURL=mn-datetime.module.js.map