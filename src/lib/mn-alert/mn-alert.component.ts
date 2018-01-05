import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'mn-alert',
    template: `
        <section class="mnc-alert mnc-alert-{{_type}}">
            <mn-fill [gutter]="8">
                <mn-col [style.width.px]="48">
                    <i class="{{_icon}}"></i>
                </mn-col>
                <mn-col [span]="1" [innerHTML]="_content">
                    
                </mn-col>
            </mn-fill>
        </section>
    `,
    styleUrls: ['./mn-alert.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MnAlertComponent implements OnInit {

    constructor() {
    }

    @Input('mnContent') _content: string;
    @Input('mnType') _type: string = 'error';

    // icon 样式 class
    @Input('mnIcon') _icon: string;

    ngOnInit() {
    }
}

