"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var http_1 = require("@angular/http");
var mn_req_http_component_1 = require("./mn-req-http.component");
var mn_httpInterceptor_cls_1 = require("./mn-httpInterceptor.cls");
var mn_resource_1 = require("./mn-resource");
var mn_req_nodata_component_1 = require("./mn-req-nodata.component");
var mn_loader_bar_module_1 = require("../mn-loader-bar/mn-loader-bar.module");
var mn_http_loader_component_1 = require("./mn-http-loader.component");
var mn_req_service_1 = require("./mn-req.service");
var mn_dynamic_module_1 = require("../mn-dynamic/mn-dynamic.module");
var mn_file_download_directive_1 = require("./mn-file-download.directive");
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
var MnReqModule = (function () {
    function MnReqModule() {
    }
    MnReqModule.forRoot = function () {
        return {
            ngModule: MnReqModule
        };
    };
    return MnReqModule;
}());
MnReqModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    common_1.CommonModule,
                    http_1.HttpModule,
                    mn_dynamic_module_1.MnDynamicModule.forRoot(),
                    mn_loader_bar_module_1.MnLoaderBarModule.forRoot()
                ],
                declarations: [
                    mn_req_http_component_1.ReqHttpComponent,
                    mn_req_nodata_component_1.MnReqNoDataComponent,
                    mn_http_loader_component_1.MnHttpLoaderComponent,
                    mn_file_download_directive_1.MnFileDownloadDirective
                ],
                exports: [
                    mn_req_http_component_1.ReqHttpComponent,
                    mn_req_nodata_component_1.MnReqNoDataComponent,
                    mn_http_loader_component_1.MnHttpLoaderComponent,
                    mn_file_download_directive_1.MnFileDownloadDirective
                ],
                entryComponents: [
                    mn_req_nodata_component_1.MnReqNoDataComponent
                ],
                providers: [
                    mn_req_service_1.MnReqService,
                    {
                        provide: http_1.Http,
                        useClass: mn_httpInterceptor_cls_1.HttpInterceptorCls,
                        deps: [
                            http_1.XHRBackend,
                            http_1.RequestOptions,
                            core_1.Injector,
                            mn_req_service_1.MnReqService
                        ]
                    },
                    mn_resource_1.MnResource
                ]
            },] },
];
/** @nocollapse */
MnReqModule.ctorParameters = function () { return []; };
exports.MnReqModule = MnReqModule;
//# sourceMappingURL=mn-req.module.js.map