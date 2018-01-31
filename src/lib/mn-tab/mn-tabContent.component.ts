import {Component, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';

declare const mu: any;

@Component({
    selector: 'mn-tabContent',
    template: `
        <ng-template #content>
            <ng-content></ng-content>
        </ng-template>
    `,
    encapsulation: ViewEncapsulation.None
})
export class MnTabContentComponent implements OnInit {

    @Input('mnActive') _active: boolean = false;

    _temp: TemplateRef<any>;

    @ViewChild('content')
    set _content(_temp) {

        this._temp = _temp;

        // let _layer = document.createElement('div');
        // let _viewRef = this._vcRef.createEmbeddedView(_temp, {});
        // mu.each(_viewRef.rootNodes, (_node) => {
        //     _layer.appendChild(_node);
        // });
        //
        // this._template = _layer;
    }

    _template: any;

    constructor(private _vcRef: ViewContainerRef) {
    }

    ngOnInit() {
    }
}
