import {
    Component, OnInit, Input, AfterViewInit, ElementRef,
    Renderer2, OnChanges, SimpleChanges
} from '@angular/core';
// import {ColComponent} from './col.component';
declare const mu: any;

@Component({
    selector: 'fill,[fill]',
    template: '<ng-content select="cols"></ng-content>',
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
export class MnFillComponent implements OnInit, AfterViewInit, OnChanges {
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
        let a = [];
        mu.each(100, (i) => a.push(`.col-${i} {
            flex: ${i};
        }`));

        console.log(a.join(''));
    }

    ngAfterViewInit(): void {
        mu.run(this._ref.nativeElement.children, (elements) => {
            mu.each(elements, (el) => {
                this._renderer.setStyle(el, 'paddingLeft', this.gutter / 2 + 'px');
                this._renderer.setStyle(el, 'paddingRight', this.gutter / 2 + 'px');
            });
        });
    }
}
