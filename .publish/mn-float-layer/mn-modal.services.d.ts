import { ApplicationRef, ComponentFactory, ComponentFactoryResolver } from '@angular/core';
import { MnModalComponent } from './mn-modal.component';
import { MnLayerContainerService } from './mn-layer-container.service';
export declare class MnModalServices {
    private _appRef;
    private _cfr;
    private _lcs;
    _mcf: ComponentFactory<MnModalComponent>;
    _layer: HTMLElement;
    constructor(_appRef: ApplicationRef, _cfr: ComponentFactoryResolver, _lcs: MnLayerContainerService);
    open(config?: any): void;
}
