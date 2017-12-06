import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MnCalendarComponent} from './mn-calendar.component';
import {MnLayoutModule} from '../mn-layout/mn-layout.module';
import {MnCalendarViewComponent} from './mn-calendar-view.component';
import {MnCalendarMultipleComponent} from './mn-calendar-multiple.component';
import {MnDatetimeServices} from './mn-datetime.services';
import {MuDatetimeRangesComponent} from './mn-datetime-ranges.component';
import {MnFloatLayerModule} from '../mn-float-layer/mn-float-layer.module';
import {MnDatetimePickerComponent} from './mn-datetime-picker.component';
import {MnButtonModule} from '../mn-button/mn-button.module';
import {MnCommonModule} from '../mn-common/mn-common.module';
import {MnFormModule} from '../mn-form/mn-form.module';
import {MnYearsPickerComponent} from './mn-years-picker.component';
import {MnMonthsPickerComponent} from './mn-months-picker.component';
import {MnQuartersPickerComponent} from './mn-quarters-picker.component';
import {MnDateSingleComponent} from './mn-date-single.component';
import {MnDateDrawComponent} from './mn-date-draw.component';
import {MnDateMultipleComponent} from './mn-date-multiple.component';
import {MnDateCalendarComponent} from './mn-date-calendar.component';

@NgModule({
    imports: [
        CommonModule,
        MnCommonModule,
        MnLayoutModule,
        MnFloatLayerModule,
        MnButtonModule,
        MnFormModule
    ],

    declarations: [
        MnCalendarComponent,
        MnCalendarViewComponent,
        MnCalendarMultipleComponent,
        MuDatetimeRangesComponent,
        MnDatetimePickerComponent,
        MnYearsPickerComponent,
        MnMonthsPickerComponent,
        MnQuartersPickerComponent,
        // --
        MnDateSingleComponent,
        MnDateDrawComponent,
        MnDateCalendarComponent,
        MnDateMultipleComponent
    ],

    exports: [
        MnCalendarComponent,
        MnCalendarViewComponent,
        MnCalendarMultipleComponent,
        MuDatetimeRangesComponent,
        MnDatetimePickerComponent,
        MnYearsPickerComponent,
        MnMonthsPickerComponent,
        MnQuartersPickerComponent,
        MnDateSingleComponent,
        MnDateDrawComponent,
        MnDateCalendarComponent,
        MnDateMultipleComponent
    ],

    providers: [
        MnDatetimeServices
    ]
})
export class MnDatetimeModule {
    static forRoot(modules: any[] = []): ModuleWithProviders {
        return {
            ngModule: MnDatetimeModule,
            providers: []
        };
    }
}
