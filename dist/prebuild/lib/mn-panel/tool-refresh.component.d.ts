import { OnInit, ElementRef, Renderer2 } from '@angular/core';
export declare class ToolRefreshComponent implements OnInit {
    private _ref;
    private _renderer;
    private _panel;
    fsClick: any;
    _click($event: any): void;
    constructor(_ref: ElementRef, _renderer: Renderer2, _panel: any);
    ngOnInit(): void;
}