import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MnDropdownComponent, MnDropdownContentComponent} from './mn-dropdown.component';


@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        MnDropdownComponent,
        MnDropdownContentComponent
    ],
    exports: [
        MnDropdownComponent,
        MnDropdownContentComponent
    ],
    providers: [
    ]
})
export class MnFloatLayerModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MnFloatLayerModule
        };
    }
}
