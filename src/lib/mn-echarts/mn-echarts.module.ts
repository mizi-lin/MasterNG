import {CommonModule} from '@angular/common';
import {MnCommonModule} from '../mn-common/mn-common.module';
import {MnPanelModule} from '../mn-panel/mn-panel.module';
import {MnReqModule} from '../mn-req/mn-req.module';
import {MnLayoutModule} from '../mn-layout/mn-layout.module';
import {MnEchartsRenderDirective} from './mn-echarts-render.directive';
import {MnEchartsComponent} from './mn-echarts.component';
import {MnEchartsPanelComponent} from './mn-echarts-panel.component';
import {MnEchartsServices} from './mn-echarts.service';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {MnFloatLayerModule} from '../mn-float-layer/mn-float-layer.module';

@NgModule({
    imports: [
        CommonModule,
        MnCommonModule.forRoot(),
        MnPanelModule.forRoot(),
        MnReqModule.forRoot(),
        MnLayoutModule.forRoot(),
        MnFloatLayerModule.forRoot(),

        NgZorroAntdModule,
        BrowserAnimationsModule
    ],
    declarations: [
        MnEchartsRenderDirective,
        MnEchartsComponent,
        MnEchartsPanelComponent
    ],

    /**
     * 作为子模块, 若主模块需要使用, 那么必须使用 exports
     */
    exports: [
        MnEchartsRenderDirective,
        MnEchartsComponent,
        MnEchartsPanelComponent
    ],

    providers: [
        MnEchartsServices
    ]
})
export class MnEchartsModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MnEchartsModule
        };
    }
}
