import { PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export declare class TrustUrlPipe implements PipeTransform {
    private _dst;
    constructor(_dst: DomSanitizer);
    transform(value: any, args: any[]): any;
}
