import {InitializeService} from './initialize.service';
import {ResourcePool} from '../demo-req/resource-pool';
import {Observable} from 'rxjs/Observable';
import {MnCommonServices} from '../../lib/mn-common/services/mn-common.services';
import {DemoNodataComponent} from '../demo-nodata/demo-nodata.component';

export function InitializeFactory(_initServ: InitializeService,
                                  _rp: ResourcePool,
                                  _mcs: MnCommonServices) {
    return () => {

        /**
         * 系统初始化，获得相关信息
         */
        _initServ.initApp();

        // ************************************
        // _i18nService
        // 国际化配置

        /**
         * _i18nService.setConfig
         * 国际化相关信息配置
         */
        _mcs._i18nService.setConfig({
            lang: 'en',
            prefix: 'assets/i18n'
        });

        // ************************************
        // _reqService
        // 异步请求以及RESTFul设置

        /**
         * _reqService.setHeaders
         * Ajax请求头设置
         */
        _mcs._reqService.setHeaders([
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

        /**
         *  _mcs._reqService.reqCatch
         *  Ajax 返回状态非200/201状态错误处理
         */
        _mcs._reqService.reqCatch = ((error, caught, url) => {
            if (error.status === 401) {
                return Observable.empty();
            }
        });

        /**
         *  _mcs._reqService.reqError
         *  Ajax 状态错误处理
         */
        _mcs._reqService.reqError = ((error, url) => {
        });

        /**
         * _reqService.setResource
         * RESTFul资源设置
         */
        _mcs._reqService.setResources(_rp);

        /**
         * _reqService.setNoDataComponent
         * No Data Component 样式配置
         */
        _mcs._reqService.setNoDataComponent(DemoNodataComponent);

        /**
         * _reqService.setRestful
         * 设置response数据是否使用 restful 数据格式
         * restful 数据格式  { data: {} || [] }
         */
        _mcs._reqService.setRestful(true);

        // ************************************
        // _ruleService
        // 规则（Auth）配置

        /**
         * _ruleService.setRules
         * 设置系统规则(权限处理)
         */
        _mcs._ruleService.setRules({
            'aaa.bbb.ccc': true,
            'aaa.bbb.ddd': false,
            'aaa.bbb.eee': false,
            'aaa.bbb.fff': true
        });

        // ************************************
        // _echartsService
        // Echart配置

        /**
         * _echartsService.setConfig
         * Echart 部分功能配置
         */
        _mcs._echartsService.setConfig({
            toolbars: true,
            // toggle 默认隐藏，滑过显示
            // show 一直显示
            show_tools: 'toggle'
        });

        // ************************************
        // _dynamicService
        // 动态加载Component配置

        /**
         * _dynamicService.setComponentMap
         * 添加动态加载Component资源
         */
        _mcs._dynamicService.setComponentMap(DemoNodataComponent);

    };
}
