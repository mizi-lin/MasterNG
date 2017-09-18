import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export declare class MnReqService {
    progress$: BehaviorSubject<any>;
    progress_: number;
    progress: any;
    /**
     * httpInterceptor headers
     */
    _headers: any;
    setHeaders(headers: any, type?: string): void;
    getHeaders(fn: any): any;
    constructor();
}
