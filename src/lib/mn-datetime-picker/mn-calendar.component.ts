import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

declare const mu: any;

@Component({
    selector: 'mn-calendar',
    template: `
        <mn-fill [hph]="false">
            <mn-col [span]="1">
                <button (click)="getPrevYear()">上一年</button>
                <button (click)="getPrevMonth()">上一月</button>
            </mn-col>
            <mn-col [span]="2">
                {{this._view.year}}-{{this._view.month}}
            </mn-col>
            <mn-col [span]="1">
                <button (click)="getNextMonth()">下一月</button>
                <button (click)="getNextYear()">下一年</button>
            </mn-col>
        </mn-fill>
        <mn-calendar-view
                [year]="_year"
                [month]="_month"
                [day]="23"
                [min]="'2017-09-12'"
                [max]="'2017-12-09'"
                (result)="getView($event)">
        </mn-calendar-view>
    `
})
export class MnCalendarComponent implements OnInit, OnChanges {

    @Input() year: number;
    @Input() month: number;
    @Input() day: number = 1;

    _year: number;
    _month: number;

    _current = new Date();
    _view: any;

    constructor() {

        console.debug(!(this.year && this.month), this.year, this.month);

        mu.run(!(this.year && this.month), () => {
            console.debug(2222222);
            this._year = this._current.getFullYear();
            this._month = this._current.getMonth() + 1;
        });



    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        console.debug(11111111);

        mu.run(mu.prop(changes, 'year.currentValue'), (year) => {
            this._year = year;
        });

        mu.run(mu.prop(changes, 'month.currentValue'), (month) => {
            this._month = month;
        });

        console.debug(this._year, this._month);
    }

    getPrevMonth() {
        this._month = this._month - 1;
    }

    getPrevYear() {
        this._month = this._view.month;
        this._year = this._view.year - 1;
    }

    getNextMonth() {
        this._month = this._month + 1;
    }

    getNextYear() {
        this._month = this._view.month;
        this._year = this._view.year + 1;
    }

    getView(e) {
        this._view = e;
    }


}
