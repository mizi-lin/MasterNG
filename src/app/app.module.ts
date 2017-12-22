import {AppComponent} from './app.component';
import {DemoPanelComponent} from './demo-panel/demo-panel.component';
import {DemoReqComponent} from './demo-req/demo-req.component';
import {DemoEchartsComponent} from './demo-echarts/demo-echarts.component';
import {DemoI18nComponent} from './demo-i18n/demo-i18n.component';
import {DemoRuleComponent} from './demo-rule/demo-rule.component';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {ResourcePool} from './demo-req/resource-pool';
import {InitializeService} from './common/initialize.service';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {InitializeFactory} from './common/initialize.factory';
import {MasterNgModule} from '../lib/master-ng.module';
import {HeatWidgetComponent} from './common/widgets/heat-widget/heat-widget.component';
import {DemoEchart2Component} from './demo-echart2/demo-echart2.component';
import {DemoDatetimeComponent} from './demo-datetime/demo-datetime.component';
import {CommonModule} from '@angular/common';
import {DemoNodataComponent} from './demo-nodata/demo-nodata.component';
import {MnCommonServices} from '../lib/mn-common/services/mn-common.services';
import { DemoLayerComponent } from './demo-layer/demo-layer.component';

@NgModule({
    imports: [
        CommonModule,
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
                path: 'echarts2',
                component: DemoEchart2Component
            },

            {
                path: 'i18n',
                component: DemoI18nComponent
            },

            {
                path: 'rule',
                component: DemoRuleComponent
            },

            {
                path: 'datetime',
                component: DemoDatetimeComponent
            },

            {
                path: 'layer',
                component: DemoLayerComponent
            }

        ], {useHash: true}),

        MasterNgModule.forRoot()
    ],

    declarations: [
        AppComponent,
        DemoPanelComponent,
        DemoReqComponent,
        DemoEchartsComponent,
        DemoI18nComponent,
        DemoRuleComponent,
        HeatWidgetComponent,
        DemoEchart2Component,
        DemoDatetimeComponent,
        DemoNodataComponent,
        DemoLayerComponent
    ],

    entryComponents: [
        DemoNodataComponent
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
                ResourcePool,
                MnCommonServices
            ],
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
