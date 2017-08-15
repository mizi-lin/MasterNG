declare const mu: any;
export const DEFAULT_ECHART_OPTIONS = {
    line: {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        legend: {
            data: []
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                boundaryGap: false,
                silent: false,
                axisLine: {onZero: true},
                axisLabel: {},
                splitArea: {show: false},
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: ['#eee']
                    }
                },
                data: []
            }
        ],
        yAxis: [
            {
                type: 'value',
                boundaryGap: false,
                scale: true,
                // axisLine: {show: false},
                // axisLabel: {show: false},
                // axisTick: {show: false},
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#eee']
                    }
                }
                // splitArea: {show: false}
            }
        ],
        series: []
    },
    bar: {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        legend: {
            data: []
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                boundaryGap: true,
                silent: false,
                axisLine: {onZero: true},
                axisLabel: {},
                splitArea: {show: false},
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: ['#eee']
                    }
                },
                data: []
            }
        ],
        yAxis: [
            {
                type: 'value',
                boundaryGap: false,
                scale: true,
                // axisLine: {show: false},
                // axisLabel: {show: false},
                // axisTick: {show: false},
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#eee']
                    }
                }
                // splitArea: {show: false}
            }
        ],
        series: []
    },

    pie: {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'item',
            // formatter: '{b} : {c} ({d}%)',
            formatter: (o) => {
                return `${o.name} : ${mu.format(o.value)} (${o.percent}%)`;
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        legend: {
            data: []
        },
        series: []
    },

    wordCloud: {
        tooltip: {
            show: true
        },
        legend: {
            data: []
        },
        series: []
    },

    radar: {
        legend: {
            show: true
        },
        radar: {
            // shape: 'circle',
            splitNumber: 5,
            center: [
                '50%',
                '50%'
            ],

            indicator: []
        },
        series: [
            {
                type: 'radar',
                data: []
            }
        ]
    }
};

export const DEFAULT_ECHART_SERIES_OPTIONS = {

    'pie::annular': {
        type: 'pie',
        avoidLabelOverlap: false,
        selectedMode: 'single',
        selectedOffset: 8,
        minAngle: 2,
        stillShowZeroSum: false,
        tooltip: {
            show: false
        },
        itemStyle: {
            normal: {
                'borderColor': '#fff',
                'borderWidth': '1'
            }
        },
        radius: [
            '40%',
            '70%'
        ],
        label: {
            normal: {
                show: false,
                position: 'center'
            },
            emphasis: {
                show: true,
                // formatter: '{b}\n{c}\n{d}%',
                formatter: (o) => {
                    return `${o.name}\n${mu.format(o.value)}\n${o.percent}%`;
                },
                textStyle: {
                    fontSize: '16'
                }
            }
        }
    },

    'pie::disc': {
        type: 'pie',
        stillShowZeroSum: false,
        avoidLabelOverlap: true,
        selectedMode: 'single',
        selectedOffset: 8,
        minAngle: 2
    },

    'wordCloud::cloud': {
        type: 'wordCloud',
        gridSize: 8,
        sizeRange: [
            12,
            40
        ],
        rotationRange: [
            0,
            90
        ],

        autoSize: {
            enable: true,
            minSize: 14
        },

        // width: rst.width || 1500,
        // height: rst.height || 400,
        //
        // // rotationStep: 90,
        //
        // textStyle: {
        //     normal: {
        //         color: function (o: any): any {
        //             let color: string;
        //             let rate = (len - sortMap[o.data.value] - 1) / len;
        //             let index = getRandomInt(0, colorArr_len - 1);
        //             rate = rate < 0.1 ? 0.1 : rate;
        //             color = colorArr[index];
        //             color = color.replace(/\d{0,}[.]\d{1,}\)$/, rate + ')');
        //             return color;
        //         }
        //     }
        // },

        // Shape can be 'circle', 'cardioid', 'diamond', 'triangle-forward', 'triangle', 'pentagon', 'star'
        shape: 'circle',
        left: 'center',
        top: 'center'
    }

};
