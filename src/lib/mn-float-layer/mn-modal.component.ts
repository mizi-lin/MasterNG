import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'mn-modal',
    template: `
        <mn-panel-s [title]="_title"></mn-panel-s>
    `
})
export class MnModalComponent implements OnInit {

    @Input('mnTitle') _title;

    constructor() {
    }

    ngOnInit() {
    }
}
