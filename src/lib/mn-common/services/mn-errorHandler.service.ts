import {ErrorHandler, Injectable} from '@angular/core';
import {MnLoggerService} from './mn-logger.service';

import  mu from 'mzmu';

@Injectable()
export class MnErrorHandler extends ErrorHandler {
    constructor(private _logger: MnLoggerService) {
        super();
    }

    deError: any = mu.debounce((error) => {

        /**
         * error type
         *
         * EvalError: eval错误 -> eval函数没有被正确执行
         * RangeError: 范围错误 -> 超出有效范围
         * ReferenceError: 引用错误 -> a, 引用了一个不存在的变量 b, 将变量赋值给一个无法被赋值的对象 -> 造成页面白屏
         * SyntaxError: 语法错误 -> 解析代码的时候发生的语法错误
         * TypeError: 类型错误 -> a, 变量或参数不是语气类型 b, 调用的对象不存在
         * URIError: URL错误 -> 与url相关函数参数不正确，主要是encodeURI()、decodeURI()、encodeURIComponent()、decodeURIComponent()、escape()和unescape()这六个函数
         */

        // let errorType = error.name;

        this._logger.Error(error);
    }, 500, true);

    handleError(error) {
        // 减少报错次数
        this.deError(error);

        // throw error;

        // 不返回错误
        // super.handleError(error);
    }
}
