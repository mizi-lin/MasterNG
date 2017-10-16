import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MnCalendarComponent} from './mn-calendar.component';
import {MnLayoutModule} from '../mn-layout/mn-layout.module';
import {MnCalendarViewComponent} from './mn-calendar-view.component';

@NgModule({
    imports: [
        CommonModule,
        MnLayoutModule
    ],

    declarations: [
        MnCalendarComponent,
        MnCalendarViewComponent
    ],

    exports: [
        MnCalendarComponent,
        MnCalendarViewComponent
    ],


    providers: [
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
