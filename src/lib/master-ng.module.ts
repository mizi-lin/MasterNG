import {ModuleWithProviders, NgModule} from '@angular/core';
import {FlexLayoutModule} from './flex-layout/flex-layout.module';
import {PanelModule} from './panel/panel.module';
import {ButtonModule} from './button/button.module';
import {CalendarModule} from './calendar/calendar.module';
import {LoaderBarModule} from './loader-bar/loader-bar.module';
import {DynamicModule} from './dynamic/dynamic.module';
import {MnReqModule} from './mn-req/mn-req.module';
import {EchartsModule} from './echarts/echarts.module';
import {MnHandsontableModule} from './mn-handsontable/mn-handsontable.module';
import {MnCommonModule} from './mn-common/mn-common.module';
import {MnI18nModule} from './mn-i18n/mn-i18n.module';
import {MnRuleModule} from './mn-rule/mn-rule.module';

@NgModule({
    imports: [
        FlexLayoutModule,
        PanelModule,
        ButtonModule,
        CalendarModule,
        LoaderBarModule,
        DynamicModule.forRoot([
            FlexLayoutModule,
            PanelModule,
            ButtonModule,
            CalendarModule
        ]),
        MnReqModule,
        EchartsModule,
        MnHandsontableModule,
        MnCommonModule,
        MnI18nModule,
        MnRuleModule
    ],
    exports: [
        FlexLayoutModule,
        PanelModule,
        ButtonModule,
        CalendarModule,
        LoaderBarModule,
        DynamicModule,
        MnReqModule,
        EchartsModule,
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
