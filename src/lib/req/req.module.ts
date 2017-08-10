import {ModuleWithProviders, NgModule, Injector} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';
import {ReqHttpComponent} from './req-http.component';
import {ReqResourceComponent} from './req-resource.component';
import {$$HttpInterceptor} from './$$HttpInterceptor';
import {ReqNoDataComponent} from './req-nodata.component';
import {$$Resource} from './$$Resource';
import {DynamicModule} from 'MasterNG';

import {LoaderBarModule} from 'lib/loader-bar/loader-bar.module';
import {HttpLoaderComponent} from './http-loader.component';
import {ReqService} from './req.service';

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
        DynamicModule,
        LoaderBarModule.forRoot()

    ],
    declarations: [
        ReqHttpComponent,
        ReqResourceComponent,
        ReqNoDataComponent,
        HttpLoaderComponent
    ],
    exports: [
        ReqHttpComponent,
        ReqResourceComponent,
        HttpLoaderComponent
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

        $$Resource,
        ReqService

    ]
})
export class ReqModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ReqModule
        };
    }
}
