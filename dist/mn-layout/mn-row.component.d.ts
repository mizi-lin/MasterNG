import { ElementRef, Renderer2, OnChanges, SimpleChanges } from '@angular/core';
export declare class MnRowComponent implements OnChanges {
    private _ref;
    private _renderer;
    gutter: any;
    where: any;
    constructor(_ref: ElementRef, _renderer: Renderer2);
    ngOnChanges(changes: SimpleChanges): void;
}
