import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelComponent} from './panel.component';
import {PanelHeaderComponent} from './panel-header.component';
import {PanelTitleComponent} from './panel-title.component';
import {PanelBodyComponent} from './panel-body.component';
import {PanelBottomComponent} from './panel-bottom.component';
import {PanelToolbarComponent} from './panel-toolbar.component';
import {ToolExpandComponent} from './tool-expand.component';
import {ToolCompressComponent} from './tool-compress.component';
import {ToolCollapseDownComponent, ToolCollapseUpComponent} from './tool-collapse.component';
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
        ToolCollapseUpComponent
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
        ToolCollapseUpComponent
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