import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
    name: 'trust'
})

export class TrustUrlPipe implements PipeTransform {
    constructor(private _dst: DomSanitizer) {

    }

    transform(value: any, args: any[]): any {
        return this._dst.bypassSecurityTrustResourceUrl(value);
    }
}
