import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {MnDate} from './mn-date.class';

declare const mu: any;

/**
 * 构建日期视图
 */

@Component({
    selector: 'mn-datemultiple',
    template: `
        <mn-fill>
            <mn-col [span]="1">
                <mn-datedraw [mnYear]="2017" [mnMonth]="12" [mnDay]="17" [mnView]="'days'"></mn-datedraw>
            </mn-col>
            
            <mn-col [span]="1">
                <mn-datedraw [mnYear]="2067" [mnMonth]="12" [mnDay]="17" [mnView]="'days'"></mn-datedraw>
            </mn-col>
        </mn-fill>
    `
})
export class MnDateMultipleComponent implements OnInit {

    $date: any = {};
    date$: any = new BehaviorSubject<any>({});
    step: any = 1;

    @Input() _maxDate: any;
    @Input() _minDate: any;

    @Input('mnYear')
    set year_(y) {
        this.$date.y = y;
        this.date$.next(this.$date);
    }

    @Input('mnMonth')
    set month_(m) {
        this.$date.m = m - 1;
        this.date$.next(this.$date);
    }

    @Input('mnDay')
    set day_(d) {
        this.$date.d = d;
        this.date$.next(this.$date);
    }

    @Input('mnDate')
    set date_(dt) {

    }

    @Input('mnView') _view: string;

    _frames: any;

    dmap: any = {
        y: 'setFullYear',
        m: 'setMonth',
        d: 'setDate'
    };

    constructor() {
        this.date$.subscribe((d) => {
            this.bounce(d);
        });
    }

    ngOnInit() {
    }

    newdate() {
        return new Date(1970, 0, 1, 0, 0, 0, 0);
    }

    bounce: any = mu.debounce((ds: any) => {
        let date = this.newdate();
        mu.each(ds, (v, f) => {
            date[this.dmap[f]](v);
        });

    }, 300);

}

