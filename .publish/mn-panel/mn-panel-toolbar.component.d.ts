import { ElementRef, Renderer2, OnChanges, SimpleChanges } from '@angular/core';
export declare class PanelToolbarComponent implements OnChanges {
    private _ref;
    private _renderer;
    tools: string[];
    where: string;
    fullscreen: boolean;
    fullscreen_click($event: any): void;
    toolMap: any;
    constructor(_ref: ElementRef, _renderer: Renderer2);
    ngOnChanges(changes: SimpleChanges): void;
}
