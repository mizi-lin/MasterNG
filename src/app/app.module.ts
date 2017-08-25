import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {DemoPanelComponent} from './demo-panel/demo-panel.component';
import {DemoReqComponent} from './demo-req/demo-req.component';
import {DemoEchartsComponent} from './demo-echarts/demo-echarts.component';
import {LoaderBarModule} from '../lib/loader-bar/loader-bar.module';
import {ResourcePool} from './demo-req/resource-pool';
import {DemoPanelComponent} from './demo-panel/demo-panel.component';
import {DemoReqComponent} from './demo-req/demo-req.component';
import {LoaderBarModule} from '../lib/loader-bar/loader-bar.module';
import {ResourcePool} from './demo-req/resource-pool';
import {DemoEchartsComponent} from './demo-echarts/demo-echarts.component';
import {EchartsModule} from '../lib/echarts/echarts.module';
import {PanelModule} from '../lib/panel/panel.module';
import {FlexLayoutModule} from '../lib/flex-layout/flex-layout.module';
import {ButtonModule} from '../lib/button/button.module';
import {CalendarModule} from '../lib/calendar/calendar.module';
import {DynamicModule} from '../lib/dynamic/dynamic.module';
import {ReqModule} from '../lib/req/req.module';
import {MnCommonModule} from '../lib/mn-common/mn-common.module';
import {MnHandsontableModule} from '../lib/mn-handsontable/mn-handsontable.module';
import { DemoI18nComponent } from './demo-i18n/demo-i18n.component';
import {MnI18nModule} from '../lib/mn-i18n/mn-i18n.module';
import {InitializeService} from './common/initialize.service';
import {InitializeFactory} from './common/initialize.factory';
import {MnI18nServices} from '../lib/mn-i18n/mn-i18n.services';

@NgModule({
    declarations: [
        AppComponent,
        DemoPanelComponent,
        DemoReqComponent,
        DemoEchartsComponent,
        DemoI18nComponent
    ],
    imports: [
        BrowserModule,

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

        ReqModule.forRoot(),
        EchartsModule.forRoot(),
        MnHandsontableModule.forRoot(),
        MnCommonModule.forRoot(),
        MnI18nModule.forRoot()
    ],
    providers: [
        ResourcePool,
        InitializeService,

        {
            provide: APP_INITIALIZER,
            useFactory: InitializeFactory,　//这里不要用匿名函数, webpack 会报错
            deps: [InitializeService, MnI18nServices],
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
