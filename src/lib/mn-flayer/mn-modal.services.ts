import {ApplicationRef, ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, Renderer2} from '@angular/core';
import {MnModalComponent} from './mn-modal.component';
import {MnLayerContainerService} from './mn-layer-container.service';
import {MnNotifyComponent} from './mn-notify.component';

declare const mu: any;

@Injectable()
export class MnModalServices {

    _mcf: ComponentFactory<MnModalComponent>;
    _mnf: ComponentFactory<MnNotifyComponent>;
    _layer: HTMLElement;

    constructor(private _appRef: ApplicationRef,
                private _cfr: ComponentFactoryResolver,
                private _lcs: MnLayerContainerService) {
    }

    modal(config: any = {}) {
        if (config.id) {
            this._layer = this._lcs.createLayerElement('mnModal', config.id);
        } else if (!this._layer || (mu.prop(this._layer, 'className') || '').indexOf('mnModal') === -1 ) {
            this._layer = this._lcs.createLayerElement('mnModal');
        }

        console.dir(this._layer);

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

    notify(config: any = {}) {
        this._layer = this._lcs.createLayerElement('mnNotify', 'notify');
        let _section = <HTMLElement>document.createElement('mn-notify');
        // _section.innerHTML += `<mn-notify></mn-notify>`;
        this._mnf = this._cfr.resolveComponentFactory(MnNotifyComponent);

        // console.dir(this._layer);
        let compRef: ComponentRef<any> = this._appRef.bootstrap(this._mnf, _section);

        let instance: MnNotifyComponent = <MnNotifyComponent> compRef.instance;
        instance['_open'] = true;
        instance['_type'] = config.type || 'error';
        instance['_source'] = 'service';
        instance['_content'] = config.content;
        instance['_layerId'] = config.id || this._layer.id;
        instance['_delay'] = mu.ifnvl(config.delay, 3000);
        instance['_close_btn'] = mu.ifnvl(config.closeBtn, true);
        this._layer.appendChild(_section);

    }

}

