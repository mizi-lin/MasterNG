import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export declare class MnReqServices {
    progress$: BehaviorSubject<any>;
    progress_: number;
    progress: any;
    /**
     * httpInterceptor headers
     */
    _headers: any;
    setHeaders(headers: any): void;
    getHeaders(fn?: any): any;
    /**
     * resource
     */
    _resources: any;
    setResources(resources: any): void;
    getResources(fn?: any): any;
    reqCatch(error: any, caught: any, url: any): any;
    reqError(error: any, caught: any, url: any): any;
    /**
     * 设置nodata component
     */
    _noDataComponent: any;
    setNoDataComponent(component: any): void;
    _restful: boolean;
    setRestful(b: boolean): void;
    constructor();
}
