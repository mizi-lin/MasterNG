"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var echarts_default_options_1 = require("./echarts.default.options");
var color_pool_1 = require("./color-pool");
var MnEchartsService = (function () {
    function MnEchartsService() {
        this._colors_map = {};
        this._config = {
            // toolbar: boolean | string
            // string: simple, all, def
            toolbars: false,
            toggle_toolbar: false,
            line: ['download', 'data_view', 'sort', 'line', 'bar', 'exchange', 'rate', 'label_all', 'legend', 'reload', 'fullscreen'],
            bar: ['download', 'data_view', 'sort', 'line', 'bar', 'exchange', 'rate', 'label_all', 'legend', 'reload', 'fullscreen'],
            pie: ['download', 'data_view', 'legend', 'reload', 'fullscreen'],
            radar: ['download', 'data_view', 'legend', 'reload', 'fullscreen'],
            wordCloud: ['download', 'data_view', 'legend', 'reload', 'fullscreen']
        };
    }
    // 外部配置匹配颜色
    MnEchartsService.prototype.setColorsMap = function (colors_map) {
        if (colors_map === void 0) { colors_map = {}; }
        this._colors_map = colors_map;
    };
    MnEchartsService.prototype.setColors = function (colors) {
        if (colors === void 0) { colors = []; }
        this._colors = colors;
    };
    MnEchartsService.prototype.setConfig = function (config) {
        if (config === void 0) { config = {}; }
        this._config = mu.extend(this._config, config);
    };
    MnEchartsService.prototype.getConfig = function () {
        return this._config;
    };
    /**
     *
     * @param arr
     * @param key
     * @return {any}
     */
    MnEchartsService.prototype.pick = function (arr, key) {
        return mu.map(arr, function (o) {
            return mu.prop(o, key);
        });
    };
    /**
     * 计算数组中某项的的总数
     * @param arr
     * @param key
     * @return {number}
     */
    MnEchartsService.prototype.total = function (arr, key) {
        var items = this.pick(arr, key);
        var total = 0;
        mu.each(items, function (o) {
            total = total + (+o);
        });
        return total;
    };
    MnEchartsService.prototype.getEchartResult = function (type, data, setting, $charts, $mycharts) {
        var _this = this;
        if (setting === void 0) { setting = {}; }
        var NAME = 'name';
        var X_VALUE = 'x';
        var Y_VALUE = 'value';
        var default_options = echarts_default_options_1.DEFAULT_ECHART_OPTIONS[type];
        var source = mu.clone(data);
        var options = mu.clone(default_options);
        var _series_data, _x_axis, _legend;
        /**
         * 校验各options项
         */
        mu.run(function () {
            options.title = options.title || {};
            options.legend = options.legend || {};
            options.grid = options.grid || {};
            options.tooltip = options.tooltip || {};
        });
        var type_setting = {
            pie: [
                '$module',
                'convert',
                '$series',
                'series_sort',
                'series_subtype',
                'series_selected',
                '$legend',
                'legend_position',
                'legend_show',
                'grid_position',
                'tooltip'
            ],
            wordCloud: [
                '$module',
                'data_cut',
                'convert',
                '$series',
                'series_sort',
                'series_transparent',
                // 'series_resize',
                '$legend',
                'legend_position',
                'legend_show',
                'tooltip',
                'grid_position'
            ],
            radar: [
                '$module',
                'convert',
                'series_sort',
                '$series',
                '$legend',
                'legend_show',
                'legend_position',
                'tooltip',
                'indicator',
                'grid_position'
            ],
            line: [
                '$module',
                'convert',
                'series_sort',
                '$series',
                'series_subtype',
                '$legend',
                'legend_show',
                'legend_position',
                '$xAxis',
                // 'xAxis_show_all',
                'xAxis_rotate',
                'xAxis_interval',
                'yAxis_value_percent',
                'yAxis_percent_rate',
                'yAxis_zero',
                'dataZoom',
                'tooltip',
                'xy_exchange',
                'grid_position'
            ],
            bar: [
                '$module',
                'convert',
                'series_sort',
                '$series',
                'series_subtype',
                '$legend',
                'legend_show',
                'legend_position',
                'tooltip',
                '$xAxis',
                // 'xAxis_show_all',
                'xAxis_rotate',
                'xAxis_interval',
                'yAxis_value_percent',
                'yAxis_percent_rate',
                'yAxis_zero',
                'dataZoom',
                'xy_exchange',
                'grid_position'
            ]
        };
        var fn = {};
        /**
         * 每个 module type 的初始值配置
         */
        fn.$module = function () {
            mu.run(mu.or(type, 'pie'), function () {
                setting.module = 'single';
                setting.subtype = mu.ifempty(setting.subtype, 'disc');
            });
            mu.run(mu.or(type, 'wordCloud'), function () {
                setting.module = 'single';
                setting.subtype = 'cloud';
            });
        };
        /**
         * data_cut
         * 数据截取长度
         * wordCloud
         */
        fn.data_cut = function () {
            mu.run(mu.prop($charts, 'clientWidth'), function (width) {
                var len = data.length;
                var count = Math.ceil(width * setting.rate);
                count = len > count ? count : len;
                data = data.slice(0, count);
            });
        };
        /**
         * setting.convert
         * 按照规则转换数据,
         * 假设数据层级固定
         */
        fn.convert = function () {
            data = _this.convert(data, setting.convert);
        };
        /**
         * setting.sort
         * 数据排序
         *
         * @sort {boolean | string}
         * exp. sort = 'value:asc'
         */
        // fn.sort = () => {
        //     // 排序
        //     mu.run(setting.module !== 'single', () => {
        //         mu.run(setting.sort, (sortInfo) => {
        //             sortInfo = mu.type(sortInfo, 'boolean') ? Y_VALUE : sortInfo;
        //             const sortInfo_ = sortInfo.split(':');
        //             const key = sortInfo_[0] || Y_VALUE;
        //             const sort = sortInfo_[1] || 'desc';
        //             data = data.sort((a, b) => {
        //                 return sort === 'desc' ? (b[key] - a[key]) : (a[key] - b[key]);
        //             });
        //         });
        //     });
        //
        //     console.debug(mu.clone(data));
        // };
        // -> 关键步骤
        // series 处理
        fn.$series = function () {
            mu.run(setting.module, function (module) {
                switch (module) {
                    case 'single':
                        _series_data = (_a = {},
                            _a[setting.single_name] = data,
                            _a);
                        break;
                    case 'group':
                    case 'mix':
                        _series_data = mu.groupArray(data, NAME);
                        break;
                }
                var _a;
            });
            /**
             * 对数据进行排序
             */
            mu.run(setting.sort, function (info) {
                var _a = info.split(':'), legend = _a[0], sort = _a[1];
                legend = mu.trim(legend || setting.single_name);
                sort = mu.trim(sort || 'desc');
                var sort_data = mu.clone(_series_data[legend]);
                sort_data = sort_data.sort(function (a, b) {
                    return sort === 'desc' ? (b.value - a.value) : (a.value - b.value);
                });
                var series_data = mu.map(_series_data, function (data, legend) {
                    data = mu.map(data, function (d) { return ({
                        __key__: d['x'],
                        __val__: d
                    }); }, {});
                    return data;
                });
                _series_data = mu.map(_series_data, function (data, legend) {
                    mu.each(sort_data, function (sd, i) {
                        data[i] = series_data[legend][sd.x];
                    });
                    return data;
                });
                // 修改 legend 的显示状态
                options.legend.selected = (_b = {},
                    _b[legend] = true,
                    _b);
                var _b;
            });
            /**
             * SERIES 数据
             */
            switch (type) {
                case 'radar':
                    options.series[0].data = mu.map(_series_data, function (o, name) {
                        return {
                            name: name,
                            value: mu.map(o, function (oo) { return oo.value; }, []),
                            lineStyle: {
                                normal: {
                                    width: 2
                                }
                            },
                            symbol: 'none'
                        };
                    }, []);
                    break;
                default:
                    options.series = mu.map(_series_data, function (o, name) {
                        var series = {
                            name: name,
                            type: type,
                            data: o
                        };
                        // stack
                        mu.run(setting.stack, function (stack) {
                            series['stack'] = stack;
                        });
                        // area
                        mu.run(setting.area, function (opts) {
                            var areaStyle = {
                                show: true,
                                normal: {}
                            };
                            series['areaStyle'] = mu.isObject(opts) ? mu.extend(areaStyle, opts) : areaStyle;
                            series['areaStyle'].show = true;
                        }, function () {
                            series['areaStyle'] = {
                                show: false
                            };
                        });
                        // smooth
                        series['smooth'] = setting.smooth;
                        return series;
                    }, []);
                    break;
            }
        };
        /**
         * :::series:::
         */
        fn.series_subtype = function () {
            var subtype = type + "::" + setting.subtype;
            var series_options = echarts_default_options_1.DEFAULT_ECHART_SERIES_OPTIONS[subtype] || {};
            options.series[0] = mu.extend({}, options.series[0], series_options);
        };
        fn.series_selected = function () {
            mu.run(setting['selected'], function (index) {
                index = index - 1;
                if (index < options.series[0].data.length) {
                    options.series[0].data[index].selected = true;
                }
            });
        };
        fn.series_transparent = function () {
            /**
             * 透明度计算, 计算排序
             * @type {number}
             */
            var pVal, sort, len = data.length;
            len = len < 250 ? 250 : len;
            var sortMap = mu.map(mu.map(data, function (o) {
                return o.value;
            }).sort(function (a, b) {
                return b - a;
            }), function (o, i) {
                if (pVal !== o) {
                    pVal = o;
                    sort = i + 1;
                }
                return {
                    __key__: o + '',
                    __val__: sort
                };
            }, {});
            options.series[0].textStyle = {
                normal: {
                    color: function (o) {
                        var color;
                        var colorArr = color_pool_1.COLORS_POOL, colorArr_len = colorArr.length;
                        var rate = (len - sortMap[o.data.value] - 1) / len;
                        var index = mu.randomInt(0, colorArr_len - 1);
                        rate = rate < 0.1 ? 0.1 : rate;
                        color = colorArr[index];
                        color = color.replace(/\d{0,}[.]\d{1,}\)$/, rate + ')');
                        return color;
                    }
                }
            };
        };
        // todo
        fn.series_resize = function () {
            mu.run($charts.clientWidth, function (width) {
                options.series[0].width = width;
            });
            mu.run($charts.clientHeight, function (height) {
                options.series[0].height = height;
            });
        };
        fn.$legend = function () {
            /**
             * legend.data
             * 颜色配置根据 legend.data 配置, 所以legend.data值必须设置
             */
            mu.run(type === 'pie', function () {
                _legend = options.legend.data = mu.map(data, function (o, name) { return o.name; }, []);
            }, function () {
                _legend = options.legend.data = mu.map(_series_data, function (o, name) { return name; }, []);
            });
            /**
             * sort
             * 关联设置
             */
            mu.run(setting.sort, function () {
                var selected = mu.map(_legend, function (l) { return ({
                    __key__: l,
                    __val__: false
                }); }, {});
                options.legend.selected = mu.extend(selected, options.legend.selected);
            });
        };
        fn.legend_show = function () {
            /**
             * setting.legend_show
             * 设置 legend.show 是否显示
             */
            mu.run(setting.legend_show, function () {
                options.legend.show = true;
            }, function () {
                options.legend.show = false;
            });
        };
        /**
         * setting.legend_position
         * 设置legend所在的位置
         */
        fn.legend_position = function () {
            mu.run(setting.legend_position, function (ps) {
                var _a = mu.trim(ps).replace(/\s{1,}/gi, ' ').split(' '), left = _a[0], top = _a[1];
                mu.run(left, function () { return options.legend.left = left; });
                mu.run(top, function () {
                    options.legend.top = top;
                });
            });
        };
        /**
         * tooltip 设置
         * tooltip 默认显示
         */
        fn.tooltip = function () {
            var _tt = mu.ifnvl(setting.tooltip, true);
            options.tooltip = options.tooltip || {};
            options.tooltip.show = !!_tt;
            if (!mu.type(_tt, 'boolean') && options.tooltip.formatter) {
                options.tooltip.formatter = _tt;
            }
        };
        // -> 关键步骤
        // xAxis 处理
        fn.$xAxis = function () {
            /**
             * setting.module
             * 显示模式
             *
             * todo 修改 xAxis 获得值方法
             */
            mu.run(setting.module, function (module) {
                switch (module) {
                    case 'single':
                        // single name set
                        mu.empty(setting.single_name, function () {
                            setting.single_name = mu.prop(data, '0.name') || '';
                        }, function () {
                            setting.single_name = typeof setting.single_name === 'function'
                                ? setting.single_name(data)
                                : setting.single_name;
                        });
                        _x_axis = options.xAxis[0].data = mu.map(data, function (o, x) { return o[X_VALUE]; }, []);
                        break;
                    case 'group':
                    case 'mix':
                        _x_axis = options.xAxis[0].data = mu.map(options.series[0].data, function (o) { return o.x; }, []);
                        break;
                }
            });
        };
        /**
         * setting.xAxis_show_all
         * X轴显示所有axis
         */
        // fn.xAxis_show_all = () => {
        //     mu.run(setting.xAxis_show_all, () => {
        //         // 1. 设置 inverval = 0
        //         options.xAxis[0].axisLabel.interval = 0;
        //         // 2. 文本偶数行切换为换行(\n)
        //         mu.run(mu.prop(options, 'xAxis.0.data'), (data: any[]) => {
        //             options.xAxis[0]['data'] = mu.map(data, (o, index) => {
        //                 return index % 2 ? '\n' + o : o;
        //             });
        //         });
        //     });
        // };
        fn.xAxis_rotate = function () {
            mu.exist(setting.rotate, function (rotate) {
                options.xAxis[0].axisLabel.rotate = rotate;
                options.xAxis[0].axisLabel.interval = rotate ? 0 : 'auto';
            });
        };
        fn.xAxis_interval = function () {
            mu.exist(setting.interval, function (interval) {
                options.xAxis[0].axisLabel.interval = interval;
            });
        };
        fn.dataZoom = function () {
            mu.run(setting.dataZoom, function (dataZoom) {
                var _dataZoom = mu.or(mu.type(dataZoom), 'object', 'array') ? dataZoom : dataZoom ? [
                    {
                        'show': true,
                        'height': 30,
                        'xAxisIndex': [
                            0
                        ],
                        bottom: 0,
                        'start': 60,
                        'end': 100,
                    }
                ] : false;
                mu.run(_dataZoom, function () {
                    options.dataZoom = _dataZoom;
                });
            });
        };
        fn.yAxis_value_percent = function () {
            /**
             * setting.yAxis_value_percen
             * 将y轴的值改为百分比显示
             */
            mu.run(setting.yAxis_value_percent, function () {
                options.yAxis[0].axisLabel = options.yAxis.axisLabel || {};
                options.yAxis[0].axisLabel.formatter = function (value, index) {
                    return value * 100 + '%';
                };
            }, function () {
                options.yAxis[0].axisLabel = options.yAxis.axisLabel || {};
                options.yAxis[0].axisLabel.formatter = function (value, index) {
                    return value;
                };
            });
        };
        /**
         * percent_rate
         * 将数据转给纵向计算百分比
         * 并修改tooltip(显示原值)
         */
        fn.yAxis_percent_rate = function () {
            mu.if(setting.percent_rate, function (fn) {
                _this.percent_rate(options, data, fn);
            });
        };
        fn.yAxis_zero = function () {
            mu.exist(setting.zero, function (zero) {
                options.yAxis[0].scale = zero;
            });
        };
        fn.xy_exchange = function () {
            /**
             * setting.xy_exchange
             * xy轴互换数据
             */
            mu.run(setting.xy_exchange, function () {
                var xAxis = options.xAxis;
                var yAxis = options.yAxis;
                if (xAxis[0].type === 'category' && yAxis[0].type === 'value') {
                    options['xAxis'] = yAxis;
                    options['yAxis'] = xAxis;
                }
            });
        };
        /**
         * radar only
         *
         * indicator 其实就是 radar 的 xAxis
         */
        fn.indicator = function () {
            options['radar'].indicator = mu.map(mu.groupArray(data, X_VALUE), function (o, name) {
                var vals_ = mu.map(mu.pick(o, 'value') || [0], function (o) { return o.value; });
                var max_ = Math.max.apply(Math, vals_) || 0;
                var min_ = Math.min.apply(Math, vals_) || 0;
                var min = Math.ceil(min_ * 0.8);
                min = min > 10 ? min : 0;
                var max = Math.ceil(max_ + (max_ - min_) / 10);
                // 最大值不能等于最小值;
                max = max === min ? max + 1 : max;
                return {
                    name: name,
                    max: max,
                    min: min
                };
            }, []);
            _x_axis = mu.map(options['radar'].indicator, function (o) { return o.name; });
        };
        /**
         * setting.grid_position
         * 重新计算grid边界
         * 设置grid所在的位置
         */
        fn.grid_position = function () {
            options.grid = options.grid || {};
            var BIG = 64;
            var BOTTOM_SMALL = 32;
            var TOP_SMALL = 16;
            // 1. legend 隐藏;
            // 2. legend 显示，根据legend显示方位，显示上下边距
            // 3. rotate > 0 时，bottom = BIG;
            mu.run(mu.prop(options, 'legend.show'), function () {
                // legend 显示，根据legend显示方位，显示上下边距
                var orient = mu.ifnvl(mu.prop(options, 'legend.orient'), 'horizontal');
                var top = mu.ifnvl(mu.prop(options, 'legend.top'), 'top');
                if (orient === 'horizontal') {
                    if (top === 'top') {
                        options.grid.top = BIG;
                        options.grid.bottom = BOTTOM_SMALL;
                    }
                    if (top === 'bottom') {
                        options.grid.top = TOP_SMALL;
                        options.grid.bottom = BIG;
                    }
                }
            }, function () {
                // legend 隐藏, top = bottom = SMALL;
                options.grid.top = TOP_SMALL;
                options.grid.bottom = BOTTOM_SMALL;
            });
            // rotate > 0 时，bottom = BIG;
            mu.run(mu.prop(options, 'xAxis.0.axisLabel.rotate'), function (rotate) {
                options.grid.bottom = options.grid.bottom + 24;
            }, function () {
                options.grid.bottom = options.grid.bottom - 24;
            });
            var _a = (setting.grid_position || '').replace(/\s{1,}/gi, ' ').split(' '), top = _a[0], right = _a[1], bottom = _a[2], left = _a[3];
            var ps = {
                top: mu.ifnvl(setting.grid_position_top, top),
                right: mu.ifnvl(setting.grid_position_right, right),
                bottom: mu.ifnvl(setting.grid_position_bottom, mu.ifnvl(bottom, top)),
                left: mu.ifnvl(setting.grid_position_left, mu.ifnvl(left, right))
            };
            mu.each(ps, function (v, p) {
                if (mu.isExist(v) && v !== 'auto' && v !== '') {
                    options.grid[p] = v;
                }
            });
        };
        setting = mu.extend(true, {}, {
            /**
             * module
             * 图表显示模式
             * single: 单一
             * group: 群组
             * mix: 混合模式
             */
            module: 'group',
            /**
             * subtype
             * 主图的子类型图
             * 主要针对 series 的配置项不一样
             */
            subtype: '',
            /**
             * single_name
             * 当module === 'single'时, single 的名称
             * 默认为第一项的name
             */
            single_name: '',
            /**
             * pie.selected
             * 饼图, 默认选中的项
             */
            selected: 0,
            /**
             * wordCloud.transparent
             * 词云是否按透明度显示
             */
            transparent: true,
            /**
             * convert
             * 数据覆盖重写
             */
            convert: '',
            /**
             * sort
             * 将数据进行排序
             * @sort {boolean | string}
             */
            sort: false,
            /**
             * legend_show
             * 是否显示 legend
             */
            legend_show: true,
            /**
             * legend
             * legend 显示位置
             * 'left center right'
             * 'top middle bottom'
             */
            legend_position: '',
            grid_position: null,
            grid_position_top: null,
            grid_position_right: null,
            grid_position_bottom: null,
            grid_position_left: null,
            // -> X轴
            /**
             * xAxis_show_all
             * x 轴显示所有的类目, (使用 \n 切分)
             */
            // xAxis_show_all: false,
            rotate: 0,
            // -> X轴
            /**
             * yAxis_value_percent
             * y轴显示值改为百分比
             */
            yAxis_value_percent: false,
            xy_exchange: false,
            /**
             * series
             */
            /**
             * percent_rate
             * 将series_data纵向比较, 按百分比显示
             * percent_rate: fn (fn为回调函数)
             */
            percent_rate: false,
            /**
             * stack
             * 堆叠
             * @chart line, bar
             */
            stack: 'one',
            /**
             * area
             * 是否显示曲线面积
             * @chart line
             */
            area: true,
            /**
             * smooth
             * 曲线的柔和度
             * @chart line
             */
            smooth: true,
            /**
             * rate
             * 在词云中是 词的个数 / 屏幕宽度
             */
            rate: 200 / 1200
        }, setting);
        /**
         * 遍历执行各方法
         */
        mu.each(type_setting[type], function (key, index) {
            mu.run(fn[key], function (_fn) {
                _fn();
            });
        });
        // type === 'radar' && console.debug(JSON.stringify(options));
        options = this.adjustOptionsWithColors(options);
        /**
         * DataView 计算
         */
        var dataView = mu.run(function () {
            var _col_headers = mu.clone(_x_axis);
            _series_data = mu.clone(_series_data);
            // not xAxis
            mu.empty(_col_headers, function () {
                _col_headers = mu.map(_series_data, function (v, k) {
                    return mu.map(v, function (d) { return mu.ifnvl(d.name, d); });
                }, []);
                _col_headers = _col_headers[0];
            });
            var _dataView = mu.map(_series_data, function (v, k) {
                var v_ = mu.map(v, function (d) { return mu.ifnvl(d.value, d); });
                return [
                    k
                ].concat(v_);
            }, []);
            mu.run(_col_headers, function (_ch) {
                _ch.unshift('');
                _dataView.unshift(_ch);
            });
            return _this.transpose(_dataView);
        });
        return {
            // echart 数据视图
            dataView: dataView,
            // echart options
            options: options,
            // data source
            source: source
        };
    };
    /**
     * 数据根据规则转换
     * @param data
     * @param convert
     * @return {any[]}
     */
    MnEchartsService.prototype.convert = function (data, convert) {
        if (!convert) {
            return data;
        }
        if (mu.isFunction(convert)) {
            return mu.map(data, function (o, index) {
                return convert(o, index);
            });
        }
        return mu.map(data, function (o, index) {
            mu.each(convert, function (rule) {
                var src = mu.trim(rule.split('-:>')[0]);
                var tar = mu.trim(rule.split('-:>')[1]);
                o[tar] = mu.prop(o, src);
            });
            // o['__convert__'] = convert;
            return o;
        });
    };
    MnEchartsService.prototype.percent_rate = function (options, data, fn) {
        var _this = this;
        if (typeof fn !== 'function') {
            fn = mu.noop();
        }
        var totals = mu.map(mu.groupArray(data, 'x'), function (o) { return _this.total(o, 'value'); });
        options.series = mu.map(options.series, function (o) {
            o.data = mu.map(o.data, function (d) {
                d.v = d.value;
                d.value = d.value / totals[d.x];
                d.percent = mu.format(Math.abs(d.value), '::2');
                d = mu.isFunction(fn) ? fn.call(null, d) : d;
                return d;
            });
            return o;
        });
        options.tooltip = {
            trigger: 'axis',
            formatter: function (a) {
                var x = '';
                var format = mu.map(a, function (d) {
                    var o = d.data;
                    x = o.x;
                    return o.name + " : " + mu.format(o.v) + " (" + o.percent + ")";
                });
                return x + '<br />' + format.join('<br />');
            }
        };
    };
    /**
     * 顺时针旋转90°多维数组
     * @param {any[]} arr
     * @return {any[]}
     */
    MnEchartsService.prototype.transpose = function (arr) {
        return mu.map(arr[0], function (v, i) {
            return mu.map(arr, function (items) {
                return items[i];
            });
        });
    };
    MnEchartsService.prototype.morphArray = function (o, def, def2) {
        if (mu.type(o) !== 'array') {
            return [def, o || def2];
        }
        return o;
    };
    /**
     * 调整 echart 颜色 以及 legend 的样式
     * @param options
     */
    MnEchartsService.prototype.adjustOptionsWithColors = function (options) {
        var colors = mu.ifempty(this._colors, color_pool_1.COLORS_POOL);
        var color_map = this._colors_map;
        /**
         * 固定Legend样式
         */
        mu.run(mu.prop(options, 'legend.data'), function (data) {
            var names = [];
            options.legend.data = mu.map(data, function (o) {
                if (mu.isObject(o)) {
                    o.icon = 'roundRect';
                }
                else {
                    o = {
                        name: o,
                        icon: 'roundRect'
                    };
                }
                names.push(o.name);
                return o;
            });
            // legend 的颜色控制有 option.color 来控制
            // legend 的颜色控制着相对应的柱形图线形图等itemStyle的颜色
            // so, legend.data 必须存在
            mu.run(names, function () {
                options['color'] = mu.map(names, function (name, index) {
                    name = name.toLowerCase();
                    return color_map[name] || mu.run(function () {
                        var color = colors[index % colors.length];
                        color_map[name] = color;
                        return color;
                    });
                });
            });
        });
        return options;
    };
    /**
     * 调整legend显示/隐藏图表主体位置
     * 调整legend的个数对图表主体位置的影响
     */
    MnEchartsService.prototype.adjustOptionsWithLegend = function (options, _width, _height) {
        var type = mu.prop(options, 'series.0.type');
        var old_radius, old_center;
        // 获取原值
        switch (type) {
            case 'pie':
                old_radius = this.morphArray(mu.prop(options, 'series.0.radius'), '0%', '75%');
                old_center = this.morphArray(mu.prop(options, 'series.0.center'), '50%', '50%');
                break;
            case 'radar':
                old_radius = mu.ifnvl(mu.prop(options, 'series.0.radius'), '75%');
                old_center = this.morphArray(mu.prop(options, 'series.0.center'), '50%', '50%');
                break;
        }
        mu.run(mu.prop(options, 'legend.show'), function () {
            // legend 显示，根据legend显示方位，显示上下边距
            var orient = mu.ifnvl(mu.prop(options, 'legend.orient'), 'horizontal');
            var top = mu.ifnvl(mu.prop(options, 'legend.top'), 'top');
            var legend = mu.map(mu.prop(options, 'legend.data'), function (o) { return o.name || o; });
            // 默认一个legend的图标占9个字符
            // 获得legend的总长度
            var size = (legend.length * 9) + legend.join(',').length;
            // 默认一个字符宽度大概为7px
            // 计算legend有多少行
            var h = Math.ceil((size * 7) / _width);
            // 默认legend的间距大概为2.5行
            // 默认每行行高16px(font size 12px)
            var height = 16 * (h + 2.5);
            // 常规图标，主画布对 grid
            if (orient === 'horizontal') {
                if (top === 'top') {
                    options.grid.top = height;
                }
                if (top === 'bottom') {
                    options.grid.bottom = height;
                }
            }
            // pie, radar 等，主画布为 dom
            // center 图表的中心区域
            // radius 图表的半径
            if (mu.or(type, 'pie', 'radar')) {
                var y = mu.format((1 + height / _height) / 2, '::');
                var radius_ = mu.format(0.75 - height / _height / 2.5, '::');
                switch (type) {
                    case 'pie':
                        options.series[0].center = [old_center[0], y];
                        options.series[0].radius = [old_radius[0], radius_];
                        break;
                    case 'radar':
                        options.radar.center = [old_center[0], y];
                        options.radar.radius = radius_;
                        break;
                }
            }
        }, function () {
            switch (type) {
                case 'pie':
                    options.series[0].center = old_center;
                    options.series[0].radius = old_radius;
                    break;
                case 'radar':
                    options.radar.center = old_center;
                    options.radar.radius = old_radius;
                    break;
            }
        });
        return options;
    };
    return MnEchartsService;
}());
MnEchartsService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
MnEchartsService.ctorParameters = function () { return []; };
exports.MnEchartsService = MnEchartsService;
//# sourceMappingURL=mn-echarts.service.js.map