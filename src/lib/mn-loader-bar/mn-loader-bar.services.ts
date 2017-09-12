import {Injectable} from '@angular/core';
declare const mu: any;

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

