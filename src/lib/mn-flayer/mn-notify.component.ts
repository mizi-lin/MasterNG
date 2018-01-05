import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'mn-notify',
    template: `
        <ng-template
                [mnLayerId]="'notify'"
                [mnLayerModule]="'mnNotify'"
                [mnLayerStatus]="_status"
                [mnLayerSourceRef]="_sourceRef"
                (mnResult)="_result($event)"
                mnLayer>
            <mn-alert 
                    [mnType]="_type"
                    [mnContent]="_content"></mn-alert>
        </ng-template>
    `
})
export class MnNotifyComponent implements OnInit {
    // modal 来源 service 服务, page 页面
    @Input('mnSource') _source: string = 'service';

    @Input('mnContent') _content: any;

    @Input('mnType') _type: string;

    @Input('mnOpen')
    set _open(b: boolean) {
        if (b) {
            this._status = 'show';
            this._opened.emit(true);
        } else {
            this._status = 'hide';
        }
    }

    @Output('mnOpenChange') _openChange = new EventEmitter<any>();
    @Output('mnClosed') _closed = new EventEmitter<any>();
    @Output('mnOpened') _opened = new EventEmitter<any>();

    _status: string = 'hide';
    _notify: any;
    _sourceRef: any;

    constructor(private _render: Renderer2,
                private _vcRef: ViewContainerRef,
                private _ref: ElementRef) {

        // this._render.setStyle(_ref.nativeElement, 'background', 'red');
    }

    ngOnInit() {
    }

    _result($event: any) {
        this._notify = $event;
    }

    close(): any {
        this._notify.hide();
        this._open = false;
        this._openChange.emit(false);
        this._closed.emit(false);
    }
}
