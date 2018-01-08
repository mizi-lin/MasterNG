import {Component, OnInit} from '@angular/core';
import {MnModalServices} from '../../lib/mn-flayer/mn-modal.services';
import {DemoNodataComponent} from '../demo-nodata/demo-nodata.component';

@Component({
    selector: 'mn-demo-layer',
    templateUrl: './demo-layer.component.html',
    styleUrls: ['./demo-layer.component.scss']
})
export class DemoLayerComponent implements OnInit {

    test: any = {
        result: ($event) => {
            // console.debug($event);
        }
    };

    a: any = DemoNodataComponent;

    constructor(private _mms: MnModalServices) {
    }

    ngOnInit() {
    }

    createModal(config) {
        this._mms.modal(config);
    }

    createNotify(config) {
        config.content = config.content + ':::' + +new Date();
        this._mms.notify(config);
    }
}
