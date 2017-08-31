import {InitializeService} from './initialize.service';
import {MnI18nServices} from '../../lib/mn-i18n/mn-i18n.services';
import {MnRuleServices} from '../../lib/mn-rule/mn-rule.services';

export function InitializeFactory(_initServ: InitializeService,
                                  _i18nServ: MnI18nServices,
                                  _ruleServ: MnRuleServices) {
    return () => {
        /**
         * 系统初始化，获得相关信息
         */
        _initServ.initApp();

        /**
         * 国际化
         */
        _i18nServ.setConfig({
            lang: 'en',
            prefix: '/assets/i18n'
        });

        /**
         * 规则匹配
         */
        _ruleServ.setRules({
            'aaa.bbb.ccc': false,
            'aaa.bbb.ddd': false,
            'aaa.bbb.eee': false,
            'aaa.bbb.fff': false
        });
    };
}
