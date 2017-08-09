import {
    Component, OnInit, Input, ContentChildren, AfterViewInit, ElementRef,
    Renderer2, OnChanges, SimpleChanges
} from '@angular/core';
import {ColComponent} from './col.component';
import * as mu from 'mzmu';
declare var mu: any;

@Component({
    selector: 'row, [row]',
    template: '<ng-content></ng-content>',
    styles: [
        `
            :host {
                display: flex;
                flex-wrap: wrap;
                align-items: stretch;
                box-sizing: border-box;
            }
            
            
        `
    ]
})
export class RowComponent implements OnInit, AfterViewInit, OnChanges {

    @ContentChildren(ColComponent) colsArr;

    @Input() gutter;

    constructor(private _ref: ElementRef,
                private _renderer: Renderer2) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        mu.exist(changes['gutter'], () => {
            this._renderer.setStyle(this._ref.nativeElement, 'marginLeft', -this.gutter / 2 + 'px');
            this._renderer.setStyle(this._ref.nativeElement, 'marginRight', -this.gutter / 2 + 'px');
        });
    }

    ngOnInit(): void  {
        // let a = []
        // mu.each(33, (ii, i) => {
        //     a.push(`.mb-${i}{margin-bottom: ${i}px;}`);
        // });
        //
        // console.debug(a.join(''))

    }

    ngAfterViewInit(): void {
        mu.each(this.colsArr._results, (cols) => {
            if (mu.isNotExist(cols.gutter)) {
                cols._renderer.setStyle(cols._ref.nativeElement, 'paddingLeft', this.gutter / 2 + 'px');
                cols._renderer.setStyle(cols._ref.nativeElement, 'paddingRight', this.gutter / 2 + 'px');
            }
        });
    }

}