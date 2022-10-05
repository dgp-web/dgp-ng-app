import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from "@angular/core";
import { AngleType, Transform } from "../../models";
import { observeAttribute$ } from "dgp-ng-app";

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
export class DgpImageEditorComponent implements Transform {

    @ViewChild("canvas", {static: true})
    readonly canvasElement: ElementRef;

    @Input()
    src: string;
    readonly src$ = observeAttribute$(this as DgpImageEditorComponent, "src");

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

}
