import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from "@angular/core";
import { distinctUntilHashChanged, observeAttribute$ } from "dgp-ng-app";
import { fabric } from "fabric";
import { combineLatest } from "rxjs";
import { debounceTime, shareReplay } from "rxjs/operators";
import { Image } from "../../models/image.model";
import { ImageConfigComponentBase } from "./image-config.component-base";
import { getFabricImageFromUrl$, isCanvasValid, renderImageToCanvas$ } from "../../functions";
import { ImageConfig } from "../../models";

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
