import {Injectable} from '@angular/core';
import {MnDynamicServices} from '../../mn-dynamic/mn-dynamic-component.service';

@Injectable()
export class MnCommonServices {

    constructor(
        public _dynamicService: MnDynamicServices
    ) {
    }
}
