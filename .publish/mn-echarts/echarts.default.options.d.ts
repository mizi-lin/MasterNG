export declare const DEFAULT_ECHART_OPTIONS: {
    line: {
        title: {
            text: string;
        };
        tooltip: {
            trigger: string;
        };
        grid: {
            left: string;
            right: string;
            bottom: string;
            containLabel: boolean;
        };
        legend: {
            data: any[];
        };
        xAxis: {
            type: string;
            axisTick: {
                alignWithLabel: boolean;
            };
            boundaryGap: boolean;
            silent: boolean;
            axisLine: {
                onZero: boolean;
            };
            axisLabel: {};
            splitArea: {
                show: boolean;
            };
            splitLine: {
                show: boolean;
                lineStyle: {
                    color: string[];
                };
            };
            data: any[];
        }[];
        yAxis: {
            type: string;
            boundaryGap: boolean;
            scale: boolean;
            splitLine: {
                show: boolean;
                lineStyle: {
                    color: string[];
                };
            };
        }[];
        series: any[];
    };
    bar: {
        title: {
            text: string;
        };
        tooltip: {
            trigger: string;
        };
        grid: {
            left: string;
            right: string;
            bottom: string;
            containLabel: boolean;
        };
        legend: {
            data: any[];
        };
        xAxis: {
            type: string;
            axisTick: {
                alignWithLabel: boolean;
            };
            boundaryGap: boolean;
            silent: boolean;
            axisLine: {
                onZero: boolean;
            };
            axisLabel: {};
            splitArea: {
                show: boolean;
            };
            splitLine: {
                show: boolean;
                lineStyle: {
                    color: string[];
                };
            };
            data: any[];
        }[];
        yAxis: {
            type: string;
            boundaryGap: boolean;
            scale: boolean;
            splitLine: {
                show: boolean;
                lineStyle: {
                    color: string[];
                };
            };
        }[];
        series: any[];
    };
    pie: {
        title: {
            text: string;
        };
        tooltip: {
            trigger: string;
            formatter: (o: any) => string;
        };
        grid: {
            left: string;
            right: string;
            bottom: string;
            containLabel: boolean;
        };
        legend: {
            data: any[];
        };
        series: any[];
    };
    wordCloud: {
        tooltip: {
            show: boolean;
        };
        legend: {
            data: any[];
        };
        series: any[];
    };
    map: {
        tooltip: {
            show: boolean;
            trigger: string;
        };
        legend: {
            data: any[];
        };
        visualMap: {
            min: number;
            max: number;
            left: string;
            top: string;
            text: string[];
            calculable: boolean;
            inRange: {
                color: string[];
            };
        };
        geo: {
            map: string;
            zoom: number;
            roam: boolean;
            label: {
                normal: {
                    show: boolean;
                    color: string;
                };
                emphasis: {
                    show: boolean;
                    color: string;
                };
            };
            itemStyle: {
                normal: {
                    areaColor: string;
                    borderColor: string;
                };
                emphasis: {
                    areaColor: string;
                };
            };
        };
        series: {
            type: string;
            mapType: string;
            geoIndex: number;
            label: {
                normal: {
                    show: boolean;
                };
                emphasis: {
                    show: boolean;
                };
            };
            data: any[];
        }[];
    };
    radar: {
        legend: {
            show: boolean;
        };
        grid: {
            left: string;
            right: string;
            bottom: string;
            containLabel: boolean;
        };
        radar: {
            splitNumber: number;
            center: string[];
            indicator: any[];
        };
        series: {
            type: string;
            data: any[];
        }[];
    };
};
export declare const DEFAULT_ECHART_SERIES_OPTIONS: {
    'pie::annular': {
        type: string;
        avoidLabelOverlap: boolean;
        selectedMode: string;
        selectedOffset: number;
        minAngle: number;
        stillShowZeroSum: boolean;
        tooltip: {
            show: boolean;
        };
        itemStyle: {
            normal: {
                'borderColor': string;
                'borderWidth': string;
            };
        };
        radius: string[];
        label: {
            normal: {
                show: boolean;
                position: string;
            };
            emphasis: {
                show: boolean;
                formatter: (o: any) => string;
                textStyle: {
                    fontSize: string;
                };
            };
        };
    };
    'pie::disc': {
        type: string;
        stillShowZeroSum: boolean;
        avoidLabelOverlap: boolean;
        selectedMode: string;
        selectedOffset: number;
        minAngle: number;
    };
    'wordCloud::cloud': {
        type: string;
        gridSize: number;
        sizeRange: number[];
        rotationRange: number[];
        autoSize: {
            enable: boolean;
            minSize: number;
        };
        shape: string;
        left: string;
        top: string;
    };
};
