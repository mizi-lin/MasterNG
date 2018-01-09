import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MnCommonModule} from '../mn-common/mn-common.module';
import {MnFormModule} from '../mn-form/mn-form.module';
import {MnPanelModule} from '../mn-panel/mn-panel.module';
import {MnLayoutModule} from '../mn-layout/mn-layout.module';
import {MnDynamicModule} from '../mn-dynamic/mn-dynamic.module';
import {MnTabComponent} from './mn-tab.component';

@NgModule({
    imports: [
        CommonModule,
        MnCommonModule,
        MnFormModule,
        MnPanelModule,
        MnLayoutModule,
        MnDynamicModule
    ],
    declarations: [
        MnTabComponent
    ],
    exports: [
        MnTabComponent
    ],

    entryComponents: [
    ],

    providers: [
    ]
})
export class MnTabModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MnTabModule
        };
    }
}
