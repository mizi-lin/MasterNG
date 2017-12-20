import { OnInit, ElementRef, Renderer2, EventEmitter } from '@angular/core';
export declare class ToolCollapseDownComponent implements OnInit {
    private _ref;
    private _renderer;
    _panel: any;
    onClick(event: any): void;
    fsClick: EventEmitter<any>;
    constructor(_ref: ElementRef, _renderer: Renderer2, _panel: any);
    ngOnInit(): void;
}
export declare class ToolCollapseUpComponent implements OnInit {
    private _ref;
    private _renderer;
    _panel: any;
    onClick(event: any): void;
    fsClick: EventEmitter<any>;
    constructor(_ref: ElementRef, _renderer: Renderer2, _panel: any);
    ngOnInit(): void;
}
