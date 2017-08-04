import {Injectable} from '@angular/core';
import {$$Resource} from 'MasterNG';

@Injectable()
export class ResourcePool {

    constructor(private R: $$Resource) {
    }

    demo: any = this.R.pool('assets/{store}/{name}.json');

}

