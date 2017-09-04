import {CommonModule} from '@angular/common';
import {MnCommonModule} from '../mn-common/mn-common.module';
import {MnPanelModule} from '../mn-panel/mn-panel.module';
import {MnReqModule} from '../mn-req/mn-req.module';
import {MnLayoutModule} from '../mn-layout/mn-layout.module';
import {MnHandsontableModule} from '../mn-handsontable/mn-handsontable.module';
import {MnEchartsRenderDirective} from './mn-echarts-render.directive';
import {MnEchartsConversionComponent} from './mn-echarts.component';
import {EchartsPanelComponent} from './mn-echarts-panel.component';
import {EchartsService} from './echarts.service';
import {ModuleWithProviders, NgModule} from '@angular/core';

@NgModule({
    imports: [
        CommonModule,
        MnCommonModule.forRoot(),
        MnPanelModule.forRoot(),
        MnReqModule.forRoot(),
        MnLayoutModule.forRoot(),
        MnHandsontableModule.forRoot()
    ],
    declarations: [
        MnEchartsRenderDirective,
        MnEchartsConversionComponent,
        EchartsPanelComponent
    ],

    /**
     * 作为子模块, 若主模块需要使用, 那么必须使用 exports
     */
    exports: [
        MnEchartsRenderDirective,
        MnEchartsConversionComponent,
        EchartsPanelComponent
    ],

    providers: [
        EchartsService
    ]
})
export class MnEchartsModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MnEchartsModule
        };
    }
}
