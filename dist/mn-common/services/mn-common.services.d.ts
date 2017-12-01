import { MnDynamicServices } from '../../mn-dynamic/mn-dynamic-component.service';
import { MnI18nServices } from '../../mn-i18n/mn-i18n.services';
import { MnRuleServices } from '../../mn-rule/mn-rule.services';
import { MnReqServices } from '../../mn-req/mn-req.service';
import { MnEchartsServices } from '../../mn-echarts/mn-echarts.service';
export declare class MnCommonServices {
    _dynamicService: MnDynamicServices;
    _i18nService: MnI18nServices;
    _ruleService: MnRuleServices;
    _reqService: MnReqServices;
    _echartsService: MnEchartsServices;
    constructor(_dynamicService: MnDynamicServices, _i18nService: MnI18nServices, _ruleService: MnRuleServices, _reqService: MnReqServices, _echartsService: MnEchartsServices);
}
