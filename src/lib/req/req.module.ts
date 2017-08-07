import {ModuleWithProviders, NgModule, Injector} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';
import {ReqHttpComponent} from './req-http.component';
import {ReqResourceComponent} from './req-resource.component';
import {$$HttpInterceptor} from './http-interceptor.service';
import {ReqNoDataComponent} from './req-nodata.component';
import {$$Resource} from './resource.service';
import {ResourceContainer} from './resource-container';
import {DynamicModule} from 'MasterNG';

/**
 * ReqModule
 * 使ajax请求与返回分开
 * 使ajax各阶段事务专注于自己
 * NO_DATA 与 Http Processor 各自呈现
 *
 * 1. Http 拦截器
 * 2. Http loader
 * 3. Resource
 * 4. rh - ReqHttp
 * 5. rr - ReqResource
 */
@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        DynamicModule
    ],
    declarations: [
        ReqHttpComponent,
        ReqResourceComponent,
        ReqNoDataComponent
    ],
    exports: [
        ReqHttpComponent,
        ReqResourceComponent
    ],
    entryComponents: [
        ReqNoDataComponent
    ],
    providers: [
        {
            provide: Http,
            useClass: $$HttpInterceptor,
            deps: [
                XHRBackend,
                RequestOptions,
                Injector
            ]
        },

        $$Resource

    ]
})
export class ReqModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ReqModule
        };
    }
}
