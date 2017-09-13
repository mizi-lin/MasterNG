export declare class EchartsService {
    constructor();
    colorsMap: any;
    GRID_TOP: number;
    GRID_BOTTOM: number;
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
    /**
     * 调整 echart 颜色 以及 legend 的样式
     * @param options
     */
    adjustECharOptions(options: any): any;
    percent_rate(options: any, data: any, fn: any): void;
    /**
     * 顺时针旋转90°多维数组
     * @param {any[]} arr
     * @return {any[]}
     */
    transpose(arr: any[]): any[];
}
