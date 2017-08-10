import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoaderBarComponent} from './loader-bar.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        LoaderBarComponent
    ],
    exports: [
        LoaderBarComponent
    ],
    providers: [
    ]
})
export class LoaderBarModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: LoaderBarModule
        };
    }
}
