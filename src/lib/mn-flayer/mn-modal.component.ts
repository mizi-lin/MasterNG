import {
    Component, ComponentRef, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, TemplateRef, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

export class MnModalContext {
    public $implicit: any = null;
    public mnLayer: any = null;
}

@Component({
    selector: 'mn-modal',
    template: `
        <!--<section #modal>-->
        <!--<div class="mnc-mask" *ngIf="_mask"></div>-->
        <!--<div class="mnc-modal">-->
        <!--<mn-panel-s [title]="_title">-->
        <!--<div (click)="close()">Close</div>-->
        <!--</mn-panel-s>-->
        <!--</div>-->
        <!--</section>-->

        <ng-template
                [mnLayerId]="_layerId"
                [mnLayerModule]="'mnModal'"
                [mnLayerStatus]="_status"
                [mnLayerSourceRef]="_ref"
                (mnResult)="_result($event)"
                mnLayer>
            <section>
                <div class="mnc-mask" *ngIf="_mask"></div>
                <div class="mnc-modal">
                    <mn-panel [hph]="true">
                        <mn-panel-header>
                            <mn-panel-title [innerHTML]="_title">
                            </mn-panel-title>
                            <mn-panel-toolbar>
                                <mn-col (click)="close()">Close</mn-col>
                            </mn-panel-toolbar>
                        </mn-panel-header>
                        <mn-panel-body>

                            <ng-container *ngIf="!_component">
                                <ng-content></ng-content>
                            </ng-container>
                            
                            <ng-container *ngIf="_content">
                                <div [innerHTML]="_content"></div>
                            </ng-container>

                            <ng-container *ngIf="_component">
                                <mn-dynamic-component [component]="_component"></mn-dynamic-component>
                            </ng-container>
                        </mn-panel-body>
                    </mn-panel>
                </div>
            </section>
        </ng-template>
    `,
    styleUrls: ['./mn-flayer.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MnModalComponent implements OnInit {

    @Input('mnTitle') _title;
    @Input('mnMask') _mask: boolean = true;

    // modal 来源 service 服务, page 页面
    @Input('mnSource') _source: string;

    @Input('mnComponent') _component: any;
    @Input('mnContent') _content: any;

    @Input('mnOpen')
    set _open(b: boolean) {
        if (b) {
            this._status = 'show';
            this._render.setStyle(document.body, 'overflow', 'hidden');
            this._opened.emit(true);
        } else {
            this._status = 'hide';
            this._render.removeStyle(document.body, 'overflow');
        }
    }

    @Output('mnOpenChange') _openChange = new EventEmitter<any>();
    @Output('mnClosed') _closed = new EventEmitter<any>();
    @Output('mnOpened') _opened = new EventEmitter<any>();

    _status: string = 'hide';
    _modal: any;

    constructor(private _render: Renderer2,
                private _vcRef: ViewContainerRef,
                private _ref: ElementRef) {

        // this._render.setStyle(_ref.nativeElement, 'background', 'red');
    }

    ngOnInit() {
    }

    _result($event: any) {
        this._modal = $event;
    }

    close(): any {
        this._modal.hide();
        this._open = false;
        this._openChange.emit(false);
        this._closed.emit(false);
    }
}
