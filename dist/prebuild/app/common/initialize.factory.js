"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function InitializeFactory(_initServ, _i18nServ, _ruleServ) {
    return function () {
        /**
         * 系统初始化，获得相关信息
         */
        _initServ.initApp();
        /**
         * 国际化
         */
        _i18nServ.setConfig({
            lang: 'en',
            prefix: 'assets/i18n'
        });
        /**
         * 规则匹配
         */
        _ruleServ.setRules({
            'aaa.bbb.ccc': true,
            'aaa.bbb.ddd': false,
            'aaa.bbb.eee': false,
            'aaa.bbb.fff': true
        });
    };
}
exports.InitializeFactory = InitializeFactory;
//# sourceMappingURL=initialize.factory.js.map