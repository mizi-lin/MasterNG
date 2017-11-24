import { OnInit, ElementRef, Renderer2, EventEmitter } from '@angular/core';
export declare class ToolCompressComponent implements OnInit {
    private _ref;
    private _renderer;
    private _panel;
    onClick($event: any): void;
    fsClick: EventEmitter<any>;
    constructor(_ref: ElementRef, _renderer: Renderer2, _panel: any);
    ngOnInit(): void;
}
