import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from "@angular/core";
import { distinctUntilHashChanged, observeAttribute$ } from "dgp-ng-app";
import { fabric } from "fabric";
import { combineLatest } from "rxjs";
import { debounceTime, shareReplay } from "rxjs/operators";
import { Image } from "../../models/image.model";
import { ImageConfigComponentBase } from "./image-config.component-base";
import { createRect, getFabricImageFromUrl$, isCanvasValid, renderImageToCanvas$ } from "../../functions";
import { ImageConfig, ImageRegion } from "../../models";

export function constrainRectScalingToContainer(event: fabric.IEvent) {
    const rectRef = event.target as fabric.Rect;
    const canvasRef = event.target.canvas as fabric.Canvas;

    const topBound = 0;
    const bottomBound = canvasRef.getHeight();
    const leftBound = 0;
    const rightBound = canvasRef.getWidth();

    if (rectRef.left < leftBound) {
        rectRef.left = leftBound;
    }

    if (rectRef.top < topBound) {
        rectRef.top = topBound;
    }

    if (rectRef.left + rectRef.getScaledWidth() > rightBound) {
        rectRef.left = rightBound - rectRef.getScaledWidth() > 0
            ? rightBound - rectRef.getScaledWidth() : 0;
    }

    if (rectRef.top + rectRef.getScaledHeight() > bottomBound) {
        rectRef.top = bottomBound - rectRef.getScaledHeight() > 0 ?
            bottomBound - rectRef.getScaledHeight() : 0;
    }
}

export function constrainRectMovingToContainer(e: fabric.IEvent) {
    const rectRef = e.target as fabric.Rect;
    const canvasRef = e.target.canvas as fabric.Canvas;

    const boundingRect = rectRef.getBoundingRect();

    const topBound = 0;
    const bottomBound = canvasRef.getHeight();
    const leftBound = 0;
    const rightBound = canvasRef.getWidth();

    if (rectRef.left < leftBound) {
        rectRef.left = leftBound;
    }

    if (rectRef.top < topBound) {
        rectRef.top = topBound;
    }

    if (rectRef.left + boundingRect.width > rightBound) {
        rectRef.left = rightBound - boundingRect.width;
    }

    if (rectRef.top + boundingRect.height > bottomBound) {
        rectRef.top = bottomBound - boundingRect.height;
    }
}

export function limitInteractionToContainer(canvas: fabric.Canvas) {
    canvas.on("object:moving", constrainRectMovingToContainer);
    canvas.on("object:scaling", constrainRectScalingToContainer);
}

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
export class DgpImageEditorComponent extends ImageConfigComponentBase implements Image {

    private currentFabricCanvas: fabric.Canvas;
    private rectsRef: ReadonlyArray<fabric.Rect>;

    @ViewChild("canvas", {static: true})
    readonly canvasElement: ElementRef;

    @Input()
    src: string;
    readonly src$ = observeAttribute$(this as DgpImageEditorComponent, "src");

    readonly stretch$ = observeAttribute$(this as DgpImageEditorComponent, "stretch");
    readonly offsetX$ = observeAttribute$(this as DgpImageEditorComponent, "offsetX");
    readonly offsetY$ = observeAttribute$(this as DgpImageEditorComponent, "offsetY");
    readonly rotationAngle$ = observeAttribute$(this as DgpImageEditorComponent, "rotationAngle");
    readonly rotationAngleType$ = observeAttribute$(this as DgpImageEditorComponent, "rotationAngleType");
    readonly scaleX$ = observeAttribute$(this as DgpImageEditorComponent, "scaleX");
    readonly scaleY$ = observeAttribute$(this as DgpImageEditorComponent, "scaleY");
    readonly regions$ = observeAttribute$(this as DgpImageEditorComponent, "regions");

    constructor() {
        super();

        combineLatest([
            this.src$,
            this.stretch$,
            this.offsetX$,
            this.offsetY$,
            this.rotationAngle$,
            this.rotationAngleType$,
            this.scaleX$,
            this.scaleY$,
            this.regions$
        ]).pipe(
            distinctUntilHashChanged(),
            debounceTime(250),
            shareReplay(1)
        ).subscribe(combination => {
            this.setupFabric$().then();
        });
    }


    async setupFabric$() {
        if (this.src) {
            await this.tryCreateFabric();
            return this.draw$();
        } else {
            return this.tryDestroyFabric$();
        }

    }

    private draw$(): Promise<void> {
        if (!this.currentFabricCanvas || !this.src) return Promise.resolve();

        this.unregisterListeners();
        return this.drawThingsOntoCanvas$(this.src, this.currentFabricCanvas);
    }

    async drawThingsOntoCanvas$(
        imageUrl: string,
        canvas: fabric.Canvas
    ): Promise<void> {

        if (!isCanvasValid(canvas)) return;

        const imageConfig: ImageConfig = this;
        const regions = this.regions;

        let image: fabric.Image;

        try {
            image = await getFabricImageFromUrl$(imageUrl);
        } catch (e) {
            console.error(e);
            return Promise.resolve();
        }

        try {
            await renderImageToCanvas$({canvas, image, imageConfig});
        } catch (e) {
            console.error(e);
            return Promise.resolve();
        }
        if (regions) {

            const rects = regions.map(region => {
                let fabricRect: fabric.Rect;

                fabricRect = createRect({region, canvas});

                /*
                                fabricRect = fabricRect.set({
                                    stroke: "",
                                    opacity: 0,
                                    selectable: false,
                                    hoverCursor: "default"
                                });*/


                // Disables selection of segments when logged out
                if (this.disabled) {
                    fabricRect.selectable = false;
                    fabricRect.hoverCursor = "default";
                }

                return fabricRect;
            });

            rects.forEach(rect => {
                rect.on("modified", this.rectUpdateHandler);
                if (isCanvasValid(canvas)) {
                    canvas.add(rect);
                }
            });

        }

        if (isCanvasValid(canvas)) {
            canvas.renderAll();
        }
    }

    private async tryCreateFabric() {
        await this.tryDestroyFabric$();

        this.currentFabricCanvas = new fabric.Canvas(this.canvasElement.nativeElement, {
            selection: false,
            renderOnAddRemove: true
        });

        limitInteractionToContainer(this.currentFabricCanvas);

        this.currentFabricCanvas.renderAll();
    }


    rectUpdateHandler = (e: fabric.IEvent) => {
        const rect = e.target as fabric.Rect;
        const region = e.target.data as ImageRegion;
        const canvas = e.target.canvas as fabric.Canvas;

        console.log(region);

        /*      const updatedImageSegment = resolveImageSegment({rect, canvas, imageSegment});
              this.setImageSegments(updatedImageSegment);*/
    };

    private tryDestroyFabric$() {
        this.unregisterListeners();
        if (this.currentFabricCanvas) {
            this.currentFabricCanvas.clear();
            this.currentFabricCanvas.dispose();
            this.currentFabricCanvas = null;
        }
        return Promise.resolve();
    }

    private unregisterListeners() {
        if (!this.rectsRef) return;
        this.rectsRef.forEach(rect => rect.off("modified"));
    }

}
