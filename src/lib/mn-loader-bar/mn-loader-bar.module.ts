import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MnLoaderBarComponent} from './mn-loader-bar.component';
import {MnLoaderBarServices} from './mn-loader-bar.services';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        MnLoaderBarComponent
    ],
    exports: [
        MnLoaderBarComponent
    ],
    providers: [
        MnLoaderBarServices
    ]
})
export class MnLoaderBarModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MnLoaderBarModule
        };
    }
}
