import {
    Component, OnInit, Input, AfterViewInit, ElementRef,
    Renderer2, OnChanges, SimpleChanges
} from '@angular/core';
// import {ColComponent} from './col.component';
declare const mu: any;

@Component({
    selector: 'mn-row, [mn-row], mn-fill, [mn-fill]',
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
export class MnRowComponent implements OnChanges {
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
}
