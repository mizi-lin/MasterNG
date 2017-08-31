import {ModuleWithProviders, NgModule, Injector} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';
import {ReqHttpComponent} from './mn-req-http.component';
import {MnReqResourceComponent} from './mn-req-resource.component';
import {HttpInterceptorCls} from './mn-httpInterceptor.cls';
import {MnResource} from './mn-resource';
import {MnReqNoDataComponent} from './mn-req-nodata.component';

import {LoaderBarModule} from '../loader-bar/loader-bar.module';
import {HttpLoaderComponent} from './mn-http-loader.component';
import {MnReqService} from './mn-req.service';
import {DynamicModule} from '../dynamic/dynamic.module';

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
        DynamicModule.forRoot(),
        LoaderBarModule.forRoot()

    ],
    declarations: [
        ReqHttpComponent,
        MnReqResourceComponent,
        MnReqNoDataComponent,
        HttpLoaderComponent
    ],
    exports: [
        ReqHttpComponent,
        MnReqResourceComponent,
        HttpLoaderComponent
    ],
    entryComponents: [
        MnReqNoDataComponent
    ],
    providers: [
        MnReqService,

        {
            provide: Http,
            useClass: HttpInterceptorCls,
            deps: [
                XHRBackend,
                RequestOptions,
                Injector,
                MnReqService
            ]
        },

        MnResource

    ]
})
export class MnReqModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MnReqModule
        };
    }
}
