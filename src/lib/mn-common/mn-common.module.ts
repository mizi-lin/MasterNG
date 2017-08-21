import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrustUrlPipe} from './mn-trust-url.pipe';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TrustUrlPipe
    ],
    exports: [
        TrustUrlPipe
    ],
    providers: [
    ]
})
export class MnCommonModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MnCommonModule
        };
    }
}
