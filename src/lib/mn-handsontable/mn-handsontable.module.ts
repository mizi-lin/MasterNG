import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MnHandsontableComponent} from './mn-handsontable.component';
import {MnCommonModule} from '../mn-common/mn-common.module';

@NgModule({
    imports: [
        CommonModule,
        MnCommonModule
    ],
    declarations: [
        MnHandsontableComponent
    ],
    exports: [
        MnHandsontableComponent
    ],
    providers: [
    ]
})
export class MnHandsontableModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MnHandsontableModule
        };
    }
}
