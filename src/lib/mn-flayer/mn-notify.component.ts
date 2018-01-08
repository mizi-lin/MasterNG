import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewContainerRef, ViewEncapsulation} from '@angular/core';

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

            <section class="mnc-notify">
                <mn-alert
                        [mnType]="_type"
                        [mnContent]="_content">
                </mn-alert>

                <i class="fa fa-close {{_type}}" (click)="_close()" *ngIf="_close_btn"></i>
            </section>

        </ng-template>
    `,
    styleUrls: ['./mn-flayer.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MnNotifyComponent implements OnInit {
    // modal 来源 service 服务, page 页面
    @Input('mnSource') _source: string = 'service';
    @Input('mnContent') _content: any;
    @Input('mnType') _type: string;
    @Input('mnCloseBtn') _close_btn: boolean = false;

    @Input('mnOpen')
    set _open(b: boolean) {
        if (b) {
            this._status = 'show';
            this._opened.emit(true);
        } else {
            this._status = 'hide';
        }
    }

    @Input('mnDelay')
    set _delay(value) {
        if (value) {
            this._delayId && clearTimeout(this._delayId);
            this._delayId = setTimeout(() => {
                this._close();
            }, value);
        }
    }

    @Output('mnOpenChange') _openChange = new EventEmitter<any>();
    @Output('mnClosed') _closed = new EventEmitter<any>();
    @Output('mnOpened') _opened = new EventEmitter<any>();

    _status: string = 'hide';
    _notify: any;
    _sourceRef: any;
    _delayId: any;

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

    _close(): any {
        this._notify.hide();
        this._open = false;
        this._openChange.emit(false);
        this._closed.emit(false);
        this._delayId && clearTimeout(this._delayId);
    }
}
