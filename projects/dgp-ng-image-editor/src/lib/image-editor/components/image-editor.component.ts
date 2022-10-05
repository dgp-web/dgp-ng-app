import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from "@angular/core";
import { distinctUntilHashChanged, observeAttribute$ } from "dgp-ng-app";
import { fabric } from "fabric";
import { combineLatest } from "rxjs";
import { debounceTime, shareReplay, switchMap } from "rxjs/operators";
import { Image } from "../../models/image.model";
import { ImageConfigComponentBase } from "./image-config.component-base";
import { createRect, getFabricImageFromUrl$, isCanvasValid, renderImageToCanvas$ } from "../../functions";
import { ImageConfig, ImageRegion } from "../../models";
import { Many } from "data-modeling";
import { unregisterObjectEvents } from "../../functions/unregister-object-events.function";
import { limitInteractionToContainer } from "../../functions/limit-interaction-to-container.function";
import { defaultCanvasOptions } from "../../constants/default-canvas-options.constant";

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
    private rectsRef: Many<fabric.Rect>;

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
    readonly disabled$ = observeAttribute$(this as DgpImageEditorComponent, "disabled");

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
            this.regions$,
            this.disabled$
        ]).pipe(
            distinctUntilHashChanged(),
            debounceTime(250),
            shareReplay(1),
            switchMap(() => this.setupFabric$())
        ).subscribe();
    }


    async setupFabric$() {
        if (this.src) {
            await this.tryCreateFabric$();
            return this.draw$();
        } else {
            return this.tryDestroyFabric$();
        }

    }

    private async draw$(): Promise<void> {
        if (!this.currentFabricCanvas || !this.src) return Promise.resolve();

        this.unregisterListeners();

        await drawThingsOntoCanvas$({
            src: this.src,
            canvas: this.currentFabricCanvas,
            imageConfig: this as ImageConfig,
            regions: this.regions
        });

        this.registerListeners();
    }


    private async tryCreateFabric$() {
        await this.tryDestroyFabric$();

        this.currentFabricCanvas = new fabric.Canvas(this.canvasElement.nativeElement, defaultCanvasOptions);

        limitInteractionToContainer(this.currentFabricCanvas);

        this.currentFabricCanvas.renderAll();
    }


    rectUpdateHandler = (e: fabric.IEvent) => {
        const rect = e.target as fabric.Rect;
        const region = e.target.data as ImageRegion;
        const canvas = e.target.canvas as fabric.Canvas;

        console.log(region);

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

export function registerUpdateHandler(handler: (e: fabric.IEvent) => void) {
    return (x: fabric.Object) => x.on("modified", handler);
}

async function tryDestroyCanvas$(canvas?: fabric.Canvas) {
    if (!canvas) return;

    canvas.getObjects().forEach(unregisterObjectEvents);
    canvas.clear();
    canvas.dispose();
}

export function toRectWith(canvas: fabric.Canvas) {
    return (region: ImageRegion) => createRect({region, canvas});
}

export async function drawThingsOntoCanvas$(payload: {
    readonly src: string;
    readonly canvas: fabric.Canvas;
    readonly imageConfig: ImageConfig;
    readonly regions?: Many<ImageRegion>;
}): Promise<void> {

    const src = payload.src;
    const canvas = payload.canvas;
    const imageConfig = payload.imageConfig;
    const regions = payload.regions;

    if (!isCanvasValid(canvas)) return;

    let image: fabric.Image;

    try {
        image = await getFabricImageFromUrl$(src);
        await renderImageToCanvas$({canvas, image, imageConfig});
    } catch (e) {
        console.error(e);
        return;
    }

    if (isCanvasValid(canvas)) {

        if (regions) {
            const rects = regions.map(toRectWith(canvas));
            rects.forEach(tryAddTo(canvas));
        }

        canvas.renderAll();
    }
}

export function tryAddTo(payload: fabric.Canvas) {
    return (rect: fabric.Object) => {
        if (!isCanvasValid(payload)) return;
        payload.add(rect);
    };
}
