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
    mndate(date: string | number | any, dateType?: string): any;
}
