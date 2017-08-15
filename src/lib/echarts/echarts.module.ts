import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EchartsService} from './echarts.service';
import {EchartsConversionComponent} from './echarts-conversion.component';
import {EchartsRenderDirective} from './echarts-render.directive';
import {EchartsPanelComponent} from './echarts-panel.component';
import {FlexLayoutModule, PanelModule} from 'MasterNG';

import {ReqModule} from 'lib/req/req.module';

console.debug(ReqModule);

@NgModule({
    imports: [
        CommonModule,
        PanelModule.forRoot(),
        // ReqModule.forRoot(),
        FlexLayoutModule.forRoot()
    ],
    declarations: [
        EchartsRenderDirective,
        EchartsConversionComponent,
        EchartsPanelComponent
    ],

    /**
     * 作为子模块, 若主模块需要使用, 那么必须使用 exports
     */
    exports: [
        EchartsRenderDirective,
        EchartsConversionComponent,
        EchartsPanelComponent
    ],

    providers: [
        EchartsService
    ]
})
export class EchartsModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: EchartsModule
        };
    }
}