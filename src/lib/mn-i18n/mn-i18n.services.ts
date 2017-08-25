import {Injectable} from '@angular/core';
import * as mu from 'mzmu';
import {Http, Response} from '@angular/http';
import {MnI18nConfig} from './mn-i18n-config';

@Injectable()
export class MnI18nServices {
    constructor(private _http: Http) {
    }

    /**
     * 资源存储器
     */
    store: any = {};

    /**
     * 当前资源
     */
    locale: any = {};
    locale_promise: Promise<any>;

    /**
     * 配置信息
     */
    config: MnI18nConfig;

    // setConfig(config: I18nConfig) {
    setConfig(config: any) {
        const option: MnI18nConfig = {
            lang: 'en',
            prefix: '/i18n',
            suffix: '.json',
            storageKey: 'I18N_LANG'
        };

        if (!config.lang) {
            config.lang = mu.storage(config.storageKey || option.storageKey) || option.lang;
        }

        this.config = mu.extend({}, option, this.config || {}, config);

        mu.storage(this.config.storageKey, this.config.lang);

        if (this.store[this.config.lang]) {
            this.locale = this.store[this.config.lang];

            this.locale_promise = new Promise((resolve) => {
                resolve(this.store[this.config.lang]);
            });
        } else {
            const path = `${this.config.prefix}/${this.config.lang}${this.config.suffix}`;

            this.locale_promise = this._http.get(path)
            .map((res: Response) => {
                // 多重处理, 防止用户拦截器先行使用 map 处理过数据
                const body = (res.json && mu.isFunction(res.json)) ? res.json() : res;
                return body || {};
            })
            .toPromise();

            this.locale_promise.then((res: any) => {
                this.store[this.config.lang] = this.locale = res;
            });
        }
    }

    setLang(lang: string): void {
        this.setConfig({lang});
    }

    /**
     * 获得国际化结果
     * @param cb
     * @param key
     * @param params
     * @return {string}
     */
    getText(cb: any, key: string, ...params: any[]): Promise<any> {
        return this.locale_promise.then((res: any) => {
            return cb(this.translateText(res, key, params), key, params);
        });
    }

    /**
     * translate text
     * @param res
     * @param key
     * @param params
     * @return {string}
     */
    translateText(res: any, key: string, params: any[]): string {
        if (mu.isEmpty(res)) {
            return key || '';
        }

        const toArray = (a: any) => {
            return !mu.isArray(a) ? [a] : a;
        };

        const concat = (a: any, b: any) => {
            return toArray(a).concat(toArray(b));
        };

        let _params = [];

        mu.each(params, (o) => {
            _params = concat(_params, o);
        });

        let text = mu.prop(res, key) || res[key] || key || '';

        /**
         * 先匹配对象属性
         * 默认对象属性为参数中的最后一个
         */
        mu.run(_params[_params.length - 1], (obj) => {
            if (mu.isObject(obj)) {
                obj = _params.pop();
                text = text.replace(/\{(.*?)\}/g, function (m, i) {
                    return mu.prop(obj, i) || m;
                });
            }
        });

        text = mu.format(text, ..._params);

        return text;
    }

}
