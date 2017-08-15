import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from './button.component';
import {ButtonGroupComponent} from './button-group.component';
import {ButtonRadioComponent} from './button-radio.component';
import {ButtonCheckComponent} from './button-check.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ButtonComponent,
        ButtonGroupComponent,
        ButtonRadioComponent,
        ButtonCheckComponent
    ],
    exports: [
        ButtonComponent,
        ButtonGroupComponent,
        ButtonRadioComponent,
        ButtonCheckComponent
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