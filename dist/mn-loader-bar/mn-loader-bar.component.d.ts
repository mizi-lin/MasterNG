import { ElementRef, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
export declare class MnLoaderBarComponent implements OnChanges {
    private _ref;
    private _render;
    position: string;
    _position: string;
    target: string | ElementRef;
    progress: number;
    where: number;
    done: any;
    _width: number;
    _height: number;
    here: number;
    width: number;
    height: number;
    on: number;
    constructor(_ref: ElementRef, _render: Renderer2);
    ngOnChanges(changes: SimpleChanges): void;
    move(): void;
    go(num?: number): void;
}
