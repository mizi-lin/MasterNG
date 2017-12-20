import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { MnReqServices } from './mn-req.service';
/**
 * observable 流程处理
 * map()：遍历流
 * filter()：过滤流
 * do()：监视流（通常打个console而已）
 * catch()：捕获异常
 * subscribe()：订阅流（即执行）
 */
export declare class MnReqInterceptorFactory implements HttpInterceptor {
    private _mrs;
    constructor(_mrs: MnReqServices);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    loadComplete: any;
    progressStep(): void;
    beforeRequest(url: string, config: any): void;
    afterRequest(): void;
}
