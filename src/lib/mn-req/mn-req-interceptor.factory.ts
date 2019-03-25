import {Injectable, Injector} from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse,
    HttpResponseBase
} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {MnReqServices} from './mn-req.service';
import {MnLoggerService} from '../mn-common/services/mn-logger.service';

import  mu from 'mzmu';

/**
 * observable 流程处理
 * map()：遍历流
 * filter()：过滤流
 * do()：监视流（通常打个console而已）
 * catch()：捕获异常
 * subscribe()：订阅流（即执行）
 */

@Injectable()
export class MnReqInterceptorFactory implements HttpInterceptor {
    constructor(
        private _logger: MnLoggerService,
        private _mrs: MnReqServices) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        /**
         * 设置Headers
         * @type {HttpRequest<any>}
         * @private
         */
        let _req = req.clone({
            setHeaders: {
                'Cache-control': 'no-store,no-cache',
                'Pragma': 'no-cache',
                'Expires': '0',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        // 获取cunstom 设置的 headers 参数
        this._mrs.getHeaders((headers_map) => {
            mu.each(headers_map, hm => {
                let value = typeof hm.value === 'function' ? hm.value() : hm.value;
                if (mu.isExist(value)) {
                    _req = _req.clone({headers: _req.headers[hm.method](hm.key, value)});
                }
            });
        });

        /**
         * pre Request
         */
        this.beforeRequest(_req.url, _req);

        /**
         * Request
         */
        const request = next.handle(_req);

        return request.catch((error, caught) => {
            /**
             * 在 catch 的时候抛错
             *
             * Observable.throw(error) => error
             * Observable.empty() => 错误不往下走
             */
            this._logger.error('catch::::', error.url);
            if (this._mrs.reqCatch) {
                return this._mrs.reqCatch(error, caught, error.url) || Observable.throw(error);
            } else {
                return Observable.throw(error);
            }
        }).do((event: HttpEvent<any>) => {
        }, (error: HttpErrorResponse) => {
            this._logger.error('error::::', error.url);
        }).finally(() => {
            /**
             * Request
             */
            this.afterRequest();
        }) as any;
    }

    loadComplete: any = mu.debounce(() => {
        this._mrs.progress = 100;
    }, 500);

    progressStep(): void {
        const tid = setTimeout(() => {
            if (this._mrs.progress < mu.randomInt(80, 90)) {
                this._mrs.progress = this._mrs.progress * 1.05;
                this.progressStep();
            } else {
                clearTimeout(tid);
            }
        }, mu.randomInt(300, 1200));
    }

    beforeRequest(url: string, config: any): void {
        const progress = this._mrs.progress;
        mu.run(progress > 0 && progress < 100, () => {
            this._mrs.progress += (100 - progress) * (Math.random() * .5);
        }, () => {
            this._mrs.progress = mu.randomInt(5, 25);
        });

        this.progressStep();

        this._logger.log(
            'before request:::: -> ',
            url,
            mu.prop(config, 'method'),
            mu.run(mu.prop(config, 'options.search'), search => search.toString())
        );
    }

    afterRequest(): void {
        this.loadComplete();
    }
}
