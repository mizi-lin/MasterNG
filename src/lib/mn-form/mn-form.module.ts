import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MnCommonModule} from '../mn-common/mn-common.module';
import {FormsModule} from '@angular/forms';
import {MnLayoutModule} from '../mn-layout/mn-layout.module';
import {MnInputComponent} from './mn-input.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MnCommonModule,
        MnLayoutModule
    ],
    declarations: [
        MnInputComponent
    ],
    exports: [
        MnInputComponent
    ],
    providers: [
    ]
})
export class MnFormModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MnFormModule
        };
    }
}
