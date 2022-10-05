import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DgpModelEditorComponentBase } from "dgp-ng-app";
import { ImageConfig } from "../../models";
import { ModelMetadata } from "data-modeling";

export const imageConfigMetadata: ModelMetadata<ImageConfig> = {
    attributes: {
        stretch: {
            label: "Stretch image",
            icon: "open_in_full"
        },
        offsetX: {
            label: "Offset X",
            type: "number",
            icon: "arrow_downward"
        },
        offsetY: {
            label: "Offset Y",
            type: "number",
            icon: "arrow_forward"
        },
        scaleX: {
            label: "Scale X",
            type: "number",
            icon: "space_bar"
        },
        scaleY: {
            label: "Scale Y",
            type: "number",
            icon: "height"
        },
        rotationAngle: {
            label: "Rotation angle",
            icon: "rotate_right",
            type: "number"
        }
    }
};

@Component({
    selector: "dgp-image-config",
    template: `
        <dgp-input-field [metadata]="metadata.attributes.stretch">
            <dgp-spacer></dgp-spacer>
            <mat-slide-toggle [ngModel]="model.stretch"
                              [disabled]="disabled"
                              (ngModelChange)="updateStretch($event)"></mat-slide-toggle>
        </dgp-input-field>

        <dgp-input-field [metadata]="metadata.attributes.offsetX">
            <input type="number"
                   [ngModel]="model.offsetX"
                   [disabled]="disabled"
                   (ngModelChange)="updateOffsetX($event)"
                   dgpInputMetadata
                   [metadata]="metadata.attributes.offsetX">
        </dgp-input-field>

        <dgp-input-field [metadata]="metadata.attributes.offsetY">
            <input type="number"
                   [ngModel]="model.offsetY"
                   [disabled]="disabled"
                   (ngModelChange)="updateOffsetY($event)"
                   dgpInputMetadata
                   [metadata]="metadata.attributes.offsetY">
        </dgp-input-field>

        <dgp-input-field [metadata]="metadata.attributes.scaleX">
            <input type="number"
                   [ngModel]="model.scaleX"
                   [disabled]="disabled"
                   (ngModelChange)="updateScaleX($event)"
                   dgpInputMetadata
                   [metadata]="metadata.attributes.scaleX">
        </dgp-input-field>

        <dgp-input-field [metadata]="metadata.attributes.scaleY">
            <input type="number"
                   [ngModel]="model.scaleY"
                   [disabled]="disabled"
                   (ngModelChange)="updateScaleY($event)"
                   dgpInputMetadata
                   [metadata]="metadata.attributes.scaleY">
        </dgp-input-field>

        <dgp-input-field [metadata]="metadata.attributes.rotationAngle">
            <input type="number"
                   [ngModel]="model.rotationAngle"
                   [disabled]="disabled"
                   (ngModelChange)="updateRotationAngle($event)"
                   dgpInputMetadata
                   [metadata]="metadata.attributes.rotationAngle">
        </dgp-input-field>
    `,
    styles: [`
        mat-slide-toggle {
            align-self: end;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgpImageConfigComponent extends DgpModelEditorComponentBase<ImageConfig> {

    readonly metadata = imageConfigMetadata;

    updateStretch(stretch?: boolean) {
        this.updateModel({stretch});
    }

    updateOffsetX(offsetX?: number) {
        this.updateModel({offsetX});
    }

    updateOffsetY(offsetY?: number) {
        this.updateModel({offsetY});
    }

    updateScaleX(scaleX?: number) {
        this.updateModel({scaleX});
    }

    updateScaleY(scaleY?: number) {
        this.updateModel({scaleY});
    }

    updateRotationAngle(rotationAngle?: number) {
        this.updateModel({rotationAngle});
    }

}
