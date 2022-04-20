import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, NgZone, OnDestroy, Output } from "@angular/core";
import { Size } from "../models/size.model";
import { ResizeSensor, ResizeSensorConfig } from "../services/resize-sensor.service";

/**
 * Angular wrapper around the excellent library "css-element-queries"
 * https://github.com/marcj/css-element-queries
 */
@Directive({
    selector: "[dgpResizeSensor]"
})
export class DgpResizeSensorDirective implements AfterViewInit, OnDestroy, ResizeSensorConfig {

    private sensor: ResizeSensor;

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
        this.sensor = new ResizeSensor(this.elRef.nativeElement, x => {
            this.ngZone.run(() => this.sizeChanged.next(x));
        });
        this.sensor.configure({
            stableTime: this.stableTime
        });
        this.sensor.connect();
    }

    ngOnDestroy(): void {

        if (this.sensor) {
            this.sensor.disconnect();
        }
    }

}
