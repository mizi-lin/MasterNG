import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MnDropdownComponent} from './mn-dropdown.component';
import {MnDropdownContentComponent} from './mn-dropdown-content.component';
import {MnLayerDirective} from './mn-layer.directive';
import {MnLayerContainerService} from './mn-layer-container.service';
import {MnCommonModule} from '../mn-common/mn-common.module';
import {MnFormModule} from '../mn-form/mn-form.module';
import {MnTooltipComponent} from './mn-tooltip.component';


@NgModule({
    imports: [
        CommonModule,
        MnCommonModule,
        MnFormModule
    ],
    declarations: [
        MnDropdownComponent,
        MnDropdownContentComponent,
        MnTooltipComponent,
        MnLayerDirective
    ],
    exports: [
        MnDropdownComponent,
        MnDropdownContentComponent,
        MnTooltipComponent,
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
