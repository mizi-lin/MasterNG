import {Component, OnInit, Input, ElementRef, Renderer2, OnChanges, SimpleChanges} from '@angular/core';
import * as mu from 'mzmu';
declare var mu: any;

@Component({
    selector: 'cols,[cols]',
    template: `
        <ng-content></ng-content>
    `
})
export class ColComponent implements OnInit, OnChanges {

    @Input() gutter;
    @Input() span: number = 0;
    @Input() order: number = 0;


    constructor(private _ref: ElementRef, private _renderer: Renderer2) {
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {

        mu.run(changes['span'], () => {
            this._renderer.addClass(this._ref.nativeElement, 'col-' + this.span);
        });

        mu.run(changes['order'], () => {
            this._renderer.setStyle(this._ref.nativeElement, 'order', this.order);
        });

        mu.exist(changes['gutter'], () => {
            let gutter = this.gutter.toString().split(',');
            mu.exist(gutter[0], (v) => {
                this._renderer.setStyle(this._ref.nativeElement, 'paddingLeft', v + 'px');
            });

            mu.exist(gutter[1], (v) => {
                this._renderer.setStyle(this._ref.nativeElement, 'paddingRight', v + 'px');
            });
        })

    }
}