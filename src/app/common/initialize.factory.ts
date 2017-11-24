import {InitializeService} from './initialize.service';
import {MnI18nServices} from '../../lib/mn-i18n/mn-i18n.services';
import {MnRuleServices} from '../../lib/mn-rule/mn-rule.services';
import {MnReqServices} from '../../lib/mn-req/mn-req.service';
import {ResourcePool} from '../demo-req/resource-pool';
import {Observable} from 'rxjs/Observable';
import {MnEchartsService} from '../../lib/mn-echarts/mn-echarts.service';
import {MnCommonServices} from '../../lib/mn-common/services/mn-common.services';
import {DemoNodataComponent} from '../demo-nodata/demo-nodata.component';

export function InitializeFactory(_initServ: InitializeService,
                                  _i18nServ: MnI18nServices,
                                  _ruleServ: MnRuleServices,
                                  _reqServ: MnReqServices,
                                  _rp: ResourcePool,
                                  _ecServ: MnEchartsService,
                                  _mcs: MnCommonServices) {
    return () => {

        // console.debug(
        //     _initServ,
        //     _i18nServ,
        //     _ruleServ,
        //     _reqServ,
        //     _rp,
        //     _ecServ,
        //     _mcs
        // );

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
            {
                method: 'append',
                key: 'X-TOKEN',
                value: '-----'
            },
            {
                method: 'append',
                key: 'X-ORIGIN',
                value: '|||||'
            },
            {
                method: 'append',
                key: 'X-ACCESS-TOKEN',
                value: ':::::'
            }
        ]);

        _reqServ.setResources(_rp);

        _reqServ.reqCatch = ((error, caught, url) => {
            if (error.status === 404) {
                return Observable.empty();
            }
        });

        _reqServ.reqError = ((error, url) => {
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

        _ecServ.setConfig({
            toolbars: true,
            show_tools: 'toggle'
        });

        _mcs._dynamicService.setComponentMap(DemoNodataComponent);

    };
}
