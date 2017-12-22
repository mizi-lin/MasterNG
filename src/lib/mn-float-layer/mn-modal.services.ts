import {ApplicationRef, ComponentFactory, ComponentFactoryResolver, Injectable, Renderer2} from '@angular/core';
import {MnModalComponent} from './mn-modal.component';
import {MnLayerComponent} from './mn-layer.component';
import {MnLayerContainerService} from './mn-layer-container.service';

@Injectable()
export class MnModalServices {

    _mcf: ComponentFactory<MnModalComponent>;

    _layer: HTMLElement;

    constructor(private _appRef: ApplicationRef,
                private _cfr: ComponentFactoryResolver,
                private _lcs: MnLayerContainerService) {

        // this._mcf = _cfr.resolveComponentFactory(MnModalComponent);
    }

    open(config: any = {}) {

        // if (config.id) {
        //     this._layer = this._lcs.createLayerElement('mn-modal', config.id);
        // } else if (!this._layer) {
        //     this._layer = this._lcs.createLayerElement('mn-modal');
        // }
        //
        // this._layer.innerHTML = `<mn-modal [title]="config.title"></mn-modal>`;
        //
        // this._appRef.bootstrap(MnModalComponent, this._layer);

        // _nt.remove();
    }

}

