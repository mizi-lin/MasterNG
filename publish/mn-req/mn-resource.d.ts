import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
/**
 * the some angular1 resource
 * 类似 angular 1 的 resource 服务
 *
 * 处理URL, 使之 resource 化
 */
export declare class MnResource {
    private http;
    constructor(http: HttpClient);
    /**
     * URL to REST_URL
     * @param url
     * @param params
     * @param isReplace | true : 是否将不存在的占位符转为''(空)
     * @returns {{url: string, searchParams: HttpParams, search: any, params: any}}
     */
    private restful(url, params, isReplace?);
    get(url: string, search?: any, options?: any): Observable<any>;
    post(url: string, search?: any, data?: any, options?: any): Observable<any>;
    patch(url: string, search?: any, data?: any, options?: any): Observable<any>;
    delete(url: string, search?: any, options?: any): Observable<any>;
    pool(url: string): any;
}
