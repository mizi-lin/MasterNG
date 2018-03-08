import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MnButtonComponent} from './mn-button.component';
import {ButtonGroupComponent} from './mn-button-group.component';
import {ButtonRadioComponent} from './mn-button-radio.component';
import {ButtonCheckComponent} from './mn-button-check.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        MnButtonComponent,
        ButtonGroupComponent,
        ButtonRadioComponent,
        ButtonCheckComponent
    ],
    exports: [
        MnButtonComponent,
        ButtonGroupComponent,
        ButtonRadioComponent,
        ButtonCheckComponent
    ],
    providers: [
    ]
})
export class MnButtonModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MnButtonModule
        };
    }
}
