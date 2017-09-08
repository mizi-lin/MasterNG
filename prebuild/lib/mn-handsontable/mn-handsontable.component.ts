import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
declare const jQuery: any, mu: any;

/**
 * use handsontable v0.34
 * must !!!
 * in polyfills.ts
 * before "import 'zone.js/dist/zone'"
 * add import 'handsontable/dist/handsontable'
 */
import * as Handsontable from 'handsontable';



@Component({
    selector: 'mn-handsontable',
    template: `
        <div #el></div>
        <!--<a download="abc.csv" [href]="uri | trust">DOWN</a>-->
    `
})
export class MnHandsontableComponent implements OnInit, AfterViewInit, OnChanges {

    @ViewChild('el') el;

    @Input() data: any;

    uri: string = 'aaa';
    hot: any;

    constructor(
        private _ref: ElementRef
    ) { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        mu.run(this.hot, (hot) => {
            hot.clear();
        });

        mu.run(mu.prop(changes['data'], 'currentValue'), () => {
            this.hot = new (<any>Handsontable)(this.el.nativeElement, {
                data: this.data,
                rowHeaders: true,
                colHeaders: true
            });
        });
    }

    ngAfterViewInit(): void {

        // const data = [
        //     ['', 'Ford', 'Volvo', 'Toyota', 'Honda'],
        //     ['2016', 10, 11, 12, 13],
        //     ['2017', 20, 11, 14, 13],
        //     ['2018', 30, 15, 12, 13]
        // ];
        //
        // const container = this.el.nativeElement;
        //
        // const hot = new (<any>Handsontable)(container, {
        //     data: data,
        //     rowHeaders: true,
        //     colHeaders: true
        // });

        // let csv = jQuery.csv.fromObjects(data);
        // this.uri = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;




    }

}

