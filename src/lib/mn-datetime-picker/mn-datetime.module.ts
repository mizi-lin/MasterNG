import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MnCalendarComponent} from './mn-calendar.component';
import {MnLayoutModule} from '../mn-layout/mn-layout.module';
import {MnCalendarViewComponent} from './mn-calendar-view.component';
import {MnCalendarMultipleComponent} from './mn-calendar-multiple.component';
import {MnDatetimeServices} from './mn-datetime.services';
import {MuDatetimeQuickComponent} from './mn-datetime-quick.component';
import {MnFloatLayerModule} from '../mn-float-layer/mn-float-layer.module';
import {MnDatetimePickerComponent} from './mn-datetime-picker.component';
import {MnButtonModule} from '../mn-button/mn-button.module';
import {MnCommonModule} from '../mn-common/mn-common.module';
import {MnFormModule} from '../mn-form/mn-form.module';
import {MnYearsPickerComponent} from './mn-years-picker.component';
import {MnMonthsPickerComponent} from './mn-months-picker.component';
import {MnQuartersPickerComponent} from './mn-quarters-picker.component';

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
        MuDatetimeQuickComponent,
        MnDatetimePickerComponent,
        MnYearsPickerComponent,
        MnMonthsPickerComponent,
        MnQuartersPickerComponent
    ],

    exports: [
        MnCalendarComponent,
        MnCalendarViewComponent,
        MnCalendarMultipleComponent,
        MuDatetimeQuickComponent,
        MnDatetimePickerComponent,
        MnYearsPickerComponent,
        MnMonthsPickerComponent,
        MnQuartersPickerComponent
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
