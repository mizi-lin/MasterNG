import { ElementRef, OnInit } from '@angular/core';
export declare class MnDropdownComponent implements OnInit {
    private _ref;
    _hover($event: any): void;
    _click: ($event: any) => void;
    _out($event: any): void;
    showtypes: string;
    hidetype: string;
    result: any;
    status: string;
    styles: any;
    top: number;
    left: number;
    constructor(_ref: ElementRef);
    _position(): {
        top: any;
        left: any;
    };
    _evt: any;
    _hasEvt(type: any): boolean;
    _result($event: any): void;
    ngOnInit(): void;
}
