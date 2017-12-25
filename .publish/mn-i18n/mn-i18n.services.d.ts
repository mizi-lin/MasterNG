import { Http } from '@angular/http';
import { MnI18nConfig } from './mn-i18n-config';
export declare class MnI18nServices {
    private _http;
    constructor(_http: Http);
    /**
     * 资源存储器
     */
    store: any;
    /**
     * 当前资源
     */
    locale: any;
    locale_promise: Promise<any>;
    /**
     * 配置信息
     */
    config: MnI18nConfig;
    setConfig(config: any): void;
    setLang(lang: string): void;
    /**
     * 获得国际化结果
     * @param cb
     * @param key
     * @param params
     * @return {string}
     */
    getText(cb: any, key: string, ...params: any[]): Promise<any>;
    /**
     * translate text
     * @param res
     * @param key
     * @param params
     * @return {string}
     */
    translateText(res: any, key: string, params: any[]): string;
    /**
     * 根据当前本地值，获取国际化结果
     * @param {string} key
     * @param params
     */
    byText(key: string, ...params: any[]): string;
}
