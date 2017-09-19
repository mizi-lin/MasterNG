import {InitializeService} from './initialize.service';
import {MnI18nServices} from '../../lib/mn-i18n/mn-i18n.services';
import {MnRuleServices} from '../../lib/mn-rule/mn-rule.services';
import {MnReqService} from '../../lib/mn-req/mn-req.service';
import {ResourcePool} from '../demo-req/resource-pool';

export function InitializeFactory(_initServ: InitializeService,
                                  _i18nServ: MnI18nServices,
                                  _ruleServ: MnRuleServices,
                                  _reqServ: MnReqService,
                                  _rp: ResourcePool) {
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
            prefix: 'assets/i18n'
        });

        _reqServ.setHeaders([
            {method: 'append', key: 'X-TOKEN', value: '-----'},
            {method: 'append', key: 'X-ORIGIN', value: '|||||'},
            {method: 'append', key: 'X-ACCESS-TOKEN', value: ':::::'}
        ]);

        _reqServ.setResources(_rp);

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
