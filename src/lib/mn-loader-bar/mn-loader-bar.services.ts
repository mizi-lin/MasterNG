import {Injectable} from '@angular/core';
import  mu from 'mzmu';

@Injectable()
export class MnLoaderBarServices {

    constructor() {
    }

    config: any = {
        loader: true
    };

    setConfig(config: any = {}) {
        this.config = mu.extend({}, this.config, config);
    }
}

