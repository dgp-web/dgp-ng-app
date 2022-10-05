import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewChild
} from "@angular/core";
import { getHashCode, notNullOrUndefined } from "dgp-ng-app";
import { fabric } from "fabric";
import { Subject } from "rxjs";
import { debounceTime, switchMap } from "rxjs/operators";
import { Image } from "../../models/image.model";
import { ImageConfigComponentBase } from "./image-config.component-base";
import { ImageConfig, ImageRegion } from "../../models";
import { unregisterObjectEvents } from "../../functions/unregister-object-events.function";
import { tryDestroyCanvas$ } from "../../functions/try-destroy-canvas$.function";
import { registerUpdateHandler } from "../../functions/register-update-handler.function";
import { drawThingsOnCanvas$ } from "../../functions/draw-things-on-canvas.function";
import { createCanvas } from "../../functions/create-canvas-function";
import { Many } from "data-modeling";

@Component({
    selector: "dgp-image-editor",
    template: `
        <canvas #canvas></canvas>
    `,
    styles: [`
        :host {
            display: flex;
            flex-grow: 1;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgpImageEditorComponent extends ImageConfigComponentBase implements Image, OnChanges {

    private currentFabricCanvas: fabric.Canvas;

    @ViewChild("canvas", {static: true})
    readonly canvasElement: ElementRef<HTMLCanvasElement>;

    @Input()
    src: string;

    @Output()
    readonly regionsChange = new EventEmitter<Many<ImageRegion>>();

    private readonly scheduler = new Subject();

    constructor() {
        super();

        this.scheduler.pipe(
            debounceTime(250),
            switchMap(() => this.executeFabricLifecycle$())
        ).subscribe();
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (
            changes["src" as keyof DgpImageEditorComponent]
            || changes["stretch" as keyof DgpImageEditorComponent]
            || changes["offsetX" as keyof DgpImageEditorComponent]
            || changes["offsetY" as keyof DgpImageEditorComponent]
            || changes["rotationAngle" as keyof DgpImageEditorComponent]
            || changes["rotationAngleType" as keyof DgpImageEditorComponent]
            || changes["scaleX" as keyof DgpImageEditorComponent]
            || changes["scaleY" as keyof DgpImageEditorComponent]
            || changes["regions" as keyof DgpImageEditorComponent]
            || changes["disabled" as keyof DgpImageEditorComponent]
        ) {
            // TODO: Investigate why changes trigger!

            this.scheduler.next();
        }

    }

    updateRegion(payload?: ImageRegion) {
        const updatedRegions = this.regions.map(x => {
            if (x.imageRegionId !== x.imageRegionId) return x;
            return payload;
        });
        this.updateRegions(updatedRegions);
    }

    updateRegions(payload?: Many<ImageRegion>) {
        if (getHashCode(payload) === getHashCode(this.regions)) return;

        this.regions = payload;
        this.regionsChange.emit(payload);
    }

    async executeFabricLifecycle$() {
        await this.tryDestroyFabric$();

        if (!this.src) return;
        await this.tryCreateFabric$();
        await this.draw$();
    }

    private async draw$(): Promise<void> {
        if (!this.currentFabricCanvas || !this.src) return Promise.resolve();

        this.unregisterListeners();

        await drawThingsOnCanvas$({
            src: this.src,
            canvas: this.currentFabricCanvas,
            imageConfig: this as ImageConfig,
            regions: this.regions
        });

        this.registerListeners();
    }


    private async tryCreateFabric$() {
        this.currentFabricCanvas = createCanvas(this.canvasElement.nativeElement);
    }


    rectUpdateHandler = (e: fabric.IEvent) => {
        const rect = e.target as fabric.Rect;
        const imageRegion = e.target.data as ImageRegion;
        const canvas = e.target.canvas as fabric.Canvas;

        const updatedRegion = resolveImageRegion({imageRegion, rect, canvas});
        this.updateRegion(updatedRegion);
    };

    private async tryDestroyFabric$() {
        return tryDestroyCanvas$(this.currentFabricCanvas);
    }

    private registerListeners() {
        this.currentFabricCanvas
            .getObjects()
            .forEach(registerUpdateHandler(this.rectUpdateHandler));
    }

    private unregisterListeners() {
        this.currentFabricCanvas
            .getObjects()
            .forEach(unregisterObjectEvents);
    }

}


export function resolveSizeValue(currentValue: number, referenceValue: number): number {
    if (notNullOrUndefined(referenceValue) && currentValue > referenceValue) currentValue = referenceValue;
    return currentValue / referenceValue;
}

export function resolvePositionValue(currentValue: number, referenceValue: number): number {
    if (currentValue < 0) currentValue = 0;
    return currentValue / referenceValue;
}

export function resolveImageRegion(payload: {
    readonly imageRegion: ImageRegion;
    readonly rect: fabric.Rect;
    readonly canvas: fabric.Canvas;
}): ImageRegion {
    const imageRegion = payload.imageRegion;
    const canvas = payload.canvas;
    const boundingRect = payload.rect.getBoundingRect();

    if (boundingRect.width > canvas?.getWidth()) {
        boundingRect.width = canvas?.getWidth();
    }

    if (imageRegion.isNormalized) {
        return {
            ...imageRegion,
            width: resolveSizeValue(boundingRect.width, canvas?.getWidth()),
            height: resolveSizeValue(boundingRect.height, canvas?.getHeight()),
            offsetX: resolvePositionValue(boundingRect.left, canvas?.getWidth()),
            offsetY: resolvePositionValue(boundingRect.top, canvas?.getHeight())
        };
    } else {
        return {
            ...imageRegion,
            width: boundingRect.width,
            height: boundingRect.height,
            offsetX: boundingRect.left,
            offsetY: boundingRect.top
        };
    }
}

