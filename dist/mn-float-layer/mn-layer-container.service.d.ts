import { OnDestroy } from '@angular/core';
export declare class MnLayerContainerService implements OnDestroy {
    protected _containerElement: HTMLElement;
    constructor();
    ngOnDestroy(): void;
    getContainer(): HTMLElement;
    protected _createContainer(): void;
}
