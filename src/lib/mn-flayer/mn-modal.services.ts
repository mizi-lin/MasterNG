import {ApplicationRef, ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, Renderer2} from '@angular/core';
import {MnModalComponent} from './mn-modal.component';
import {MnLayerContainerService} from './mn-layer-container.service';
declare const mu: any;

@Injectable()
export class MnModalServices {

    _mcf: ComponentFactory<MnModalComponent>;
    _layer: HTMLElement;

    constructor(private _appRef: ApplicationRef,
                private _cfr: ComponentFactoryResolver,
                private _lcs: MnLayerContainerService) {
    }

    open(config: any = {}) {
        if (config.id) {
            this._layer = this._lcs.createLayerElement('mnModal', config.id);
        } else if (!this._layer) {
            this._layer = this._lcs.createLayerElement('mnModal');
        }

        this._layer.innerHTML = `<mn-modal></mn-modal>`;
        this._mcf = this._cfr.resolveComponentFactory(MnModalComponent);
        let compRef: ComponentRef<any> = this._appRef.bootstrap(this._mcf, this._layer.firstElementChild);
        let instance: MnModalComponent = <MnModalComponent> compRef.instance;
        instance['_title'] = config.title || '';
        instance['_mask'] = mu.ifnvl(config.mask, true);
        instance['_open'] = true;
        instance['_source'] = 'service';
        instance['_component'] = config.component;
        instance['_content'] = config.content;
        instance['_layerId'] = config.id || this._layer.id;
    }

}

