import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DgpModelEditorComponentBase } from "dgp-ng-app";
import { CardinalXAxis, ScaleType } from "dgp-ng-charts";
import {
    cardinalXAxisMetadata
} from "../../../../../../dgp-ng-charts/src/lib/connected-scatter-plot/constants/cardinal-x-axis-metadata.constant";

@Component({
    selector: "dgp-cardinal-x-axis-config",
    template: `
        <dgp-inspector>
            <dgp-inspector-section [metadata]="metadata">

                <dgp-inspector-item label="Title"
                                    matIconName="label">
                    <input [disabled]="disabled"
                           [ngModel]="model.xAxisTitle"
                           (ngModelChange)="updateXAxisTitle($event)">
                </dgp-inspector-item>

                <dgp-inspector-item label="Scale"
                                    matIconName="linear_scale">
                    <select [disabled]="disabled"
                            [ngModel]="model.xAxisScaleType"
                            (ngModelChange)="updateXAxisScaleType($event)">
                        <option [ngValue]="scaleTypeEnum.Linear">
                            Linear
                        </option>
                        <option [ngValue]="scaleTypeEnum.Logarithmic">
                            Logarithmic
                        </option>
                    </select>
                </dgp-inspector-item>

                <dgp-inspector-item [metadata]="metadata.attributes.xAxisMax">
                    <input type="number"
                           [disabled]="disabled"
                           [ngModel]="model.xAxisMax"
                           (ngModelChange)="setXAxisMax($event)">
                </dgp-inspector-item>

                <dgp-inspector-item [metadata]="metadata.attributes.xAxisMin">
                    <input type="number"
                           [disabled]="disabled"
                           [ngModel]="model.xAxisMin"
                           (ngModelChange)="setXAxisMin($event)">
                </dgp-inspector-item>

                <dgp-inspector-item [metadata]="metadata.attributes.xAxisStep">
                    <input type="number"
                           [disabled]="disabled"
                           [ngModel]="model.xAxisStep"
                           (ngModelChange)="setXAxisStep($event)">
                </dgp-inspector-item>

                <dgp-inspector-item label="Grid lines"
                                    matIconName="border_vertical">
                    <mat-slide-toggle [disabled]="disabled"
                                      [ngModel]="model.showXAxisGridLines"
                                      (ngModelChange)="setShowXAxisGridLines($event)"></mat-slide-toggle>
                </dgp-inspector-item>

            </dgp-inspector-section>
        </dgp-inspector>
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardinalXAxisConfigComponent extends DgpModelEditorComponentBase<CardinalXAxis> {
    readonly metadata = cardinalXAxisMetadata;
    readonly scaleTypeEnum = ScaleType;

    updateXAxisTitle(xAxisTitle: string) {
        this.updateModel({xAxisTitle});
    }

    updateXAxisScaleType(xAxisScaleType: ScaleType) {
        this.updateModel({xAxisScaleType});
    }

    setXAxisMin(xAxisMin: number) {
        this.updateModel({xAxisMin});
    }

    setXAxisMax(xAxisMax: number) {
        this.updateModel({xAxisMax});
    }

    setShowXAxisGridLines(showXAxisGridLines: boolean) {
        this.updateModel({showXAxisGridLines});
    }

    setXAxisStep(xAxisStep: number) {
        this.updateModel({xAxisStep});
    }
}
