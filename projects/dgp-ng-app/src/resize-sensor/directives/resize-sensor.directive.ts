import { AfterViewInit, Directive, ElementRef, EventEmitter, OnDestroy, Output } from "@angular/core";
import { debounceTime, startWith, switchMap, tap } from "rxjs/operators";
import { ResizeSensor } from "css-element-queries";
import { from, interval, Subscription } from "rxjs";
import { there } from "../../utils/there.function";

export interface Size {
    readonly width: number;
    readonly  height: number;
}

export function getInitialSizeFromElRef(payload: ElementRef): Size {
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

    private resizeSensor: ResizeSensor;
    private resizeObserver: ResizeObserver;
    private readonly resizeActionScheduler = new EventEmitter<Size>();
    private resizeSubscription: Subscription;
    private checkBrokenResizeSensorSubscription: Subscription;
    private isInitialResize = true;

    @Output()
    readonly sizeChanged = new EventEmitter<Size>();

    private readonly onResize = (size: Size) => this.scheduleResizeAction(size);

    constructor(
        readonly elRef: ElementRef
    ) {

    }

    ngAfterViewInit(): void {

        this.resizeSubscription = this.resizeActionScheduler.pipe(
            startWith(getInitialSizeFromElRef(this.elRef)),
            debounceTime(250),
            switchMap(size => from(this.doResize(size)))
        )
            .subscribe();

        // TODO: mb trim
        this.checkBrokenResizeSensorSubscription = interval(1000)
            .pipe(
                tap(() => {
                    try {
                        this.resizeSensor?.reset();
                    } catch (e) {
                    }
                })
            )
            .subscribe();

        this.initResizeSensor();
    }

    ngOnDestroy(): void {
        if (!this.resizeSubscription?.closed) {
            this.resizeSubscription?.unsubscribe();
        }
        if (!this.checkBrokenResizeSensorSubscription?.closed) {
            this.checkBrokenResizeSensorSubscription?.unsubscribe();
        }
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
    }

    async doResize(size: Size): Promise<void> {
        // this.resizeSensor.detach(this.onResize);
        // await timer(0).toPromise();

        this.sizeChanged.next(size);

        // this.isInitialResize = true;
        // this.resizeSensor = new ResizeSensor(this.elRef.nativeElement, this.onResize);
    }

    protected scheduleResizeAction(size: Size): void {
        if (this.isInitialResize) {
            this.isInitialResize = false;
            return;
        }
        this.resizeActionScheduler.emit(size);
    }

    private initResizeSensor() {
        if (there(this.resizeSensor) && there(this.onResize)) {
            // this.resizeSensor.detach(this.onResize);
        }

        this.resizeObserver = new ResizeObserver(entries => {
            const firstItem = entries[0];
            this.onResize({
                width: firstItem.contentRect.width,
                height: firstItem.contentRect.height,
            });
        });

        this.resizeObserver.observe(this.elRef.nativeElement);

        // this.resizeSensor = new ResizeSensor(this.elRef.nativeElement, this.onResize);
    }

}
