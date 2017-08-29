import {Injectable} from '@angular/core';
import {MnResource} from 'MasterNG';

@Injectable()
export class ResourcePool {

    constructor(private R: MnResource) {
    }

    demo: any = this.R.pool('assets/{store}/{name}.json');
}
