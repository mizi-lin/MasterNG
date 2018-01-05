import {Component, Input, OnInit} from '@angular/core';

declare const mu: any;

/**
 * 文章栅格化效果
 */

@Component({
    selector: 'mn-gutter',
    template: `
        <mn-row [hph]="'auto'" [gutter]="8" *ngFor="let _cols of _rows">
            <mn-col *ngFor="let _span of _cols" [span]="_span"></mn-col>
        </mn-row>
    `
})
export class MnGutterComponent implements OnInit {

    // 默认显示函数
    _rows: any[] = [];

    @Input('mnRows')
    set rows_(count: number) {

        this._rows = mu.map(count, () => {

            let _cols: any = mu.randomInt(count > 1 ? 2 : 8, count > 1 ? 6 : mu.randomInt(12, 20));

            let total_: number = 0;

            _cols = mu.map(_cols, (i) => {
                let _span: number = mu.randomInt(1, 2) % 2 ? mu.randomInt(3, 12) : mu.randomInt(8, 24);

                if (count > 1) {
                    total_ += _span;
                    if (total_ > 24) {
                        return '__remove_map__';
                    }
                }

                return _span;
            }, []);

            return _cols;

        }, []);

    }

    constructor() {
    }

    ngOnInit() {
    }
}
