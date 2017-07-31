import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {FlexLayoutModule} from '../lib/flex-layout/flex-layout.module';
import {PanelModule} from '../lib/panel/panel.module';
import {ButtonModule} from '../lib/button/button.module';
import {CalendarModule} from '../lib/calendar/calendar.module';
import {RouterModule} from '@angular/router';
import {DynamicComponent, DyComponent} from './dynamic/dynamic.component';
import {BaseComponent} from './base/base.component';
import {DynamicModule} from '../lib/dynamic/dynamic.module';
import {DynamicSample1Component} from '../lib/dynamic/dynamic-component.directive';


@NgModule({
    declarations: [
        AppComponent,
        DynamicComponent,
        BaseComponent,
        DyComponent,

        DynamicSample1Component

    ],

    exports: [
        DyComponent,
    ],

    /**
     * 不会再模板中被引用到的组件。
     * 这个属性一般情况下只有ng自己使用，一般是bootstrap组件或者路由组件，ng会自动把bootstrap、路由组件放入其中。
     * !!!除非不通过路由动态将component加入到dom中，否则不会用到这个属性。
     */
    entryComponents: [
        DynamicSample1Component
    ],

    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,

        RouterModule.forRoot([
            {
                path: 'base',
                component: BaseComponent
            },
            {
                path: 'dynamic',
                component: DynamicComponent
            }
            // {
            //     path: '!',
            //     component: FeCpt
            // }
        ], {useHash: true}),

        FlexLayoutModule.forRoot(),
        PanelModule.forRoot(),
        ButtonModule.forRoot(),
        CalendarModule.forRoot(),
        DynamicModule.forRoot()
    ],
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
