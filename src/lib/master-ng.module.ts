import {ModuleWithProviders, NgModule} from '@angular/core';
import {MnLayoutModule} from './mn-layout/mn-layout.module';
import {MnPanelModule} from './mn-panel/mn-panel.module';
import {MnButtonModule} from './mn-button/mn-button.module';
import {MnLoaderBarModule} from './mn-loader-bar/mn-loader-bar.module';
import {MnDynamicModule} from './mn-dynamic/mn-dynamic.module';
import {MnReqModule} from './mn-req/mn-req.module';
import {MnEchartsModule} from './mn-echarts/mn-echarts.module';
import {MnCommonModule} from './mn-common/mn-common.module';
import {MnI18nModule} from './mn-i18n/mn-i18n.module';
import {MnRuleModule} from './mn-rule/mn-rule.module';
import {MnDatetimeModule} from './mn-datetime-picker/mn-datetime.module';
import {MnFloatLayerModule} from './mn-flayer/mn-flayer.module';
import {MnFormModule} from './mn-form/mn-form.module';
import {ExtraModules} from './mn-dynamic/mn-dynamic-template.directive';
import {MnCommonServices} from './mn-common/services/mn-common.services';
import {MnDynamicServices} from './mn-dynamic/mn-dynamic-component.service';
import {MnRuleServices} from './mn-rule/mn-rule.services';
import {MnReqServices} from './mn-req/mn-req.service';
import {MnEchartsServices} from './mn-echarts/mn-echarts.service';

@NgModule({
    imports: [
        MnLayoutModule,
        MnPanelModule,
        MnButtonModule,
        MnLoaderBarModule,
        MnDynamicModule.forRoot([
            MnLayoutModule,
            MnPanelModule,
            MnButtonModule
        ]),
        MnReqModule,
        MnEchartsModule,
        MnCommonModule,
        MnI18nModule,
        MnRuleModule,
        MnDatetimeModule,
        MnFloatLayerModule,
        MnFormModule
    ],
    exports: [
        MnLayoutModule,
        MnPanelModule,
        MnButtonModule,
        MnLoaderBarModule,
        MnDynamicModule,
        MnReqModule,
        MnEchartsModule,
        MnCommonModule,
        MnI18nModule,
        MnRuleModule,
        MnDatetimeModule,
        MnFloatLayerModule,
        MnFormModule
    ]
})
export class MasterNgModule {
    static forRoot(modules: any[] = []): ModuleWithProviders {
        return {
            ngModule: MasterNgModule,
            providers: [
                MnCommonServices,
                MnDynamicServices,
                MnRuleServices,
                MnReqServices,
                MnEchartsServices,
                {
                    provide: ExtraModules,
                    useValue: {items: modules}
                }
            ]
        };
    }
}
