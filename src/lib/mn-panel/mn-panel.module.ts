import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MnCollapseComponent} from './mn-collapse.component';
import {MnPanelComponent} from './mn-panel.component';
import {MnPanelHeaderComponent} from './mn-panel-header.component';
import {MnPanelTitleComponent} from './mn-panel-title.component';
import {MnPanelBodyComponent} from './mn-panel-body.component';
import {MnPanelBottomComponent} from './mn-panel-bottom.component';
import {PanelToolbarComponent} from './mn-panel-toolbar.component';
import {ToolExpandComponent} from './tool-expand.component';
import {ToolCompressComponent} from './tool-compress.component';
import {ToolCollapseDownComponent, ToolCollapseUpComponent} from './tool-collapse.component';
import {MnPanelSimpleComponent} from './mn-panel-simple.component';
import {ToolRefreshComponent} from './tool-refresh.component';
import {MnLayoutModule} from '../mn-layout/mn-layout.module';

@NgModule({
    imports: [
        CommonModule,
        MnLayoutModule.forRoot()
    ],
    declarations: [
        MnPanelComponent,
        MnPanelHeaderComponent,
        MnPanelTitleComponent,
        PanelToolbarComponent,
        MnPanelBodyComponent,
        MnPanelBottomComponent,
        ToolExpandComponent,
        ToolCompressComponent,
        ToolCollapseDownComponent,
        ToolCollapseUpComponent,
        ToolRefreshComponent,
        MnCollapseComponent,
        MnPanelSimpleComponent
    ],
    exports: [
        MnPanelComponent,
        MnPanelHeaderComponent,
        MnPanelTitleComponent,
        PanelToolbarComponent,
        MnPanelBodyComponent,
        MnPanelBottomComponent,
        ToolExpandComponent,
        ToolCompressComponent,
        ToolCollapseDownComponent,
        ToolCollapseUpComponent,
        MnCollapseComponent,
        MnPanelSimpleComponent
    ],
    providers: [
    ]
})
export class MnPanelModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MnPanelModule
        };
    }
}
