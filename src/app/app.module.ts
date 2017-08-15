import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {DemoPanelComponent} from './demo-panel/demo-panel.component';
import {DemoReqComponent} from './demo-req/demo-req.component';
import {DemoEchartsComponent} from './demo-echarts/demo-echarts.component';
import {FlexLayoutModule} from '../lib/flex-layout/flex-layout.module';
import {ButtonModule} from '../lib/button/button.module';
import {CalendarModule} from '../lib/calendar/calendar.module';
import {DynamicModule} from '../lib/dynamic/dynamic.module';
import {ReqModule} from '../lib/req/req.module';
import {LoaderBarModule} from '../lib/loader-bar/loader-bar.module';
import {ResourcePool} from './demo-req/resource-pool';
import {EchartsModule} from '../lib/echarts/echarts.module';
import {PanelModule} from '../lib/panel/panel.module';

@NgModule({
    declarations: [
        AppComponent,
        DemoPanelComponent,
        DemoReqComponent,
        DemoEchartsComponent
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
        EchartsModule.forRoot()
    ],
    providers: [
        ResourcePool
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
