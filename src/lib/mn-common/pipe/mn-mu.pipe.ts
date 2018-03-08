import {Pipe, PipeTransform} from '@angular/core';
import {MnLoggerService} from '../services/mn-logger.service';

declare const mu: any, console: any;

@Pipe({name: 'mu'})
export class MuPipe implements PipeTransform {

    constructor(private _logger: MnLoggerService) {
    }

    transform(value: any, fn: string, ...args: any[] ): any {
        return mu.isExist(fn) ? mu[fn](value, ...args) : value;
    }
}
