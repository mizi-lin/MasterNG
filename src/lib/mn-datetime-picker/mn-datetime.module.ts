import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MnCalendarComponent} from './mn-calendar.component';
import {MnLayoutModule} from '../mn-layout/mn-layout.module';
import {MnCalendarViewComponent} from './mn-calendar-view.component';
import {MnCalendarMultipleComponent} from './mu-calendar-multiple.component';
import {MnDatetimeServices} from './mn-datetime.services';
import {MuDatetimeQuickComponent} from './mu-datetime-quick.component';

@NgModule({
    imports: [
        CommonModule,
        MnLayoutModule
    ],

    declarations: [
        MnCalendarComponent,
        MnCalendarViewComponent,
        MnCalendarMultipleComponent,
        MuDatetimeQuickComponent
    ],

    exports: [
        MnCalendarComponent,
        MnCalendarViewComponent,
        MnCalendarMultipleComponent,
        MuDatetimeQuickComponent
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
