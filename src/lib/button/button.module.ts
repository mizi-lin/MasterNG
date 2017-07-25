import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from './button.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ButtonComponent
    ],
    exports: [
        ButtonComponent
    ],
    providers: [
    ]
})
export class ButtonModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ButtonModule
        };
    }
}