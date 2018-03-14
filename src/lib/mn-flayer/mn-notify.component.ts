import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewContainerRef, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'mn-notify',
    template: `
        <ng-template
                mnLayer
                [mnLayerId]="'notify'"
                [mnLayerModule]="'mnNotify'"
                [mnLayerStatus]="_status"
                [mnLayerSourceRef]="_sourceRef"
                (mnShowResult)="_showResult($event)"
                (mnResult)="_result($event)">

            <section class="mnc-notify">
                <mn-alert
                        [mnType]="_type"
                        [mnContent]="_content">
                </mn-alert>

                <i class="fa fa-close {{_type}}" (click)="_close()" *ngIf="_closeBtn"></i>
            </section>

        </ng-template>
    `,
    encapsulation: ViewEncapsulation.None
})
export class MnNotifyComponent implements OnInit {
    // modal 来源 service 服务, page 页面
    @Input('mnSource') _source: string = 'service';
    @Input('mnContent') _content: any;
    @Input('mnType') _type: string;
    @Input('mnCloseBtn') _closeBtn: boolean = false;

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
    _layer: any;
    _notify: any;
    _sourceRef: any;
    _delayId: any;

    constructor(private _render: Renderer2,
                private _vcRef: ViewContainerRef,
                private _ref: ElementRef) {
    }

    ngOnInit() {
    }

    _result($event: any) {
        this._layer = $event;
    }

    _showResult($event: any) {
        this._notify = $event.content;
    }

    _close(): any {

        this._ref.nativeElement.remove();
        this._notify.remove();

        if (!this._layer.layer.childElementCount) {
            this._layer.hide();
        }

        this._openChange.emit(false);
        this._closed.emit(false);
        this._delayId && clearTimeout(this._delayId);
    }
}
