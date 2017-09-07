import {Injectable} from '@angular/core';
import {DEFAULT_ECHART_OPTIONS, DEFAULT_ECHART_SERIES_OPTIONS} from './echarts.default.options';
import {COLORS_POOL} from './color-pool';

declare const mu: any;

@Injectable()
export class EchartsService {
    constructor() {
    }

    colorsMap: any = {};

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

    getEchartResult(type: string, data: any, setting: any = {}, $charts?: any, $mycharts?: any): any {
        const NAME = 'name';
        const X_VALUE = 'x';
        const Y_VALUE = 'value';
        const default_options = DEFAULT_ECHART_OPTIONS[type];
        let options: any = mu.clone(default_options);
        let _series_data: any, _x_axis: any, _legend: any;

        const type_setting: any = {
            pie: [
                '$module',
                'convert',
                'sort',
                '$series',
                'series_subtype',
                'series_selected',

                '$legend',
                'legend_show',
                'legend_position',
                'grid_position',
                'tooltip'
            ],

            wordCloud: [
                '$module',
                'data_cut',
                'convert',
                'sort',
                '$series',
                'series_transparent',
                // 'series_resize',

                '$legend',
                'legend_show',
                'legend_position',

                'grid_position',
                'tooltip'
            ],

            radar: [
                '$module',
                'convert',
                'sort',
                '$series',

                '$legend',
                'legend_show',
                'legend_position',

                'grid_position',
                'tooltip',

                'indicator'
            ],

            line: [
                '$module',
                'convert',
                'sort',
                '$series',
                'series_subtype',

                '$legend',
                'legend_show',
                'legend_position',

                '$xAxis',
                // 'xAxis_show_all',
                'xAxis_rotate',

                'yAxis_value_percent',
                'yAxis_percent_rate',
                'yAxis_zero',

                'grid_position',
                'tooltip',
                'xy_exchange'
            ],

            bar: [
                '$module',
                'convert',
                'sort',
                '$series',
                'series_subtype',

                '$legend',
                'legend_show',
                'legend_position',
                'tooltip',

                '$xAxis',
                // 'xAxis_show_all',
                'xAxis_rotate',

                'yAxis_value_percent',
                'yAxis_percent_rate',
                'yAxis_zero',

                'grid_position',

                'xy_exchange'
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
                setting.sort = true;
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
         * setting.sort
         * 数据排序
         *
         * @sort {boolean | string}
         * exp. sort = 'value:asc'
         */
        fn.sort = () => {
            // 排序
            mu.run(setting.module === 'single', () => {
                mu.run(setting.sort, (sortInfo) => {
                    sortInfo = mu.type(sortInfo, 'boolean') ? Y_VALUE : sortInfo;
                    const sortInfo_ = sortInfo.split(':');
                    const key = sortInfo_[0] || Y_VALUE;
                    const sort = sortInfo_[1] || 'desc';
                    data = data.sort((a, b) => {
                        return sort === 'desc' ? (b[key] - a[key]) : (a[key] - b[key]);
                    });
                });
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
             * SERIES 数据
             */
            switch (type) {
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
                        let rate = (len - sortMap[o.data.value] - 1) / len;
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
                options.grid.top = '2%';
                options.grid.bottom = '2%';
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
                    if (top === 'bottom') {
                        options.grid.top = 20;
                        options.grid.bottom = 60;
                        // todo 根据宽度 重新计算
                        mu.run(options.legend.data.length, (len) => {
                            options.grid.bottom = len > 6 ? 32 * (len / 6) : 32;
                        });
                    }
                });
            });
        };

        /**
         * setting.grid_position
         * 设置grid所在的位置
         */
        fn.grid_position = () => {
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

        /**
         * tooltip 设置
         * tooltip 默认显示
         */
        fn.tooltip = () => {
            const _tt = mu.ifnvl(setting.tooltip, true);
            options.tooltip = options.tooltip || {};
            options.tooltip.show = !!_tt;
            if (!mu.type(_tt, 'boolean') && options.tooltip.formatter) {
                options.tooltip.formatter = _tt;
            }
        };

        // -> 关键步骤
        // xAxis 处理
        fn.$xAxis = () => {
            /**
             * setting.module
             * 显示模式
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
                        _x_axis = options.xAxis[0].data = mu.map(mu.groupArray(data, X_VALUE), (o, x) => x, []);
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
            mu.run(setting.rotate, (rotate) => {
                options.xAxis[0].axisLabel.interval = 0;
                options.xAxis[0].axisLabel.rotate = rotate;
                // 默认数值
                options.grid.bottom = 50;
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
                    return value * 100 + '%';
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

        options = this.adjustECharOptions(options);

        /**
         * DateView 计算
         */

        const dataView = mu.run(() => {
            const _col_headers = mu.clone(_x_axis || _legend);
            _series_data = mu.clone(_series_data);

            const _dataView = mu.map(_series_data, (v, k) => {
                v = mu.map(v, (d) => mu.ifnvl(d.value, d));
                return [
                    k,
                    ...v
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
            options
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

    /**
     * 调整 echart 颜色 以及 legend 的样式
     * @param options
     */
    adjustECharOptions(options: any): any {
        const legend_colors = COLORS_POOL;
        const legend_color_map = this.colorsMap;

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
                options['color'] = mu.map(names, (name, index) => {
                    name = name.toLowerCase();
                    return legend_color_map[name] || mu.run(() => {
                        const color = legend_colors[index % legend_colors.length];
                        legend_color_map[name] = color;
                        return color;
                    });
                });
            });

        });

        return options;
    }

    percent_rate(options: any, data: any, fn: any): void {
        if (typeof fn !== 'function') {
            fn = mu.noop();
        }

        const totals = mu.map(mu.groupArray(data, 'x'), (o) => this.total(o, 'value'));
        options.series = mu.map(options.series, (o) => {
            o.data = mu.map(o.data, (d) => {
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
            formatter: (a) => {
                let x = '';
                const format = mu.map(a, (d) => {
                    const o = d.data;
                    x = o.x;
                    return `${o.name} : ${mu.format(o.v)} (${o.percent})`;
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
    transpose(arr: any[]): any[] {
        return mu.map(arr[0], (v, i) => {
            return mu.map(arr, (items) => {
                return items[i];
            });
        });
    }

}
