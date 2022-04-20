import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, NgZone, OnDestroy, Output } from "@angular/core";
import { debounceTime, startWith } from "rxjs/operators";
import { Subscription } from "rxjs";

export interface Size {
    readonly width: number;
    readonly  height: number;
}

export function getInitialSizeFromElRef(payload: ElementRef<HTMLDivElement>): Size {
    return {
        height: payload.nativeElement.clientHeight,
        width: payload.nativeElement.clientWidth
    } as Size;
}

/**
 * Angular wrapper around the excellent library "css-element-queries"
 * https://github.com/marcj/css-element-queries
 */
@Directive({
    selector: "[dgpResizeSensor]"
})
export class DgpResizeSensorDirective implements AfterViewInit, OnDestroy {

    private readonly resizeActionScheduler = new EventEmitter<Size>();

    private resizeObserver: ResizeObserver;
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

        this.resizeSubscription = this.resizeActionScheduler.pipe(
            startWith(getInitialSizeFromElRef(this.elRef)),
            debounceTime(this.stableTime)
        ).subscribe(x => this.sizeChanged.next(x));

        this.initResizeSensor();
    }

    ngOnDestroy(): void {
        if (!this.resizeSubscription?.closed) {
            this.resizeSubscription?.unsubscribe();
        }
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
    }

    protected scheduleResizeAction(size: Size): void {
        this.resizeActionScheduler.emit(size);
    }

    private initResizeSensor() {

        this.resizeObserver = new ResizeObserver(entries => {
            const firstItem = entries[0];
            this.ngZone.run(() => {
                this.scheduleResizeAction({
                    width: firstItem.contentRect.width,
                    height: firstItem.contentRect.height,
                });
            });
        });

        this.resizeObserver.observe(this.elRef.nativeElement);
    }

}
