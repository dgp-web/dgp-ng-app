import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from "@angular/core";
import { distinctUntilHashChanged, observeAttribute$ } from "dgp-ng-app";
import { fabric } from "fabric";
import { combineLatest } from "rxjs";
import { debounceTime, shareReplay, switchMap } from "rxjs/operators";
import { Image } from "../../models/image.model";
import { ImageConfigComponentBase } from "./image-config.component-base";
import { ImageConfig, ImageRegion } from "../../models";
import { unregisterObjectEvents } from "../../functions/unregister-object-events.function";
import { tryDestroyCanvas$ } from "../../functions/try-destroy-canvas$.function";
import { registerUpdateHandler } from "../../functions/register-update-handler.function";
import { drawThingsOnCanvas$ } from "../../functions/draw-things-on-canvas.function";
import { createCanvas } from "../../functions/create-canvas-function";

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

    @ViewChild("canvas", {static: true})
    readonly canvasElement: ElementRef<HTMLCanvasElement>;

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
            switchMap(() => this.executeFabricLifecycle$())
        ).subscribe();
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
        const region = e.target.data as ImageRegion;
        const canvas = e.target.canvas as fabric.Canvas;

        console.log(region === this.regions[0]);

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


