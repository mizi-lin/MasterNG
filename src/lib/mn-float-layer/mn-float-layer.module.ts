import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MnDropdownComponent} from './mn-dropdown.component';
import {MnDropdownContentComponent} from './mn-dropdown-content.component';
import {MnLayerDirective} from './mn-layer.directive';
import {MnLayerContainerService} from './mn-layer-container.service';
import {MnCommonModule} from '../mn-common/mn-common.module';
import {MnFormModule} from '../mn-form/mn-form.module';
import {MnTooltipComponent} from './mn-tooltip.component';
import {MnModalComponent} from './mn-modal.component';
import {MnModalServices} from './mn-modal.services';
import {MnLayerComponent} from './mn-layer.component';
import {MnPanelModule} from '../mn-panel/mn-panel.module';

@NgModule({
    imports: [
        CommonModule,
        MnCommonModule,
        MnFormModule,
        MnPanelModule
    ],
    declarations: [
        MnDropdownComponent,
        MnDropdownContentComponent,
        MnTooltipComponent,
        MnLayerDirective,
        MnModalComponent,
        MnLayerComponent
    ],
    exports: [
        MnDropdownComponent,
        MnDropdownContentComponent,
        MnTooltipComponent,
        MnLayerDirective,
        MnModalComponent,
        MnLayerComponent
    ],

    entryComponents: [
        MnModalComponent,
        MnLayerComponent
    ],

    providers: [
        MnLayerContainerService,
        MnModalServices
    ]
})
export class MnFloatLayerModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MnFloatLayerModule
        };
    }
}
