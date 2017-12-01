"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_dynamic_component_service_1 = require("../../mn-dynamic/mn-dynamic-component.service");
var mn_i18n_services_1 = require("../../mn-i18n/mn-i18n.services");
var mn_rule_services_1 = require("../../mn-rule/mn-rule.services");
var mn_req_service_1 = require("../../mn-req/mn-req.service");
var mn_echarts_service_1 = require("../../mn-echarts/mn-echarts.service");
var MnCommonServices = (function () {
    function MnCommonServices(_dynamicService, _i18nService, _ruleService, _reqService, _echartsService) {
        this._dynamicService = _dynamicService;
        this._i18nService = _i18nService;
        this._ruleService = _ruleService;
        this._reqService = _reqService;
        this._echartsService = _echartsService;
    }
    MnCommonServices.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    MnCommonServices.ctorParameters = function () { return [
        { type: mn_dynamic_component_service_1.MnDynamicServices, },
        { type: mn_i18n_services_1.MnI18nServices, },
        { type: mn_rule_services_1.MnRuleServices, },
        { type: mn_req_service_1.MnReqServices, },
        { type: mn_echarts_service_1.MnEchartsServices, },
    ]; };
    return MnCommonServices;
}());
exports.MnCommonServices = MnCommonServices;
//# sourceMappingURL=mn-common.services.js.map