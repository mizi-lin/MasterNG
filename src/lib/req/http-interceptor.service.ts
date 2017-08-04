import {Headers, Response, ConnectionBackend, RequestOptions, RequestOptionsArgs, Http} from '@angular/http';
import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {Router} from '@angular/router';

declare var mu: any, console: any;

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
@Injectable()
export class $$HttpInterceptor extends Http {
    router: Router;

    constructor(backend: ConnectionBackend,
                defaultOptions: RequestOptions,
                injector: Injector) {
        // super(backend, defaultOptions, injector);
        super(backend, defaultOptions);

        /**
         * 修正 ng-module 中 $$HttpInterceptor deps 中添加 Router 与 APP_INITIALIZE 冲突
         * fix bug: Cannot instantiate cyclic dependency
         */
        setTimeout(() => {
            this.router = injector.get(Router);
        }, 0);
    }

    addHeaderWithToken(headers: Headers): Headers {
        headers = headers || new Headers();
        //Caching von Ajax Requests verhindern, vor allem vom IE
        headers.append('Cache-control', 'no-cache');
        headers.append('Cache-control', 'no-store');
        headers.append('Pragma', 'no-cache');
        headers.append('Expires', '0');
        headers.append('X-TOKEN', mu.storage('X-TOKEN'));
        headers.append('X-ACCESS-TOKEN', mu.storage('X-ACCESS-TOKEN'));
        headers.append('X-ORIGIN', location.host);
        return headers;
    }

    map(observable: Observable<Response>, method: string): Observable<Response> {
        return observable.map((response: Response) => {
            let body = response.json();
            return body || {};
        });
    }

    intercept(observable: Observable<Response>): Observable<Response> {
        return observable.catch((err: any, source: Observable<Response>) => {
                let status: any = err.status;
                let title: string;
                let error: any;

                switch (status) {
                    case 401:
                        title = 'TOKEN失效';
                        // setTimeout(() => {
                        //     mu.storage(CONST.TOKEN, '');
                        //     mu.storage(CONST.ACCESS_TOKEN, '');
                        //     this.router.navigate([CONST.FE_LOGIN]);
                        // }, 0);
                        break;
                    case 404:
                        title = '页面不存在';
                        break;
                    case 500:
                        title = '操作错误或失败';
                        break;
                    case 502:
                        title = '连接中断';
                        break;
                    default:
                        title = '操作失败';
                        break;
                }

                if (status === 404) {
                    error = {
                        data: [
                            {message: '当前页面或资源不存在'}
                        ]
                    };
                } else if (status === 502) {
                    error = {
                        data: [
                            {message: '网络连接错误'},
                            {message: '或服务器连接中断'}
                        ]
                    };
                } else {
                    error = err.json();
                }

                // if (err.status  == 401 && !_.endsWith(err.url, 'api/auth/login')) {
                if (err.status === 401) {
                    return Observable.empty();
                } else {
                    return Observable.throw(err);
                }
            }
        );
    }

    get(url: string, options: RequestOptionsArgs = {}): Observable<any> {
        options.headers = this.addHeaderWithToken(options.headers);
        return this.intercept(this.map(super.get(url, options), 'get'));
    }

    post(url: string, body ?: any, options ?: any): Observable<any> {
        options = options || {};
        options.headers = this.addHeaderWithToken(options.headers);
        options.headers.append('Content-Type', 'application/json');
        return this.intercept(this.map(super.post(url, body, options).debounceTime(500).distinctUntilChanged(), 'post'));
    }

    patch(url: string, data ?: any, options ?: any): Observable<any> {
        options = options || {};
        options.headers = this.addHeaderWithToken(options.headers);
        options.headers.append('Content-Type', 'application/json');
        return this.intercept(this.map(super.patch(url, data, options), 'patch'));
    }
}
