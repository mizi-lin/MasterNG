import { Headers, Response, ConnectionBackend, RequestOptions, RequestOptionsArgs, Http } from '@angular/http';
import { Injector } from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MnReqService } from './mn-req.service';
/**
 * http 拦截器
 *
 * httpInterceptor.v1.0
 *
 * 1. 在 header 中设置 token
 * 2. 异常处理
 * 3. map 数据同步处理
 *
 * observable 流程处理
 * map()：遍历流
 * filter()：过滤流
 * do()：监视流（通常打个console而已）
 * catch()：捕获异常
 * subscribe()：订阅流（即执行）
 */
export declare class MnReqInterceptorFactory extends Http {
    private _reqServ;
    router: Router;
    constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions, _injector: Injector, _reqServ: MnReqService);
    loadComplete: any;
    addHeaderWithToken(headers: Headers): Headers;
    map(observable: Observable<Response>): Observable<Response>;
    onCatch(error: any, caught: Observable<any>, url?: string): Observable<any>;
    onSuccess(res: Response, url?: string): void;
    onError(error: any, url?: string): void;
    onFinally(url?: string): void;
    beforeRequest(url: string, config: any): void;
    afterRequest(url: any): void;
    intercept(observable: Observable<Response>, url: string): Observable<Response>;
    _like_get(method: string, url: string, options?: RequestOptionsArgs): Observable<Response>;
    _like_post(method: string, url: string, body?: any, options?: RequestOptionsArgs): Observable<Response>;
    get(url: string, options?: RequestOptionsArgs): Observable<Response>;
    delete(url: string, options?: RequestOptionsArgs): Observable<Response>;
    head(url: string, options?: RequestOptionsArgs): Observable<Response>;
    options(url: string, options?: RequestOptionsArgs): Observable<Response>;
    post(url: string, body?: any, options?: RequestOptionsArgs): Observable<Response>;
    patch(url: string, body?: any, options?: RequestOptionsArgs): Observable<Response>;
    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;
}
