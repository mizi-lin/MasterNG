import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrustUrlPipe} from './pipe/mn-trust-url.pipe';
import {MuPipe} from './pipe/mn-mu.pipe';
import {MnFileSaverServices} from './services/mn-file-saver.services';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TrustUrlPipe,
        MuPipe
    ],
    exports: [
        TrustUrlPipe,
        MuPipe
    ],
    providers: [
        MnFileSaverServices
    ]
})
export class MnCommonModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MnCommonModule
        };
    }
}
