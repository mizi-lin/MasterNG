import {MnResource} from '../../lib/mn-req/mn-resource';
import {Injectable} from '@angular/core';

@Injectable()
export class ResourcePool {

    constructor(private R: MnResource) {
    }

    demo: any = this.R.pool('assets/{store}/{name}.json');
}
