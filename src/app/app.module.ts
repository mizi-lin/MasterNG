import {AppComponent} from './app.component';
import {DemoPanelComponent} from './demo-panel/demo-panel.component';
import {DemoReqComponent} from './demo-req/demo-req.component';
import {DemoEchartsComponent} from './demo-echarts/demo-echarts.component';
import {DemoI18nComponent} from './demo-i18n/demo-i18n.component';
import {DemoRuleComponent} from './demo-rule/demo-rule.component';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '../lib/flex-layout/flex-layout.module';
import {PanelModule} from '../lib/panel/panel.module';
import {ButtonModule} from '../lib/button/button.module';
import {CalendarModule} from '../lib/calendar/calendar.module';
import {LoaderBarModule} from '../lib/loader-bar/loader-bar.module';
import {DynamicModule} from '../lib/dynamic/dynamic.module';
import {MnReqModule} from '../lib/mn-req/mn-req.module';
import {EchartsModule} from '../lib/echarts/echarts.module';
import {MnHandsontableModule} from '../lib/mn-handsontable/mn-handsontable.module';
import {MnCommonModule} from '../lib/mn-common/mn-common.module';
import {MnI18nModule} from '../lib/mn-i18n/mn-i18n.module';
import {MnRuleModule} from '../lib/mn-rule/mn-rule.module';
import {ResourcePool} from './demo-req/resource-pool';
import {InitializeService} from './common/initialize.service';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {InitializeFactory} from './common/initialize.factory';
import {MnI18nServices} from '../lib/mn-i18n/mn-i18n.services';
import {MnRuleServices} from '../lib/mn-rule/mn-rule.services';
import {NgZorroAntdModule} from 'ng-zorro-antd/src/release/ng-zorro-antd.module';

@NgModule({
    declarations: [
        AppComponent,
        DemoPanelComponent,
        DemoReqComponent,
        DemoEchartsComponent,
        DemoI18nComponent,
        DemoRuleComponent
    ],
    imports: [
        BrowserModule,

        NgZorroAntdModule.forRoot(),

        RouterModule.forRoot([
            {
                path: 'panel',
                component: DemoPanelComponent
            },
            {
                path: 'req',
                component: DemoReqComponent
            },
            {
                path: 'echarts',
                component: DemoEchartsComponent
            },
            {
                path: 'i18n',
                component: DemoI18nComponent
            },

            {
                path: 'rule',
                component: DemoRuleComponent
            }

        ], {useHash: true}),

        FlexLayoutModule.forRoot(),
        PanelModule.forRoot(),
        ButtonModule.forRoot(),
        CalendarModule.forRoot(),
        LoaderBarModule.forRoot(),
        DynamicModule.forRoot([
            FlexLayoutModule,
            PanelModule,
            ButtonModule,
            CalendarModule
        ]),

        MnReqModule.forRoot(),
        EchartsModule.forRoot(),
        MnHandsontableModule.forRoot(),
        MnCommonModule.forRoot(),
        MnI18nModule.forRoot(),
        MnRuleModule.forRoot()

    ],
    providers: [
        ResourcePool,
        InitializeService,

        {
            provide: APP_INITIALIZER,
            // 这里不要用匿名函数, webpack 会报错
            useFactory: InitializeFactory,
            deps: [
                InitializeService,
                MnI18nServices,
                MnRuleServices
            ],
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
