import {Injectable} from '@angular/core';
import {MnDynamicServices} from '../../mn-dynamic/mn-dynamic-component.service';
import {MnI18nServices} from '../../mn-i18n/mn-i18n.services';
import {MnRuleServices} from '../../mn-rule/mn-rule.services';
import {MnReqServices} from '../../mn-req/mn-req.service';
import {MnEchartsServices} from '../../mn-echarts/mn-echarts.service';

@Injectable()
export class MnCommonServices {
    constructor(
        public _dynamicService: MnDynamicServices,
        public _i18nService: MnI18nServices,
        public _ruleService: MnRuleServices,
        public _reqService: MnReqServices,
        public _echartsService: MnEchartsServices
    ) {
    }
}
