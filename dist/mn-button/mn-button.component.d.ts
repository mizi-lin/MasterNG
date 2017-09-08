import { OnInit, OnChanges, SimpleChanges } from '@angular/core';
export declare class MnButtonComponent implements OnInit, OnChanges {
    masterBtn: boolean;
    masterBtnCircle: boolean;
    masterBtnSquare: boolean;
    masterBtnFull: boolean;
    masterBtnSymbol: boolean;
    icon: string;
    shape: string;
    symbol: string;
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
}
