import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

declare const mu: any;

@Injectable()
export class MnReqService {
    progress$ = new BehaviorSubject<any>({});
    progress_: number;

    get progress(): any {
        return this.progress_;
    }

    set progress(value: any) {
        this.progress_ = value;
        this.progress$.next(value);
    }

    /**
     * httpInterceptor headers
     */
    _headers: any;

    setHeaders(headers: any, type: string = 'extend') {
        // type: extend and new
        if (type === 'extend') {
            this._headers = this._headers.concat(headers);
        } else if (type === 'new') {
            this._headers = headers;
        }
    }

    getHeaders(fn: any) {
        return fn ? fn(this._headers) : this._headers;
    }

    constructor() {
    }
}
