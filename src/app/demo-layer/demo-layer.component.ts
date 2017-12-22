import {Component, OnInit} from '@angular/core';
import {MnModalServices} from '../../lib/mn-float-layer/mn-modal.services';

@Component({
    selector: 'mn-demo-layer',
    templateUrl: './demo-layer.component.html',
    styleUrls: ['./demo-layer.component.scss']
})
export class DemoLayerComponent implements OnInit {

    constructor(private _mms: MnModalServices) {
    }

    ngOnInit() {
    }

    createModal(config) {
        this._mms.open(config);
    }
}
