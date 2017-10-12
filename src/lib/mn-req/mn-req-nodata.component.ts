import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'mn-req-nodata',
    template: `
        <div>
            <i class="anticon anticon-frown-o"></i>
        </div>
        <div>
            Ooops, none data to display.
        </div>
    `,
    styleUrls: ['./mn-req-nodata.scss']
})
export class MnReqNoDataComponent implements OnInit {
    constructor() { }
    ngOnInit() { }
}
