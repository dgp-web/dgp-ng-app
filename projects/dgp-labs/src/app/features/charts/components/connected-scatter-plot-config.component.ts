import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DgpModelEditorComponentBase, isNullOrUndefined } from "dgp-ng-app";
import { ConnectedScatterGroup, ConnectedScatterPlot, ConnectedScatterPlotControlLine, ScaleType, Shape } from "dgp-ng-charts";
import { connectedScatterPlotMetadata } from "../../../constants/connected-scatter-plot/connected-scatter-plot-metadata.constant";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { testConnectedScatterPlot } from "../../../__tests__/constants/test-connected-scatter-plot.constant";

@Component({
    selector: "dgp-connected-scatter-plot-config",
    template: `
        <dgp-inspector class="--dynamic-form-fields"
                       [responsive]="true">
            <dgp-inspector-section label="General"
                                   matIconName="info">
                <dgp-inspector-item [metadata]="cspMetadata.attributes.chartTitle">
                                    <textarea [disabled]="disabled"
                                              [ngModel]="model.chartTitle"
                                              (ngModelChange)="updateChartTitle($event)"></textarea>
                </dgp-inspector-item>


                <dgp-inspector-item label="Dot size"
                                    matIconName="label">
                    <input type="number"
                           [disabled]="disabled"
                           [ngModel]="model.dotSize"
                           (ngModelChange)="setDotSize($event)">
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

                <ng-container *ngIf="selectedDataGroup$ | async as selectedDataGroup">

                    <dgp-inspector-item label="Shape"
                                        matIconName="category">
                        <dgp-shape-select [model]="selectedDataGroup.shape"
                                          [disabled]="disabled"
                                          (modelChange)="updateSelectedGroupShape($event)"></dgp-shape-select>
                    </dgp-inspector-item>

                    <dgp-inspector-item matIconName="palette"
                                        label="Color">
                        <input type="color"
                               [ngModel]="selectedDataGroup.colorHex"
                               [disabled]="disabled"
                               (ngModelChange)="updateSelectedGroupColorHex($event)">
                    </dgp-inspector-item>

                    <dgp-inspector-item matIconName="scatter_plot"
                                        label="Show vertices">
                        <mat-slide-toggle [disabled]="disabled"
                                          [ngModel]="showVertices(selectedDataGroup)"
                                          (ngModelChange)="updateSelectedGroupShowVertices($event)"></mat-slide-toggle>
                    </dgp-inspector-item>

                    <dgp-inspector-item matIconName="show_chart"
                                        label="Show edges">
                        <mat-slide-toggle [disabled]="disabled"
                                          [ngModel]="showEdges(selectedDataGroup)"
                                          (ngModelChange)="updateSelectedGroupShowEdges($event)"></mat-slide-toggle>
                    </dgp-inspector-item>

                </ng-container>

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

}
