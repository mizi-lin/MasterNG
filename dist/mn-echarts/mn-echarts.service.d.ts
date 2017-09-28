export declare class MnEchartsService {
    constructor();
    _colors_map: any;
    setColorsMap(colors_map?: any): void;
    _colors: any;
    setColors(colors?: any): void;
    _config: any;
    setConfig(config?: any): void;
    getConfig(): any;
    /**
     *
     * @param arr
     * @param key
     * @return {any}
     */
    pick(arr: any, key: string): any;
    /**
     * 计算数组中某项的的总数
     * @param arr
     * @param key
     * @return {number}
     */
    total(arr: any[], key: string): any;
    getEchartResult(type: string, data: any, setting?: any, $charts?: any, $mycharts?: any): any;
    /**
     * 数据根据规则转换
     * @param data
     * @param convert
     * @return {any[]}
     */
    convert(data: any[], convert?: any): any[];
    percent_rate(options: any, data: any, fn: any): void;
    /**
     * 顺时针旋转90°多维数组
     * @param {any[]} arr
     * @return {any[]}
     */
    transpose(arr: any[]): any[];
    morphArray(o: any, def: any, def2?: any): any[];
    /**
     * 调整 echart 颜色 以及 legend 的样式
     * @param options
     */
    adjustOptionsWithColors(options: any): any;
    /**
     * 调整legend显示/隐藏图表主体位置
     * 调整legend的个数对图表主体位置的影响
     */
    adjustOptionsWithLegend(options: any, _width: number, _height: number): any;
}
