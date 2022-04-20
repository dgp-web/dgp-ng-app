import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, NgZone, OnDestroy, Output } from "@angular/core";
import { debounceTime, startWith } from "rxjs/operators";
import { Subject, Subscription } from "rxjs";
import { Size } from "../models/size.model";
import { getInitialSize } from "../functions/get-initial-size-from-el-ref.function";

export class ResizeSensor {

    private readonly resizeActionScheduler = new Subject<Size>();

    private resizeObserver: ResizeObserver;
    private resizeSubscription: Subscription;

    readonly size$ = new Subject<Size>();

    constructor(
        private readonly element: HTMLElement
    ) {
    }

    connect() {
        this.resizeSubscription = this.resizeActionScheduler.pipe(
            startWith(getInitialSize(this.element)),
            debounceTime(250)
        ).subscribe(x => this.size$.next(x));

        this.initResizeSensor();
    }

    disconnect() {
        this.resizeObserver.disconnect();
    }

    private initResizeSensor() {

        this.resizeObserver = new ResizeObserver(entries => {
            const firstItem = entries[0];
            this.scheduleResizeAction({
                width: firstItem.contentRect.width,
                height: firstItem.contentRect.height,
            });
        });

        this.resizeObserver.observe(this.element);
    }

    protected scheduleResizeAction(size: Size): void {
        this.resizeActionScheduler.next(size);
    }

}

/**
 * Angular wrapper around the excellent library "css-element-queries"
 * https://github.com/marcj/css-element-queries
 */
@Directive({
    selector: "[dgpResizeSensor]"
})
export class DgpResizeSensorDirective implements AfterViewInit, OnDestroy {

    private sensor: ResizeSensor;
    private resizeSubscription: Subscription;

    @Input()
    stableTime = 250;

    @Output()
    readonly sizeChanged = new EventEmitter<Size>();

    constructor(
        private readonly elRef: ElementRef,
        private readonly ngZone: NgZone
    ) {
    }

    ngAfterViewInit(): void {
        this.sensor = new ResizeSensor(this.elRef.nativeElement);
        this.resizeSubscription = this.sensor.size$
            .subscribe(x => this.ngZone.run(() => this.sizeChanged.next(x)));
        this.sensor.connect();
    }

    ngOnDestroy(): void {
        if (!this.resizeSubscription?.closed) {
            this.resizeSubscription?.unsubscribe();
        }
        if (this.sensor) {
            this.sensor.disconnect();
        }
    }

}
