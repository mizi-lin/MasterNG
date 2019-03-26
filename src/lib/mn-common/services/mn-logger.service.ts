import {Injectable} from '@angular/core';

import * as mu from 'mzmu';

/**
 * 重写控制 console
 * 控制 console 按执行环境输出
 */

@Injectable()
export class MnLoggerService {

    /**
     * 根据状态是否显示
     */
    _state: boolean = true;

    _place: string = '[MasterNG]';

    constructor() {
    }

    setState(state) {
        this._state = state;
    }

    Log(...args: any[]): void {
        args.unshift(this._place);
        console.log.apply(console, args);
    }

    Warn(...args: any[]): void {
        args.unshift(this._place);
        console.warn.apply(console, args);
    }

    Error(...args: any[]): void {
        args.unshift(this._place);
        console.error.apply(console, args);
    }

    Info(...args: any[]): void {
        args.unshift(this._place);
        console.log.apply(console, args);
    }

    Debug(...args: any[]): void {
        args.unshift(this._place);
        console.log.apply(console, args);
    }

    log(...args: any[]): void {
        this._state && this.Log(...args);
    }

    warn(...args: any[]): void {
        this._state && this.Warn(...args);
    }

    error(...args: any[]): void {
        this._state && this.Error(...args);
    }

    info(...args: any[]): void {
        this._state && this.Info(...args);
    }

    debug(...args: any[]): void {
        this._state && this.Debug(...args);
    }

    string(...args: any[]): void {
        let _args = mu.map(args, (o) => {
            try {
                return JSON.stringify(o);
            } catch (e) {
                return o;
            }
        });
        this._state && this.Debug(...args);
    }
}
