import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MnCalendarComponent} from './mn-calendar.component';
import {MnLayoutModule} from '../mn-layout/mn-layout.module';
import {MnCalendarViewComponent} from './mn-calendar-view.component';
import {MnCalendarMultipleComponent} from './mu-calendar-multiple.component';
import {MnDatetimeServices} from './mn-datetime.services';
import {MuDatetimeQuickComponent} from './mu-datetime-quick.component';
import {MnFloatLayerModule} from '../mn-float-layer/mn-float-layer.module';
import {MnDatetimePickerComponent} from './mn-datetime-picker.component';
import {MnButtonModule} from '../mn-button/mn-button.module';

@NgModule({
    imports: [
        CommonModule,
        MnLayoutModule,
        MnFloatLayerModule,
        MnButtonModule
    ],

    declarations: [
        MnCalendarComponent,
        MnCalendarViewComponent,
        MnCalendarMultipleComponent,
        MuDatetimeQuickComponent,
        MnDatetimePickerComponent
    ],

    exports: [
        MnCalendarComponent,
        MnCalendarViewComponent,
        MnCalendarMultipleComponent,
        MuDatetimeQuickComponent,
        MnDatetimePickerComponent
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
