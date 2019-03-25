import {Injectable} from '@angular/core';
import  mu from 'mzmu';


@Injectable()
export class MnDynamicServices {
    _componentMap: any = {};

    setComponentMap(component) {
        if (component && component.name) {
            this._componentMap[component.name] = component;
        }
    }

    getComponent(name) {
        return this._componentMap[name];
    }

    constructor() {
    }

}