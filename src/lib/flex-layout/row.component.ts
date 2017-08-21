import {
    Component, OnInit, Input, AfterViewInit, ElementRef,
    Renderer2, OnChanges, SimpleChanges
} from '@angular/core';
// import {ColComponent} from './col.component';
declare const mu: any;

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
    // @ContentChildren(ColComponent) colsArr;

    @Input() gutter;
    @Input() where;

    constructor(private _ref: ElementRef,
                private _renderer: Renderer2) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        mu.exist(changes['gutter'], () => {
            this._renderer.setStyle(this._ref.nativeElement, 'marginLeft', -this.gutter / 2 + 'px');
            this._renderer.setStyle(this._ref.nativeElement, 'marginRight', -this.gutter / 2 + 'px');
        });
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        // mu.each(this.colsArr._results, (cols) => {
        //     if (mu.isNotExist(cols.gutter)) {
        //         cols._renderer.setStyle(cols._ref.nativeElement, 'paddingLeft', this.gutter / 2 + 'px');
        //         cols._renderer.setStyle(cols._ref.nativeElement, 'paddingRight', this.gutter / 2 + 'px');
        //     }
        // });

        mu.run(this._ref.nativeElement.children, (elements) => {
            mu.each(elements, (el) => {
                this._renderer.setStyle(el, 'paddingLeft', this.gutter / 2 + 'px');
                this._renderer.setStyle(el, 'paddingRight', this.gutter / 2 + 'px');
            });
        });
    }
}
