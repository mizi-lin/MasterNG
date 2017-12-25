import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export declare class MnDatetimeServices {
    constructor();
    date$: BehaviorSubject<any>;
    setDate(value: any): void;
    getRangeDate(rule: string): {
        startDate: any;
        endDate: any;
    };
    reStartDate(startDate: any, maxDate: any, minDate: any): any;
    reEndDate(endDate: any, maxDate: any, minDate: any): any;
    /**
     * 一个基于MasterNG的时间格式
     * @param {string | number | any} date
     * @param {string} dateType
     * @return {any}
     */
    /**
     * 获得当前时间的视图数据
     * @param _date
     * @param {string} view
     */
    getCalendar(_date: any, view: string): void;
    private getCalendarWithDays(_date);
    private getCalendarWithWeeks(_date);
    private getCalendarWithMonths(_date);
    private getCalendarWithQuarters(_date);
    private getCalendarWithYears(_date);
    /**
     * v2
     */
    /**
     * 根据当前视图比较两个时间
     * @param view
     * @param src
     * @param target
     *
     * @return 1 大于; 0: 等于; -1: 小于; 2 范围内; -2 有交集
     */
    compared(view: any, src: any, target: any): number;
    /**
     * 判断当前时间是否在时间范围之内
     * @param view
     * @param src
     * @param min
     * @param max
     * @return {number} 2 范围内，0 小于最小值， 1 大于最大值
     */
    range(view: any, src: any, min: any, max: any): number;
}
