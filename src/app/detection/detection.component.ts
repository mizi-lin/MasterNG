import {
    Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input, OnChanges,
    SimpleChanges
} from '@angular/core';

/**
 * 组件设置的变化检测策略是 OnPush 策略，此外该组件也没有任何输入属性。
 * 那么我们应该怎么执行变化检测呢 ？我们看到在 ngOnInit 钩子中，我们通过 setInterval 定时器，
 * 每隔一秒钟更新计数值同时调用 ChangeDetectorRef 对象上的 markForCheck() 方法，
 * 来标识该组件在下一个变化检测周期，需执行变化检测，从而更新视图。
 */

// 1.ChangeDetectionStrategy 变化检测策略总共有几种 ？
//
// export declare enum ChangeDetectionStrategy {
//     OnPush = 0, // 变化检测器的状态值是 CheckOnce
//     Default = 1, // 组件默认值 - 变化检测器的状态值是 CheckAlways，即始终执行变化检测
// }
// 2.变化检测器的状态有哪几种 ？
//
// export declare enum ChangeDetectorStatus {
//     CheckOnce = 0, // 表示在执行detectChanges之后，变化检测器的状态将会变成Checked
//     Checked = 1, // 表示变化检测将被跳过，直到变化检测器的状态恢复成CheckOnce
//     CheckAlways = 2, // 表示在执行detectChanges之后，变化检测器的状态始终为CheckAlways
//     Detached = 3, // 表示该变化检测器树已从根变化检测器树中移除，变化检测将会被跳过
//     Errored = 4, // 表示在执行变化检测时出现异常
//     Destroyed = 5, // 表示变化检测器已被销毁
// }

@Component({
    selector: 'ngx-detection',
    templateUrl: './detection.component.html',
    styleUrls: ['./detection.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetectionComponent implements OnInit {

    counter_1: number = 0;

    isDetection: boolean = false;

    constructor(private cdRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        setInterval(() => {
            this.counter_1++;
            this.isDetection && this.cdRef.markForCheck();
        }, 1000);
    }

}

@Component({
    selector: 'ngx-detection-child',
    template: `<div>{{counter_2}} {{counter_3}}</div>
        <input type="checkbox" class="primary" (click)="detachCD($event.target.checked)">
            {{isDetection ? '停止监测' : '开始监测'}}
    `
})
export class DetectionChildComponent implements OnInit, OnChanges {

    @Input() counter_2: number;

    counter_3: number = 0;

    isDetection: boolean = false;

    constructor(private cdRef: ChangeDetectorRef) {}

    detachCD(checked) {
        if (checked) {
            this.cdRef.detach();
        } else {
            this.cdRef.reattach();
        }
    }

    ngOnInit() {
        setInterval(() => {
            this.counter_3++;
        }, 1000);
    }

    ngOnChanges(changes: SimpleChanges) {
        console.debug(changes);
    }
}

@Component({
    selector: 'ngx-detection-child-1',
    template: '<div>{{counter_2}}</div>',
    changeDetection: ChangeDetectionStrategy.Default
})
export class DetectionChild1Component implements OnInit {

    @Input() counter_2: number;

    constructor() { }

    ngOnInit() { }

}