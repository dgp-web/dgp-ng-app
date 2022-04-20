import { Subject, Subscription } from "rxjs";
import { Size } from "../models/size.model";
import { debounceTime, startWith } from "rxjs/operators";
import { getInitialSize } from "../functions/get-initial-size-from-el-ref.function";

export interface ResizeSensorConfig {
    readonly stableTime: number;
}

export const defaultResizeSensorConfig: ResizeSensorConfig = {
    stableTime: 250
};

export class ResizeSensor {

    private readonly resizeActionScheduler = new Subject<Size>();

    private resizeObserver: ResizeObserver;
    private resizeSubscription: Subscription;

    private config = defaultResizeSensorConfig;

    constructor(
        private readonly element: HTMLElement,
        private readonly callback: (size: Size) => void
    ) {
    }

    configure(payload: ResizeSensorConfig) {
        this.config = payload;
    }

    connect() {
        this.resizeSubscription = this.resizeActionScheduler.pipe(
            startWith(getInitialSize(this.element)),
            debounceTime(this.config.stableTime)
        ).subscribe(x => this.callback(x));

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
