import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'mn-demo-tab',
    templateUrl: './demo-tab.component.html',
    styleUrls: ['./demo-tab.component.scss']
})
export class DemoTabComponent implements OnInit {

    _options = {
        tabs: [
            {
                title: 'tabs1',
                template: 'this is a tab - 1'
            },

            {
                title: 'tabs2',
                template: 'this is a tab - 2'
            },

            {
                title: 'tabs3',
                template: 'this is a tab - 3'
            }
        ]
    };

    _option1 = {
        title: 'tabs options 1',
        template: 'this is a tabs options 1'
    };

    _option2 = {
        title: 'tabs options 2',
        template: 'this is a tabs options 2'
    };

    _option3 = {
        title: 'tabs options 3',
        template: 'this is a tabs options 3'
    };

    abc: string = (+ new Date()) + '~~';

    constructor() {
    }

    ngOnInit() {
        setTimeout(() => {
            this.abc = '白日依山尽';
        }, 5000);
    }

}
