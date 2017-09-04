import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MnLoaderBarComponent} from './mn-loader-bar.component';

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
    ]
})
export class MnLoaderBarModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MnLoaderBarModule
        };
    }
}
