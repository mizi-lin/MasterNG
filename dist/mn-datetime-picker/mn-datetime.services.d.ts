export declare class MnDatetimeServices {
    constructor();
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
}
