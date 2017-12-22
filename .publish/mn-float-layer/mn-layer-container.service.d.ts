import { OnDestroy } from '@angular/core';
export declare class MnLayerContainerService implements OnDestroy {
    protected _containerElement: HTMLElement;
    protected _nextUniqueId: number;
    constructor();
    ngOnDestroy(): void;
    getContainer(): HTMLElement;
    protected _createContainer(): void;
    createLayerElement(moduleName: string, id?: string): Element;
}
