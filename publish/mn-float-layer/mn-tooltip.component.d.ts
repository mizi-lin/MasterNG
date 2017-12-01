import { ElementRef, OnInit } from '@angular/core';
export declare class MnTooltipComponent implements OnInit {
    _ref: ElementRef;
    hover_($event: any): void;
    _click: ($event: any) => void;
    out_($event: any): void;
    _tooltip: string;
    _showTypes: string;
    _hideType: string;
    _position: string;
    result: any;
    _status: string;
    constructor(_ref: ElementRef);
    _evt: any;
    _hasEvt(type: any): boolean;
    _result($event: any): void;
    ngOnInit(): void;
}
