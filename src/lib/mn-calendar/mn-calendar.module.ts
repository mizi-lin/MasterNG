import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
    ]
})
export class CalendarModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CalendarModule
        };
    }
}