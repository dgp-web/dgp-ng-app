import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DgpModelEditorComponentBase, isNullOrUndefined } from "dgp-ng-app";
import { ConnectedScatterGroup, ConnectedScatterPlot, ConnectedScatterPlotControlLine, ScaleType, Shape } from "dgp-ng-charts";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { testConnectedScatterPlot } from "../../../__tests__/constants/test-connected-scatter-plot.constant";
import {
    connectedScatterPlotMetadata
} from "../../../../../../dgp-ng-charts/src/lib/connected-scatter-plot/constants/connected-scatter-plot-metadata.constant";

@Component({
    selector: "dgp-connected-scatter-plot-config",
    template: `
        <dgp-inspector class="--dynamic-form-fields"
                       [responsive]="true">
            <dgp-inspector-section label="General"
                                   matIconName="info">
                <dgp-inspector-item [metadata]="cspMetadata.attributes.chartTitle">
                    <input [disabled]="disabled"
                           [ngModel]="model.chartTitle"
                           (ngModelChange)="updateChartTitle($event)">
                </dgp-inspector-item>


                <dgp-inspector-item label="Dot size"
                                    matIconName="label">
                    <input type="number"
                           [disabled]="disabled"
                           [ngModel]="model.dotSize"
                           (ngModelChange)="setDotSize($event)">
                </dgp-inspector-item>

                <dgp-inspector-item label="Show dot tooltips"
                                    matIconName="info">
                    <input type="checkbox"
                           [disabled]="disabled"
                           [ngModel]="model.showDotTooltips"
                           (ngModelChange)="setShowDotTooltips($event)">
                </dgp-inspector-item>

                <dgp-inspector-item label="Line width"
                                    matIconName="label">
                    <input type="number"
                           [disabled]="disabled"
                           [ngModel]="model.lineWidth"
                           (ngModelChange)="setLineWidth($event)">
                </dgp-inspector-item>
            </dgp-inspector-section>

        </dgp-inspector>

        <dgp-cardinal-x-axis-config [model]="model"
                                    (modelChange)="setModel($event)"
                                    [disabled]="disabled"></dgp-cardinal-x-axis-config>

        <dgp-cardinal-y-axis-config [model]="model"
                                    (modelChange)="setModel($event)"
                                    [disabled]="disabled"></dgp-cardinal-y-axis-config>

        <dgp-inspector>

            <dgp-inspector-section matIconName="storage"
                                   label="Data groups">

                <dgp-inspector-item matIconName="stacked_line_chart"
                                    label="Group">
                    <select [ngModel]="selectedDataGroupId$ | async"
                            (ngModelChange)="selectDataGroupId($event)"
                            [disabled]="disabled">
                        <option *ngFor="let group of model.model; let i = index"
                                [ngValue]="group.connectedScatterGroupId">
                            Group: {{i + 1}}
                        </option>
                    </select>
                </dgp-inspector-item>


                <dgp-connected-scatter-group-form
                    *ngIf="selectedDataGroup$ | async as selectedDataGroup"
                    [model]="selectedDataGroup"
                    (modelChange)="updateSelectedGroup($event)"
                    [disabled]="disabled"></dgp-connected-scatter-group-form>

            </dgp-inspector-section>

            <dgp-inspector-section label="Control lines"
                                   matIconName="vertical_distribute">

                <dgp-inspector-item matIconName="horizontal_rule"
                                    label="Selected line">
                    <select [disabled]="disabled"
                            [ngModel]="selectedControlLineId$ | async"
                            (ngModelChange)="selectControlLine($event)">
                        <option *ngFor="let controlLine of model.controlLines"
                                [ngValue]="controlLine.connectedScatterPlotControlLineId">
                            {{controlLine.label}}
                        </option>
                    </select>
                </dgp-inspector-item>

                <!-- dgp-control-line-form -->
                <ng-container *ngIf="selectedControlLine$ | async as selectedControlLine">
                    <dgp-inspector-item [metadata]="cspMetadata.attributes.controlLines.item.attributes.label">
                        <input [ngModel]="selectedControlLine.label"
                               [disabled]="disabled"
                               (ngModelChange)="updateSelectedControlLineLabel($event)">
                    </dgp-inspector-item>

                    <dgp-inspector-item [metadata]="cspMetadata.attributes.controlLines.item.attributes.value">
                        <input type="number"
                               [ngModel]="selectedControlLine.value"
                               [disabled]="disabled"
                               (ngModelChange)="updateSelectedControlLineValue($event)">
                    </dgp-inspector-item>

                    <dgp-inspector-item [metadata]="cspMetadata.attributes.controlLines.item.attributes.colorHex">
                        <input type="color"
                               [ngModel]="selectedControlLine.colorHex"
                               [disabled]="disabled"
                               (ngModelChange)="updateSelectedControlLineColorHex($event)">
                    </dgp-inspector-item>

                </ng-container>

            </dgp-inspector-section>

        </dgp-inspector>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            height: 100%;
            overflow: auto;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectedScatterPlotConfigComponent extends DgpModelEditorComponentBase<ConnectedScatterPlot> {

    readonly cspMetadata = connectedScatterPlotMetadata;

    readonly scaleTypeEnum = ScaleType;
    readonly selectedControlLineId$ = new BehaviorSubject<string>(null);
    readonly selectedControlLine$ = this.selectedControlLineId$.pipe(
        map(controlLineId => {
            if (!controlLineId || !this.model || !this.model.controlLines) return null;

            return this.model.controlLines.find(x => x.connectedScatterPlotControlLineId === controlLineId);
        })
    );
    readonly selectedDataGroupId$ = new BehaviorSubject<string>(null);
    readonly selectedDataGroup$ = this.selectedDataGroupId$.pipe(
        map(dataGroupId => {

            if (!dataGroupId || !this.model || !this.model.model) return null;

            return this.model.model.find(x => x.connectedScatterGroupId === dataGroupId);

        })
    );

    constructor() {
        super();

        this.model = testConnectedScatterPlot;
    }

    updateChartTitle(chartTitle: string) {
        this.updateModel({chartTitle});
    }

    updateYAxisTitle(yAxisTitle: string) {
        this.updateModel({yAxisTitle});
    }

    setYAxisMin(yAxisMin: number) {
        this.updateModel({yAxisMin});
    }

    setYAxisMax(yAxisMax: number) {
        this.updateModel({yAxisMax});
    }

    updateYAxisScaleType(yAxisScaleType: ScaleType) {
        this.updateModel({yAxisScaleType});
    }

    setShowYAxisGridLines(showYAxisGridLines: boolean) {
        this.updateModel({showYAxisGridLines});
    }

    selectControlLine(controlLineId: string) {
        this.selectedControlLineId$.next(controlLineId);
    }

    updateSelectedControlLine(payload: Partial<ConnectedScatterPlotControlLine>) {

        const selectedId = this.selectedControlLineId$.value;

        this.updateModel({
            controlLines: this.model.controlLines.map(x => {
                if (x.connectedScatterPlotControlLineId !== selectedId) return x;
                return {...x, ...payload};
            })
        });

    }

    updateSelectedControlLineLabel(label: string) {
        this.updateSelectedControlLine({label});
    }

    updateSelectedControlLineValue(value: number) {
        this.updateSelectedControlLine({value});
    }

    updateSelectedControlLineColorHex(colorHex: string) {
        this.updateSelectedControlLine({colorHex});
    }

    selectDataGroupId(connectedScatterGroupId: string) {
        this.selectedDataGroupId$.next(connectedScatterGroupId);
    }

    updateSelectedGroup(payload: Partial<ConnectedScatterGroup>) {
        const selectedId = this.selectedDataGroupId$.value;

        this.updateModel({
            model: this.model.model.map(x => {
                if (x.connectedScatterGroupId !== selectedId) return x;
                return {...x, ...payload};
            })
        });

    }

    updateSelectedGroupShape(shape: Shape) {
        this.updateSelectedGroup({shape});
    }

    updateSelectedGroupColorHex(colorHex: any) {
        this.updateSelectedGroup({colorHex});
    }

    setYAxisTicks(yAxisStep: number) {
        this.updateModel({yAxisStep});
    }

    updateSelectedGroupShowVertices(showVertices: boolean) {
        this.updateSelectedGroup({showVertices});
    }

    updateSelectedGroupShowEdges(showEdges: boolean) {
        this.updateSelectedGroup({showEdges});
    }

    showVertices(selectedDataGroup: ConnectedScatterGroup) {
        return isNullOrUndefined(selectedDataGroup.showVertices) || selectedDataGroup.showVertices;
    }

    showEdges(selectedDataGroup: ConnectedScatterGroup) {
        return isNullOrUndefined(selectedDataGroup.showEdges) || selectedDataGroup.showEdges;
    }

    setDotSize(dotSize: number) {
        this.updateModel({dotSize});
    }

    setLineWidth(lineWidth: number) {
        this.updateModel({lineWidth});
    }

    setShowDotTooltips(showDotTooltips: boolean) {
        this.updateModel({showDotTooltips});
    }
}
