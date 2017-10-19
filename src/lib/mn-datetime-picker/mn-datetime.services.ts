import {Injectable} from '@angular/core';

declare const mu: any;

@Injectable()
export class MnDatetimeServices {

    constructor() {
    }

    getRangTimestamp(year: number, month?: number) {
        let d, start, end;
        return mu.run(month, () => {
            d = new Date(year, month - 1, 1, 0, 0, 0, 0);
            start = +d;
            d = new Date(year, month, 1, 0, 0, 0, 0);
            end = +d - 1;
            return {
                start,
                end
            };
        }, () => {
            d = new Date(year, 1, 1, 0, 0, 0, 0);
            start = +d;
            d = new Date(year + 1, 1, 1, 0, 0, 0, 0);
            end = +d - 1;
            return {
                start,
                end
            };
        });
    }
}
