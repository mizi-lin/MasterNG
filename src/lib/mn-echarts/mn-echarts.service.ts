import {Injectable} from '@angular/core';
import {DEFAULT_ECHART_OPTIONS, DEFAULT_ECHART_SERIES_OPTIONS} from './echarts.default.options';
import {COLORS_POOL} from './color-pool';

import  mu from 'mzmu';

@Injectable()
export class MnEchartsServices {
    constructor() {
    }

    _colors_map: any = {};

    // 外部配置匹配颜色
    setColorsMap(colors_map: any = {}) {
        this._colors_map = colors_map;
    }

    _colors: any;

    setColors(colors: any = []) {
        this._colors = colors;
    }

    _config: any = {
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

    setConfig(config: any = {}) {
        this._config = mu.extend(this._config, config);
    }

    getConfig(): any {
        return this._config;
    }

    /**
     *
     * @param arr
     * @param key
     * @return {any}
     */
    pick(arr: any, key: string): any {
        return mu.map(arr, (o) => {
            return mu.prop(o, key);
        });
    }

    /**
     * 计算数组中某项的的总数
     * @param arr
     * @param key
     * @return {number}
     */
    total(arr: any[], key: string): any {
        const items = this.pick(arr, key);
        let total = 0;
        mu.each(items, (o) => {
            total = total + (+o);
        });
        return total;
    }

    division(src, target) {
        return !target ? 0 : (src / target);
    }

    getEchartResult(type: string, data: any = [], setting: any = {}, $charts?: any, $mycharts?: any): any {
        const NAME = 'name';
        const X_VALUE = 'x';
        const Y_VALUE = 'value';
        const default_options = DEFAULT_ECHART_OPTIONS[type];
        const source = mu.clone(data);
        let options: any = mu.clone(default_options);
        let _series_data: any, _x_axis: any, _legend: any;

        // 空数据处理
        if (mu.isEmpty(data)) {
            return {};
        }

        /**
         * 校验各options项
         */
        mu.run(() => {
            options.title = options.title || {};
            options.legend = options.legend || {};
            options.grid = options.grid || {};
            options.tooltip = options.tooltip || {};
        });

        const type_setting: any = {
            pie: [
                '$module',
                'convert',
                'percent_rate_calc',
                'data_sort',
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
                'percent_rate_calc',
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
                'percent_rate_calc',
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
                'percent_rate_calc',
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
                'xy_exchange',

                'tooltip',
                'grid_position'
            ],

            bar: [
                '$module',
                'convert',
                'percent_rate_calc',
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

                'xy_exchange',

                'tooltip',
                'grid_position'
            ],

            map: [
                '$module',
                'convert',
                '$series',
                'map_label',
                'tooltip',
                'grid_position'
            ]

        };

        const fn: any = {};

        /**
         * 每个 module type 的初始值配置
         */
        fn.$module = () => {
            mu.run(mu.or(type, 'pie'), () => {
                setting.module = 'single';
                setting.subtype = mu.ifempty(setting.subtype, 'disc');
            });

            mu.run(mu.or(type, 'wordCloud'), () => {
                setting.module = 'single';
                setting.subtype = 'cloud';
            });
        };

        /**
         * data_cut
         * 数据截取长度
         * wordCloud
         */
        fn.data_cut = () => {
            mu.run(mu.prop($charts, 'clientWidth'), (width) => {
                const len: number = data.length;
                let count = Math.ceil(width * setting.rate);
                count = len > count ? count : len;
                data = data.slice(0, count);
            });
        };

        /**
         * setting.convert
         * 按照规则转换数据,
         * 假设数据层级固定
         */
        fn.convert = () => {
            data = this.convert(data, setting.convert);
        };

        /**
         * 按组数值计算百分比，总数等
         */
        fn.percent_rate_calc = () => {
            /**
             * 预先计算分组数值
             */
            mu.run(mu.groupArray(data, 'x'), (xs) => {
                const totals = mu.map(xs, (o) => this.total(o, 'value'));
                mu.each(data, (o) => {
                    o._old_value = o.value;
                    o._total = totals[o.x];
                    o._rate = this.division(o._old_value, o._total);
                    o._percent = mu.format(Math.abs(o._rate), '::2');
                });
            });
        };

        // 对原始数据按照value进行排序
        fn.data_sort = () => {
            data = data.sort((a, b) => {
                if (setting.data_sort === 'asc') {
                    return a.value > b.value ? 1 : -1;
                } else {
                    return a.value > b.value ? -1 : 1;
                }
            });
        };

        // -> 关键步骤
        // series 处理
        fn.$series = () => {
            mu.run(setting.module, (module) => {
                switch (module) {
                    case 'single':
                        _series_data = {
                            [setting.single_name]: data
                        };
                        break;
                    case 'group':
                    case 'mix':
                        _series_data = mu.groupArray(data, NAME);
                        break;
                }
            });

            /**
             * 对数据进行排序
             */
            mu.run(setting.sort, (info) => {

                let [legend, sort] = info.split(':');
                legend = mu.trim(legend || setting.single_name);
                sort = mu.trim(sort || 'desc');

                let sort_data = mu.clone(_series_data[legend]);

                sort_data = sort_data.sort((a, b) => {
                    if (setting.sort_all) {
                        return sort === 'desc' ? (b._total - a._total) : (a._total - b._total);
                    }

                    if (setting.yAxis_value_percent) {
                        return sort === 'desc' ? (b._rate - a._rate) : (a._rate - b._rate);
                    } else {
                        return sort === 'desc' ? (b.value - a.value) : (a.value - b.value);
                    }
                });

                let series_data = mu.map(_series_data, (data, legend) => {
                    data = mu.map(data, (d) => ({
                        __key__: d['x'],
                        __val__: d
                    }), {});

                    return data;
                });

                _series_data = mu.map(_series_data, (data, legend) => {
                    mu.each(sort_data, (sd, i) => {
                        data[i] = series_data[legend][sd.x];
                    });

                    return data;
                });

                /**
                 * sort
                 * 关联设置
                 */

                if (!setting.sort_all) {
                    // 修改 legend 的显示状态
                    options.legend.selected = {
                        [legend]: true
                    };
                }
            });

            /**
             * SERIES 数据
             */
            switch (type) {
                case 'map':
                    let _data = mu.map(_series_data, (o, name) => {
                        return {
                            name: name,
                            value: (mu.map(o, oo => oo.value, []) || [])[0],
                        };
                    }, []);

                    options.series[0].data = _data;

                    /**
                     * 地图区域值设置最大最小值
                     */
                    options.visualMap = options.visualMap || {};
                    let _ds = mu.map(_data, o => o.value || 0);
                    options.visualMap.max = Math.max(..._ds);
                    break;
                case 'radar':
                    options.series[0].data = mu.map(_series_data, (o, name) => {
                        return {
                            name: name,
                            value: mu.map(o, oo => oo.value, []),
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

                    options.series = mu.map(_series_data, (o, name) => {
                        const series = {
                            name,
                            type: type,
                            data: o
                        };

                        // stack
                        mu.run(setting.stack, (stack) => {
                            series['stack'] = stack;
                        });

                        // area
                        mu.run(setting.area, (opts) => {
                            const areaStyle = {
                                show: true,
                                normal: {}
                            };
                            series['areaStyle'] = mu.isObject(opts) ? mu.extend(areaStyle, opts) : areaStyle;
                            series['areaStyle'].show = true;
                        }, () => {
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
        fn.series_subtype = () => {
            const subtype = `${type}::${setting.subtype}`;
            const series_options = DEFAULT_ECHART_SERIES_OPTIONS[subtype] || {};
            options.series[0] = mu.extend({}, options.series[0], series_options);
        };

        fn.series_selected = () => {
            mu.run(setting['selected'], (index) => {
                index = index - 1;
                if (index < options.series[0].data.length) {
                    options.series[0].data[index].selected = true;
                }
            });
        };

        fn.series_transparent = () => {
            /**
             * 透明度计算, 计算排序
             * @type {number}
             */
            let pVal: number, sort: number, len = data.length;
            len = len < 250 ? 250 : len;
            const sortMap = mu.map(mu.map(data, (o) => {
                return o.value;
            }).sort((a, b) => {
                return b - a;
            }), (o, i) => {
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
                    color: (o: any) => {
                        let color: string;
                        const colorArr = COLORS_POOL, colorArr_len = colorArr.length;
                        let rate = this.division((len - sortMap[o.data.value] - 1), len);
                        const index = mu.randomInt(0, colorArr_len - 1);
                        rate = rate < 0.1 ? 0.1 : rate;
                        color = colorArr[index];
                        color = color.replace(/\d{0,}[.]\d{1,}\)$/, rate + ')');
                        return color;
                    }
                }
            };
        };

        // todo
        fn.series_resize = () => {
            mu.run($charts.clientWidth, (width) => {
                options.series[0].width = width;
            });

            mu.run($charts.clientHeight, (height) => {
                options.series[0].height = height;
            });
        };

        fn.$legend = () => {
            /**
             * legend.data
             * 颜色配置根据 legend.data 配置, 所以legend.data值必须设置
             */
            mu.run(type === 'pie', () => {
                _legend = options.legend.data = mu.map(data, (o, name) => o.name, []);
            }, () => {
                _legend = options.legend.data = mu.map(_series_data, (o, name) => name, []);
            });

            /**
             * sort
             * 关联设置
             */
            mu.run(setting.sort && !setting.sort_all, () => {
                const selected = mu.map(_legend, (l) => ({
                    __key__: l,
                    __val__: false
                }), {});

                options.legend.selected = mu.extend(selected, options.legend.selected);
            });
        };

        fn.legend_show = () => {
            /**
             * setting.legend_show
             * 设置 legend.show 是否显示
             */
            mu.run(setting.legend_show, () => {
                options.legend.show = true;
            }, () => {
                options.legend.show = false;
            });

        };

        /**
         * setting.legend_position
         * 设置legend所在的位置
         */
        fn.legend_position = () => {
            mu.run(setting.legend_position, (ps) => {
                const [left, top] = mu.trim(ps).replace(/\s{1,}/gi, ' ').split(' ');
                mu.run(left, () => options.legend.left = left);
                mu.run(top, () => {
                    options.legend.top = top;
                });
            });
        };

        fn.map_label = () => {
            mu.exist(mu.prop(options, 'geo.label.normal.show'), () => {
                options.geo.label.normal.show = !!setting.map_label;
            });
        };

        /**
         * tooltip 设置
         * tooltip 默认显示
         */
        fn.tooltip = () => {
            const _tt = mu.ifnvl(setting.tooltip, true);
            options.tooltip = options.tooltip || {};
            options.tooltip.show = !!_tt;
            options.tooltip.confine = true;

            if (!mu.type(_tt, 'boolean')) {
                options.tooltip.formatter = _tt;
            }
        };

        // -> 关键步骤
        // xAxis 处理
        fn.$xAxis = () => {
            /**
             * setting.module
             * 显示模式
             *
             * todo 修改 xAxis 获得值方法
             */
            mu.run(setting.module, (module) => {
                switch (module) {
                    case 'single':
                        // single name set
                        mu.empty(setting.single_name, () => {
                            setting.single_name = mu.prop(data, '0.name') || '';
                        }, () => {
                            setting.single_name = typeof setting.single_name === 'function'
                                ? setting.single_name(data)
                                : setting.single_name;
                        });

                        _x_axis = options.xAxis[0].data = mu.map(data, (o, x) => o[X_VALUE], []);

                        break;
                    case 'group':
                    case 'mix':
                        _x_axis = options.xAxis[0].data = mu.map(options.series[0].data, (o) => o.x, []);
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

        fn.xAxis_rotate = () => {
            mu.exist(setting.rotate, (rotate) => {
                options.xAxis[0].axisLabel.rotate = rotate;
                options.xAxis[0].axisLabel.interval = rotate ? 0 : 'auto';
            });
        };

        fn.xAxis_interval = () => {
            mu.exist(setting.interval, (interval) => {
                options.xAxis[0].axisLabel.interval = interval;
            });
        };

        fn.dataZoom = () => {
            mu.run(setting.dataZoom, (dataZoom) => {
                const _dataZoom = mu.or(mu.type(dataZoom), 'object', 'array') ? dataZoom : dataZoom ? [
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

                mu.run(_dataZoom, () => {
                    options.dataZoom = _dataZoom;
                });

            });
        };

        fn.yAxis_value_percent = () => {
            /**
             * setting.yAxis_value_percen
             * 将y轴的值改为百分比显示
             */
            mu.run(setting.yAxis_value_percent, () => {
                options.yAxis[0].axisLabel = options.yAxis.axisLabel || {};
                options.yAxis[0].axisLabel.formatter = (value, index) => {
                    return mu.format(value, '::2');
                };
            }, () => {
                options.yAxis[0].axisLabel = options.yAxis.axisLabel || {};
                options.yAxis[0].axisLabel.formatter = (value, index) => {
                    return value;
                };
            });
        };

        /**
         * percent_rate
         * 将数据转给纵向计算百分比
         * 并修改tooltip(显示原值)
         */
        fn.yAxis_percent_rate = () => {
            mu.if(setting.percent_rate, (fn) => {
                this.percent_rate(options, data, fn);
            });

            /**
             * fixed echart bug
             * echart 使用 setOptions 切换 Option 时
             * 会莫名其妙的继承上次Option tooltip 中的 formatter 值
             */
            mu.exist(setting.percent_rate, () => {
                if (!setting.percent_rate) {
                    options.tooltip.formatter = void 0;
                }
            });
        };

        fn.yAxis_zero = () => {
            mu.exist(setting.zero, (zero) => {
                options.yAxis[0].scale = zero;
            });
        };

        fn.xy_exchange = () => {
            /**
             * setting.xy_exchange
             * xy轴互换数据
             */
            mu.run(setting.xy_exchange, () => {
                const xAxis = options.xAxis;
                const yAxis = options.yAxis;

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
        fn.indicator = () => {
            options['radar'].indicator = mu.map(mu.groupArray(data, X_VALUE), (o, name) => {
                const vals_ = mu.map(mu.pick(o, 'value') || [0], (o) => o.value);
                const max_ = Math.max(...vals_) || 0;
                const min_ = Math.min(...vals_) || 0;
                let min = Math.ceil(min_ * 0.8);
                min = min > 10 ? min : 0;
                let max = Math.ceil(max_ + (max_ - min_) / 10);
                // 最大值不能等于最小值;
                max = max === min ? max + 1 : max;
                return {
                    name,
                    max,
                    min
                };
            }, []);

            _x_axis = mu.map(options['radar'].indicator, o => o.name);

        };

        /**
         * setting.grid_position
         * 重新计算grid边界
         * 设置grid所在的位置
         */
        fn.grid_position = () => {

            options.grid = options.grid || {};

            const BIG = 64;
            const BOTTOM_SMALL = 32;
            const TOP_SMALL = 16;

            // 1. legend 隐藏;
            // 2. legend 显示，根据legend显示方位，显示上下边距
            // 3. rotate > 0 时，bottom = BIG;
            mu.run(mu.prop(options, 'legend.show'), () => {
                // legend 显示，根据legend显示方位，显示上下边距
                const orient = mu.ifnvl(mu.prop(options, 'legend.orient'), 'horizontal');
                const top = mu.ifnvl(mu.prop(options, 'legend.top'), 'top');
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
            }, () => {
                // legend 隐藏, top = bottom = SMALL;
                options.grid.top = TOP_SMALL;
                options.grid.bottom = BOTTOM_SMALL;
            });

            // rotate > 0 时，bottom = BIG;
            mu.run(mu.prop(options, 'xAxis.0.axisLabel.rotate'), (rotate) => {
                options.grid.bottom = options.grid.bottom + 24;
            }, () => {
                options.grid.bottom = options.grid.bottom - 24;
            });

            const [top, right, bottom, left] = (setting.grid_position || '').replace(/\s{1,}/gi, ' ').split(' ');
            const ps = {
                top: mu.ifnvl(setting.grid_position_top, top),
                right: mu.ifnvl(setting.grid_position_right, right),
                bottom: mu.ifnvl(setting.grid_position_bottom, mu.ifnvl(bottom, top)),
                left: mu.ifnvl(setting.grid_position_left, mu.ifnvl(left, right))
            };

            mu.each(ps, (v, p) => {
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
        mu.each(type_setting[type], (key, index) => {
            mu.run(fn[key], (_fn) => {
                _fn();
            });
        });

        // type === 'radar' && console.debug(JSON.stringify(options));

        options = this.adjustOptionsWithColors(options);

        // console.debug('::::::::', options);

        /**
         * DataView 计算
         */

        const dataView = mu.run(() => {
            let _col_headers = mu.clone(_x_axis);
            _series_data = mu.clone(_series_data);

            // not xAxis
            mu.empty(_col_headers, () => {
                _col_headers = mu.map(_series_data, (v, k) => {
                    return mu.map(v, (d) => mu.ifnvl(d.name, d));
                }, []);

                _col_headers = (_col_headers || [])[0];
            });

            const _dataView = mu.map(_series_data, (v, k) => {
                const v_ = mu.map(v, (d) => mu.ifnvl(d.value, d));
                return [
                    k,
                    ...v_
                ];
            }, []);

            mu.run(_col_headers, (_ch) => {
                _ch.unshift('');
                _dataView.unshift(_ch);
            });

            return this.transpose(_dataView);
        });

        return {
            // echart 数据视图
            dataView,
            // echart options
            options,
            // data source
            source
        };
    }

    /**
     * 数据根据规则转换
     * @param data
     * @param convert
     * @return {any[]}
     */
    convert(data: any[], convert?: any): any[] {
        if (!convert) {
            return data;
        }

        if (mu.isFunction(convert)) {
            return mu.map(data, (o, index) => {
                return convert(o, index);
            });
        }

        return mu.map(data, (o, index) => {
            mu.each(convert, (rule) => {
                const src = mu.trim(rule.split('-:>')[0]);
                const tar = mu.trim(rule.split('-:>')[1]);
                o[tar] = mu.prop(o, src);
            });
            // o['__convert__'] = convert;
            return o;
        });
    }

    percent_rate(options: any, data: any, fn: any): void {

        if (typeof fn !== 'function') {
            fn = mu.noop();
        }

        options.series = mu.map(options.series, (o) => {
            o.data = mu.map(o.data, (d) => {
                d.value = d._rate;
                d.percent = d._percent;
                d = mu.isFunction(fn) ? fn.call(null, d) : d;
                return d;
            });
            return o;
        });

        options.tooltip = {
            trigger: 'axis',
            formatter: (a) => {
                let x = '';
                const format = mu.map(a, (d) => {
                    const o = d.data;
                    x = o.x;
                    return `${o.name} : ${mu.format(o._old_value)} (${o.percent})`;
                });

                return x + '<br />' + format.join('<br />');
            }
        };
    }

    /**
     * 顺时针旋转90°多维数组
     * @param {any[]} arr
     * @return {any[]}
     */
    transpose(arr: any[] = []): any[] {
        return mu.map(arr[0], (v, i) => {
            return mu.map(arr, (items) => {
                return items[i];
            });
        });
    }

    morphArray(o: any, def: any, def2?: any): any[] {
        if (mu.type(o) !== 'array') {
            return [def, o || def2];
        }

        return o;
    }

    /**
     * 调整 echart 颜色 以及 legend 的样式
     * @param options
     */
    adjustOptionsWithColors(options: any): any {
        const colors = mu.ifempty(this._colors, COLORS_POOL);
        const color_map = this._colors_map;
        const getColor = (index, name_map) => {
            let color = colors[index % colors.length];

            // 颜色值是否使用过
            let use = false;

            // 索引值大于颜色值长度，
            // 默认认为该颜色值列表也遍历过一次
            // 标明颜色值已用完
            if (index >= colors.length) {
                // todo 修改颜色透明度
                return color;
            }

            // 遍历颜色是否使用过
            mu.each(color_map, (color_, name_) => {
                // 颜色值被使用过
                if (color_ === color && name_map[name_]) {
                    use = true;
                    return false;
                }
            });

            if (use) {
                return getColor(index + 1, name_map);
            }

            return color;
        };

        /**
         * Echart Map Only
         */
        // mu.run(mu.prop(options, 'visualMap.inRange.color'), () => {
        //     options.visualMap.inRange.color = ['#fff', ...colors.slice(0, 5)];
        // });

        /**
         * 固定Legend样式
         */
        mu.run(mu.prop(options, 'legend.data'), (data: any[]) => {
            const names: string[] = [];
            options.legend.data = mu.map(data, (o) => {
                if (mu.isObject(o)) {
                    o.icon = 'roundRect';
                } else {
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
            mu.run(names, () => {
                const name_map = mu.map(names, (name, index) => {
                    return {
                        __key__: name,
                        __val__: index + 1
                    };
                }, {});
                options['color'] = mu.map(names, (name, index) => {
                    return color_map[name] || mu.run(() => {
                        const color = getColor(index, name_map);
                        color_map[name] = color;
                        // console.log(`%c ${color}`, `background: ${color}; color: #f00`)
                        return color;
                    });
                });
            });

        });



        return options;
    }

    /**
     * 调整legend显示/隐藏图表主体位置
     * 调整legend的个数对图表主体位置的影响
     */
    adjustOptionsWithLegend(options: any, _width: number, _height: number): any {
        const type = mu.prop(options, 'series.0.type');
        let old_radius, old_center;

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

        mu.run(mu.prop(options, 'legend.show'), () => {
            // legend 显示，根据legend显示方位，显示上下边距
            const orient = mu.ifnvl(mu.prop(options, 'legend.orient'), 'horizontal');
            const top = mu.ifnvl(mu.prop(options, 'legend.top'), 'top');
            const legend = mu.map(mu.prop(options, 'legend.data'), o => o.name || o);
            // 默认一个legend的图标占9个字符
            // 获得legend的总长度
            const size = (legend.length * 9) + legend.join(',').length;
            // 默认一个字符宽度大概为7px
            // 计算legend有多少行
            const h = Math.ceil(this.division((size * 7), _width));
            // 默认legend的间距大概为2.5行
            // 默认每行行高16px(font size 12px)
            const height = 16 * (h + 2.5);

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

                const y = mu.format((1 + height / _height) / 2, '::');
                const radius_ = mu.format(0.75 - height / _height / 2.5, '::');

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
        }, () => {
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
    }

}
