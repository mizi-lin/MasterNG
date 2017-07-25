import {Component, OnInit, HostBinding} from '@angular/core';

@Component({
    selector: '[btn]',
    template: `<ng-content></ng-content>`
})
export class ButtonComponent implements OnInit {
    @HostBinding('class.master-btn') masterBtn: boolean = true;
    constructor() { }

    ngOnInit() { }
    
}