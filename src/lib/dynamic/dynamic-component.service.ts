import {Injectable} from '@angular/core';
import * as mu from 'mzmu';
declare var mu: any;

@Injectable()
export class DynamicService {
    _componentMap: any = {};

    setComponentMap(component) {
        if (component && component.name) {
            this._componentMap[component.name] = component;
        }
    }

    getComponent(name){
        return this._componentMap[name]
    }

    constructor() {
    }

}