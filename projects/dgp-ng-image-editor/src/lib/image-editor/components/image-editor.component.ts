import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from "@angular/core";
import { AngleType, ImageRegion, Transform } from "../../models";
import { DgpModelEditorComponentBase, distinctUntilHashChanged, notNullOrUndefined, observeAttribute$ } from "dgp-ng-app";
import { fabric } from "fabric";
import { combineLatest } from "rxjs";
import { debounceTime, shareReplay } from "rxjs/operators";
import { Many } from "data-modeling";

export function isCanvasValid(canvas: fabric.Canvas) {
    return notNullOrUndefined(canvas)
        && notNullOrUndefined(canvas.getContext());
}

export function getFabricImageFromUrl$(imageUrl: string): Promise<fabric.Image> {
    return new Promise<fabric.Image>(resolve => {
        fabric.Image.fromURL(imageUrl, image => resolve(image));
    });
}

export function renderImageToCanvas$(payload: {
    readonly image: fabric.Image,
    readonly canvas: fabric.Canvas
}): Promise<void> {

    const scaleX = payload.canvas.getWidth() / payload.image.width;
    const scaleY = payload.canvas.getHeight() / payload.image.height;

    return new Promise<void>(resolve => {

        if (isCanvasValid(payload.canvas)) payload.canvas.clear();

        payload.canvas.setBackgroundImage(payload.image, () => {
            resolve();
        }, {
            lockRotation: true,
            scaleX,
            scaleY
        });

    });

}

export interface CreateRectPayload {
    readonly imageRegion: ImageRegion;
    readonly canvas: fabric.Canvas;
}

export function createRect(payload: CreateRectPayload): fabric.Rect {
    const imageSegment = payload.imageRegion;
    const canvas = payload.canvas;

    let referenceWidth = 1;
    let referenceHeight = 1;

    /* if (imageSegment.isNormalized) {
         referenceWidth = canvas.getWidth();
         referenceHeight = canvas.getHeight();
     }
 */
    const width = imageSegment.width * referenceWidth;
    const height = imageSegment.height * referenceHeight;
    const left = imageSegment.offsetX * referenceWidth;
    const top = imageSegment.offsetY * referenceHeight;

    return new fabric.Rect({
        strokeWidth: 1,
        stroke: "black",
        fill: "rgba(0,0,0,0)",
        width,
        height,
        left,
        top,
        data: imageSegment,
        lockRotation: true,
        lockScalingFlip: true,
        lockSkewingX: true,
        lockSkewingY: true
    });
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
export class DgpImageEditorComponent extends DgpModelEditorComponentBase<string> implements Transform {

    private currentFabricCanvas: fabric.Canvas;
    private rectsRef: ReadonlyArray<fabric.Rect>;

    @ViewChild("canvas", {static: true})
    readonly canvasElement: ElementRef;

    @Input()
    offsetX: number;
    readonly offsetX$ = observeAttribute$(this as DgpImageEditorComponent, "offsetX");

    @Input()
    offsetY: number;
    readonly offsetY$ = observeAttribute$(this as DgpImageEditorComponent, "offsetY");

    @Input()
    rotateX: number;
    readonly rotateX$ = observeAttribute$(this as DgpImageEditorComponent, "rotateX");

    @Input()
    rotateY: number;
    readonly rotateY$ = observeAttribute$(this as DgpImageEditorComponent, "rotateY");

    @Input()
    rotationAngle: number;
    readonly rotationAngle$ = observeAttribute$(this as DgpImageEditorComponent, "rotationAngle");

    @Input()
    rotationAngleType: AngleType;
    readonly rotationAngleType$ = observeAttribute$(this as DgpImageEditorComponent, "rotationAngleType");

    @Input()
    scaleX: number;
    readonly scaleX$ = observeAttribute$(this as DgpImageEditorComponent, "scaleX");

    @Input()
    scaleY: number;
    readonly scaleY$ = observeAttribute$(this as DgpImageEditorComponent, "scaleY");

    @Input()
    regions: Many<ImageRegion>;
    readonly regions$ = observeAttribute$(this as DgpImageEditorComponent, "regions");
    
    constructor() {
        super();

        combineLatest([
            this.model$,
            this.offsetX$,
            this.offsetY$,
            this.rotateX$,
            this.rotateY$,
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
        if (this.model) {
            await this.tryCreateFabric();
            return this.draw$();
        } else {
            return this.tryDestroyFabric$();
        }

    }

    private draw$(): Promise<void> {
        if (!this.currentFabricCanvas || !this.model) return Promise.resolve();


        this.unregisterListeners();
        return this.drawThingsOntoCanvas$(this.model, this.currentFabricCanvas);
    }

    async drawThingsOntoCanvas$(
        imageUrl: string,
        canvas: fabric.Canvas
    ): Promise<void> {

        if (!isCanvasValid(canvas)) return;

        let image: fabric.Image;

        try {
            image = await getFabricImageFromUrl$(imageUrl);
        } catch (e) {
            console.error(e);
            return Promise.resolve();
        }

        try {
            await renderImageToCanvas$({canvas, image});
        } catch (e) {
            console.error(e);
            return Promise.resolve();
        }
        /*
                const rects = imageSegments.map(imageSegment => {
                    let fabricRect: fabric.Rect;

                    fabricRect = createRect({imageSegment, canvas});

                    if (!imageSegment.isVisible) {
                        fabricRect = fabricRect.set({
                            stroke: "",
                            opacity: 0,
                            selectable: false,
                            hoverCursor: "default"
                        });
                    }

                    // Disables selection of segments when logged out
                    if (this.disabled) {
                        fabricRect.selectable = false;
                        fabricRect.hoverCursor = "default";
                    }

                    return fabricRect;
                });*/
        /*

                rects.forEach(rect => {
                    rect.on("modified", this.rectUpdateHandler);
                    if (isCanvasValid(canvas)) canvas.add(rect);
                });
        */

        if (isCanvasValid(canvas)) canvas.renderAll();
    }

    private async tryCreateFabric() {
        await this.tryDestroyFabric$();

        this.currentFabricCanvas = new fabric.Canvas(this.canvasElement.nativeElement, {
            selection: false,
            renderOnAddRemove: true
        });

        this.currentFabricCanvas.renderAll();
    }

    /*

        rectUpdateHandler = (e: fabric.IEvent) => {
            const rect = e.target as fabric.Rect;
            const imageSegment = e.target.data as ImageSegment;
            const canvas = e.target.canvas as fabric.Canvas;

            const updatedImageSegment = resolveImageSegment({rect, canvas, imageSegment});
            this.setImageSegments(updatedImageSegment);
        }
    */

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
