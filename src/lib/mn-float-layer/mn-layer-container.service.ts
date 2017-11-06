import {Injectable, OnDestroy} from '@angular/core';

declare const mu: any;

@Injectable()
export class MnLayerContainerService implements OnDestroy {

    protected _containerElement: HTMLElement;

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
}

