"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var mn_calendar_component_1 = require("./mn-calendar.component");
var mn_layout_module_1 = require("../mn-layout/mn-layout.module");
var mn_calendar_view_component_1 = require("./mn-calendar-view.component");
var mn_calendar_multiple_component_1 = require("./mn-calendar-multiple.component");
var mn_datetime_services_1 = require("./mn-datetime.services");
var mn_datetime_ranges_component_1 = require("./mn-datetime-ranges.component");
var mn_float_layer_module_1 = require("../mn-float-layer/mn-float-layer.module");
var mn_datetime_picker_component_1 = require("./mn-datetime-picker.component");
var mn_button_module_1 = require("../mn-button/mn-button.module");
var mn_common_module_1 = require("../mn-common/mn-common.module");
var mn_form_module_1 = require("../mn-form/mn-form.module");
var mn_years_picker_component_1 = require("./mn-years-picker.component");
var mn_months_picker_component_1 = require("./mn-months-picker.component");
var mn_quarters_picker_component_1 = require("./mn-quarters-picker.component");
var mn_date_single_component_1 = require("./mn-date-single.component");
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
                    mn_common_module_1.MnCommonModule,
                    mn_layout_module_1.MnLayoutModule,
                    mn_float_layer_module_1.MnFloatLayerModule,
                    mn_button_module_1.MnButtonModule,
                    mn_form_module_1.MnFormModule
                ],
                declarations: [
                    mn_calendar_component_1.MnCalendarComponent,
                    mn_calendar_view_component_1.MnCalendarViewComponent,
                    mn_calendar_multiple_component_1.MnCalendarMultipleComponent,
                    mn_datetime_ranges_component_1.MuDatetimeRangesComponent,
                    mn_datetime_picker_component_1.MnDatetimePickerComponent,
                    mn_years_picker_component_1.MnYearsPickerComponent,
                    mn_months_picker_component_1.MnMonthsPickerComponent,
                    mn_quarters_picker_component_1.MnQuartersPickerComponent,
                    mn_date_single_component_1.MnDateSingleComponent
                ],
                exports: [
                    mn_calendar_component_1.MnCalendarComponent,
                    mn_calendar_view_component_1.MnCalendarViewComponent,
                    mn_calendar_multiple_component_1.MnCalendarMultipleComponent,
                    mn_datetime_ranges_component_1.MuDatetimeRangesComponent,
                    mn_datetime_picker_component_1.MnDatetimePickerComponent,
                    mn_years_picker_component_1.MnYearsPickerComponent,
                    mn_months_picker_component_1.MnMonthsPickerComponent,
                    mn_quarters_picker_component_1.MnQuartersPickerComponent,
                    mn_date_single_component_1.MnDateSingleComponent
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