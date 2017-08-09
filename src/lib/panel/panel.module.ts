import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CollapseComponent} from './collapse.component';
import {PanelComponent} from './panel.component';
import {PanelHeaderComponent} from './panel-header.component';
import {PanelTitleComponent} from './panel-title.component';
import {PanelBodyComponent} from './panel-body.component';
import {PanelBottomComponent} from './panel-bottom.component';
import {PanelToolbarComponent} from './panel-toolbar.component';
import {ToolExpandComponent} from './tool-expand.component';
import {ToolCompressComponent} from './tool-compress.component';
import {ToolCollapseDownComponent, ToolCollapseUpComponent} from './tool-collapse.component';
import {PanelSimpleComponent} from './panel-simple.component';
import {FlexLayoutModule} from 'MasterNG';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule.forRoot()
    ],
    declarations: [
        PanelComponent,
        PanelHeaderComponent,
        PanelTitleComponent,
        PanelToolbarComponent,
        PanelBodyComponent,
        PanelBottomComponent,
        ToolExpandComponent,
        ToolCompressComponent,
        ToolCollapseDownComponent,
        ToolCollapseUpComponent,
        CollapseComponent,
        PanelSimpleComponent
    ],
    exports: [
        PanelComponent,
        PanelHeaderComponent,
        PanelTitleComponent,
        PanelToolbarComponent,
        PanelBodyComponent,
        PanelBottomComponent,
        ToolExpandComponent,
        ToolCompressComponent,
        ToolCollapseDownComponent,
        ToolCollapseUpComponent,
        CollapseComponent,
        PanelSimpleComponent
    ],
    providers: [
    ]
})
export class PanelModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: PanelModule
        };
    }
}
