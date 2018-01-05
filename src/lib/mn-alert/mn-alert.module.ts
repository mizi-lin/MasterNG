import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MnAlertComponent} from './mn-alert.component';
import {MnCommonModule} from '../mn-common/mn-common.module';
import {MnLayoutModule} from '../mn-layout/mn-layout.module';

@NgModule({
    imports: [
        CommonModule,
        MnCommonModule,
        MnLayoutModule
    ],
    declarations: [
        MnAlertComponent
    ],
    exports: [
        MnAlertComponent
    ],
    providers: [
    ]
})
export class MnAlertModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MnAlertModule
        };
    }
}
