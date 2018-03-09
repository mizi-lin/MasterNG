import {ApplicationRef, Component, ElementRef, OnInit} from '@angular/core';

@Component({
    selector: 'mn-layer',
    template: `
        <!--<ng-template-->
                <!--[mnLayerModule]="'modal'"-->
                <!--[mnLayerStatus]="'show'"-->
                <!--[mnLayerPosition]="'bottom left'"-->
                <!--[mnLayerSourceRef]="_ref"-->
                <!--mnLayer>-->
            <!--<ng-content></ng-content>-->
        <!--</ng-template>-->

        <ng-content></ng-content>
    `
})
export class MnLayerComponent implements OnInit {

    constructor(private _ref: ElementRef) {
    }

    ngOnInit() {
    }
}
