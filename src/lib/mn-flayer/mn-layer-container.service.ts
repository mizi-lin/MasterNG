import {Injectable, OnDestroy} from '@angular/core';
import {MnDate} from '../mn-datetime-picker/mn-date.class';

declare const mu: any;

@Injectable()
export class MnLayerContainerService implements OnDestroy {

    protected _containerElement: HTMLElement;
    protected _nextUniqueId: number = 1;

    constructor() {
    }

    ngOnDestroy() {
        mu.run(mu.prop(this, '_containerElement.parentNode'), _parent => _parent.removeChild(this._containerElement));
    }

    getContainer(): HTMLElement {
        mu.empty(this._containerElement, () => this._createContainer());
        return this._containerElement;
    }

    protected _createContainer(): void {
        let container = document.createElement('div');
        container.classList.add('mnc-layer-container');
        document.body.appendChild(container);
        this._containerElement = container;
    }

    createLayerElement(moduleName: string, id?: string): HTMLElement {

        if (id) {
            if (document.querySelector(`#${id}`)) {
                return <HTMLElement>document.querySelector(`#${id}`);
            } else {
                let ID = `mnc-layer-${id}`;
                if (document.querySelector(`#${ID}`)) {
                    return <HTMLElement>document.querySelector(`#${ID}`);
                } else {
                    id = ID;
                }
            }
        }

        let _id = id || `mnc-layer-${this._nextUniqueId++}`;
        let layer = <HTMLElement>document.createElement('div');

        layer.id = _id;
        layer.classList.add('mnc-layer');
        layer.classList.add(moduleName);
        this.getContainer().appendChild(layer);
        return layer;
    }
}

