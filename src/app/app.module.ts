import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {FlexLayoutModule} from '../lib/flex-layout/flex-layout.module';
import {PanelModule} from '../lib/panel/panel.module';
import {ButtonModule} from '../lib/button/button.module';
import {CalendarModule} from '../lib/calendar/calendar.module';
import {DynamicModule} from '../lib/dynamic/dynamic.module';
import {ReqModule} from '../lib/req/req.module';
import {DemoPanelComponent} from './demo-panel/demo-panel.component';
import {DemoReqComponent} from './demo-req/demo-req.component';
import {LoaderBarModule} from '../lib/loader-bar/loader-bar.module';
import {ResourcePool} from './demo-req/resource-pool';

@NgModule({
    declarations: [
        AppComponent,
        DemoPanelComponent,
        DemoReqComponent
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

        ReqModule.forRoot()
    ],
    providers: [
        ResourcePool
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
