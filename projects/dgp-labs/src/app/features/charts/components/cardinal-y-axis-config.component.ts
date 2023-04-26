import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DgpModelEditorComponentBase } from "dgp-ng-app";
import { CardinalYAxis, ScaleType } from "dgp-ng-charts";
import {
    cardinalYAxisMetadata
} from "../../../../../../dgp-ng-charts/src/lib/connected-scatter-plot/constants/cardinal-y-axis-metadata.constant";

@Component({
    selector: "dgp-cardinal-y-axis-config",
    template: `
        <dgp-inspector>
            <dgp-inspector-section [metadata]="metadata">

                <dgp-inspector-item label="Title"
                                    matIconName="label">
                                    <textarea [disabled]="disabled"
                                              [ngModel]="model.yAxisTitle"
                                              (ngModelChange)="updateYAxisTitle($event)"></textarea>
                </dgp-inspector-item>

                <dgp-inspector-item label="Scale"
                                    matIconName="linear_scale">
                    <select [disabled]="disabled"
                            [ngModel]="model.yAxisScaleType"
                            (ngModelChange)="updateYAxisScaleType($event)">
                        <option [ngValue]="scaleTypeEnum.Linear">
                            Linear
                        </option>
                        <option [ngValue]="scaleTypeEnum.Logarithmic">
                            Logarithmic
                        </option>
                    </select>
                </dgp-inspector-item>

                <dgp-inspector-item [metadata]="metadata.attributes.yAxisMax">
                    <input type="number"
                           [disabled]="disabled"
                           [ngModel]="model.yAxisMax"
                           (ngModelChange)="setYAxisMax($event)">
                </dgp-inspector-item>

                <dgp-inspector-item [metadata]="metadata.attributes.yAxisMin">
                    <input type="number"
                           [disabled]="disabled"
                           [ngModel]="model.yAxisMin"
                           (ngModelChange)="setYAxisMin($event)">
                </dgp-inspector-item>

                <dgp-inspector-item [metadata]="metadata.attributes.yAxisStep">
                    <input type="number"
                           [disabled]="disabled"
                           [ngModel]="model.yAxisStep"
                           (ngModelChange)="setYAxisStep($event)">
                </dgp-inspector-item>

                <dgp-inspector-item label="Grid lines"
                                    matIconName="border_vertical">
                    <input type="checkbox"
                           [disabled]="disabled"
                           [ngModel]="model.showYAxisGridLines"
                           (ngModelChange)="setShowYAxisGridLines($event)">
                </dgp-inspector-item>

            </dgp-inspector-section>
        </dgp-inspector>
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardinalYAxisConfigComponent extends DgpModelEditorComponentBase<CardinalYAxis> {
    readonly metadata = cardinalYAxisMetadata;
    readonly scaleTypeEnum = ScaleType;

    updateYAxisTitle(yAxisTitle: string) {
        this.updateModel({yAxisTitle});
    }

    updateYAxisScaleType(yAxisScaleType: ScaleType) {
        this.updateModel({yAxisScaleType});
    }

    setYAxisMin(yAxisMin: number) {
        this.updateModel({yAxisMin});
    }

    setYAxisMax(yAxisMax: number) {
        this.updateModel({yAxisMax});
    }

    setShowYAxisGridLines(showYAxisGridLines: boolean) {
        this.updateModel({showYAxisGridLines});
    }

    setYAxisStep(yAxisStep: number) {
        this.updateModel({yAxisStep});
    }
}
