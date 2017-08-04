import {Http, URLSearchParams} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

declare let mu: any, console: any;

/**
 * the some angular1 resource
 * 类似 angular 1 的 resource 服务
 *
 * 处理URL, 使之 resource 化
 */

@Injectable()
export class $$Resource {

    constructor(private http: Http) {
    };

    /**
     * URL to REST_URL
     * @param url
     * @param params
     * @param isReplace | true : 是否将不存在的占位符转为''(空)
     * @returns {{url: string, searchParams: URLSearchParams, search: any, params: any}}
     */
    private restful(url: string, params: any, isReplace: boolean = true): any {
        url = url || '';
        let sp: any = mu.clone(params || {});
        let restParams: any = {};

        url = url.replace(/\{(.+?)\}/g, (m: string, key: string) => {
            return mu.run(sp[key], (v: string) => {
                restParams[key] = v;
                sp = mu.remove(sp, key);
                return v;
            }) || (isReplace ? '' : m);
        });

        url = url.replace(/\/$/, '');

        let searchParams: URLSearchParams = new URLSearchParams();

        mu.run(sp, (p) => {
            mu.each(p, (v: any, k: string) => searchParams.set(k, v));
        });

        return {
            url: url,
            searchParams: searchParams,
            search: sp,
            params: params,
            restParams: restParams
        };
    }

    get(url: string, search?: any, options?: any): Observable<any> {
        let rest = this.restful(url, search);
        url = rest.url;
        options = mu.extend(true, {
            search: rest.searchParams
        }, options || {});

        return this.http.get(url, options);
    }

    post(url: string, search?: any, data?: any, options?: any): Observable<any> {

        switch (arguments.length) {
            case 1:
                data = {};
                search = {};
                options = {};
                break;
            case 2:
                data = arguments[1];
                search = {};
                options = {};
                break;
            case 3:
                options = {};
                break;
        }

        let rest = this.restful(url, search, false);
        let restdata = this.restful(rest.url, data, true);

        options = mu.extend(true, {
            search: rest.searchParams
        }, options || {});

        return this.http.post(restdata.url, data, options);
    }

    patch(url: string, search?: any, data?: any, options?: any): Observable<any> {
        switch (arguments.length) {
            case 1:
                search = {};
                data = {};
                options = {};
                break;
            case 2:
                search = {};
                data = arguments[1];
                options = {};
                break;
            case 3:
                options = {};
                break;
        }

        let rest = this.restful(url, search, false);
        let restdata = this.restful(rest.url, data, true);

        options = mu.extend(true, {
            search: rest.searchParams
        }, options || {});

        return this.http.patch(restdata.url, data, options);
    }

    delete(url: string, search?: any, options?: any): Observable<any> {
        let rest = this.restful(url, search);
        url = rest.url;
        options = mu.extend(true, {
            search: rest.searchParams
        }, options || {});
        return this.http.delete(url, options);
    }

    pool(url: string): any {
        let vm = this;
        return {
            get(search?: any, options?: any): Observable<any> {
                return vm.get(url, search, options);
            },

            post(search?: any, data?: any, options?: any): Observable<any> {
                let args: any = Array.from(arguments);
                args.unshift(url);
                return vm.post.apply(vm, args);
            },

            delete(search?: any, data?: any, options?: any): Observable<any> {
                let args: any = Array.from(arguments);
                args.unshift(url);
                return vm.delete.apply(vm, args);
            },

            patch(search?: any, data?: any, options?: any): Observable<any> {
                let args: any = Array.from(arguments);
                args.unshift(url);
                return vm.patch.apply(vm, args);
            },

            save(search?: any, data?: any, options?: any): Observable<any> {
                let primaryKey = (search || data || {}).__primary__;
                let method = (search || data || {})[primaryKey] ? 'patch' : 'post';
                let args: any = Array.from(arguments);
                args.unshift(url);
                return vm[method].apply(vm, args);
            }
        };
    }

}
