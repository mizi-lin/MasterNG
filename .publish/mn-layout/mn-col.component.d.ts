import { OnInit, ElementRef, Renderer2, OnChanges, SimpleChanges } from '@angular/core';
import { MnRowComponent } from './mn-row.component';
export declare class MnColComponent implements OnInit, OnChanges {
    private _rowCmp;
    private _ref;
    private _renderer;
    span: number;
    order: number;
    readonly paddingLeft: number;
    readonly paddingRight: number;
    constructor(_rowCmp: MnRowComponent, _ref: ElementRef, _renderer: Renderer2);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
}
