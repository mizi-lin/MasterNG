import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MnDropdownComponent} from './mn-dropdown.component';
import {MnDropdownContentComponent} from './mn-dropdown-content.component';
import {MnLayerDirective} from './mn-layer.directive';
import {MnLayerContainerService} from './mn-layer-container.service';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        MnDropdownComponent,
        MnDropdownContentComponent,
        MnLayerDirective
    ],
    exports: [
        MnDropdownComponent,
        MnDropdownContentComponent,
        MnLayerDirective
    ],
    providers: [
        MnLayerContainerService
    ]
})
export class MnFloatLayerModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MnFloatLayerModule
        };
    }
}
