import {CommonModule} from '@angular/common';
import {MnCommonModule} from '../mn-common/mn-common.module';
import {MnPanelModule} from '../mn-panel/mn-panel.module';
import {MnReqModule} from '../mn-req/mn-req.module';
import {FlexLayoutModule} from '../flex-layout/flex-layout.module';
import {MnHandsontableModule} from '../mn-handsontable/mn-handsontable.module';
import {EchartsRenderDirective} from './echarts-render.directive';
import {EchartsConversionComponent} from './echarts-conversion.component';
import {EchartsPanelComponent} from './echarts-panel.component';
import {EchartsService} from './echarts.service';
import {ModuleWithProviders, NgModule} from '@angular/core';

@NgModule({
    imports: [
        CommonModule,
        MnCommonModule.forRoot(),
        MnPanelModule.forRoot(),
        MnReqModule.forRoot(),
        FlexLayoutModule.forRoot(),
        MnHandsontableModule.forRoot()
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
