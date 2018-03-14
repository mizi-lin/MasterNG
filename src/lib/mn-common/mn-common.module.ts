import {ErrorHandler, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrustUrlPipe} from './pipe/mn-trust-url.pipe';
import {MuPipe} from './pipe/mn-mu.pipe';
import {MnFileSaverServices} from './services/mn-fileSaver.services';
import {MnElementRefDirective} from './directive/mn-element-ref.directive';
import {MnCommonServices} from './services/mn-common.services';
import {MnLoggerService} from './services/mn-logger.service';
import {MnErrorHandler} from './services/mn-errorHandler.service';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TrustUrlPipe,
        MuPipe,

        MnElementRefDirective
    ],
    exports: [
        TrustUrlPipe,
        MuPipe,

        MnElementRefDirective
    ],
    providers: [
        MnCommonServices,
        MnFileSaverServices,
        MnLoggerService,
        {provide: ErrorHandler, useClass: MnErrorHandler}
    ]
})
export class MnCommonModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MnCommonModule
        };
    }
}
