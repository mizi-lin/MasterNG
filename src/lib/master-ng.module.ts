import {ModuleWithProviders, NgModule} from '@angular/core';
import {MnLayoutModule} from './mn-layout/mn-layout.module';
import {MnPanelModule} from './mn-panel/mn-panel.module';
import {MnButtonModule} from './mn-button/mn-button.module';
import {CalendarModule} from './calendar/calendar.module';
import {MnLoaderBarModule} from './mn-loader-bar/mn-loader-bar.module';
import {DynamicModule} from './dynamic/dynamic.module';
import {MnReqModule} from './mn-req/mn-req.module';
import {MnEchartsModule} from './mn-echarts/mn-echarts.module';
import {MnHandsontableModule} from './mn-handsontable/mn-handsontable.module';
import {MnCommonModule} from './mn-common/mn-common.module';
import {MnI18nModule} from './mn-i18n/mn-i18n.module';
import {MnRuleModule} from './mn-rule/mn-rule.module';

@NgModule({
    imports: [
        MnLayoutModule,
        MnPanelModule,
        MnButtonModule,
        CalendarModule,
        MnLoaderBarModule,
        DynamicModule.forRoot([
            MnLayoutModule,
            MnPanelModule,
            MnButtonModule,
            CalendarModule
        ]),
        MnReqModule,
        MnEchartsModule,
        MnHandsontableModule,
        MnCommonModule,
        MnI18nModule,
        MnRuleModule
    ],
    exports: [
        MnLayoutModule,
        MnPanelModule,
        MnButtonModule,
        CalendarModule,
        MnLoaderBarModule,
        DynamicModule,
        MnReqModule,
        MnEchartsModule,
        MnHandsontableModule,
        MnCommonModule,
        MnI18nModule,
        MnRuleModule
    ]
})
export class MasterNgModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MasterNgModule
        };
    }
}
