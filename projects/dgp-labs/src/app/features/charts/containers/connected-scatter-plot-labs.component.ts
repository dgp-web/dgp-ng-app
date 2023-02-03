import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DgpModelEditorComponentBase, isNullOrUndefined } from "dgp-ng-app";
import {
    ConnectedScatterGroup,
    ConnectedScatterPlot,
    ConnectedScatterPlotControlLine,
    ConnectedScatterPlotRenderer,
    ScaleType,
    Shape
} from "dgp-ng-charts";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { cardinalXAxisMetadata } from "../../../constants/connected-scatter-plot/cardinal-x-axis-metadata.constant";
import { connectedScatterPlotMetadata } from "../../../constants/connected-scatter-plot/connected-scatter-plot-metadata.constant";
import { testConnectedScatterPlot } from "../../../__tests__/constants/test-connected-scatter-plot.constant";

@Component({
    selector: "dgp-connected-scatter-plot-labs",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            {{cspMetadata.label}}
        </dgp-page-header>

        <dgp-split-panel orientation="horizontal">

            <dgp-split-panel-content [size]="80">
                <ng-template>
                    <dgp-connected-scatter-plot [model]="model.model"
                                                [renderer]="renderer"
                                                [chartTitle]="model.chartTitle"
                                                [xAxisTitle]="model.xAxisTitle"
                                                [xAxisMin]="model.xAxisMin"
                                                [xAxisMax]="model.xAxisMax"
                                                [xAxisStep]="model.xAxisStep"
                                                [xAxisTickFormat]="model.xAxisTickFormat"
                                                [xAxisScaleType]="model.xAxisScaleType"
                                                [showXAxisGridLines]="model.showXAxisGridLines"
                                                [showDataAreaOutline]="true"
                                                [yAxisTitle]="model.yAxisTitle"
                                                [yAxisScaleType]="model.yAxisScaleType"
                                                [yAxisMin]="model.yAxisMin"
                                                [yAxisMax]="model.yAxisMax"
                                                [yAxisStep]="model.yAxisStep"
                                                [showYAxisGridLines]="model.showYAxisGridLines"
                                                [controlLines]="model.controlLines"
                                                [dotSize]="model.dotSize"></dgp-connected-scatter-plot>
                </ng-template>

            </dgp-split-panel-content>
            <dgp-split-panel-content [size]="20">
                <ng-template>

                    <dgp-inspector class="--dynamic-form-fields"
                                   [responsive]="true">
                        <dgp-inspector-section label="General"
                                               matIconName="info">
                            <dgp-inspector-item label="Renderer"
                                                matIconName="label"
                                                description="Test">
                                <select [disabled]="disabled"
                                        [ngModel]="renderer"
                                        (ngModelChange)="updateRenderer($event)">
                                    <option [ngValue]="rendererEnum.SVG">
                                        SVG
                                    </option>
                                    <option [ngValue]="rendererEnum.Hybrid">
                                        Hybrid
                                    </option>
                                </select>
                            </dgp-inspector-item>

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

                        <dgp-inspector-section [metadata]="xAxisMetadata">

                            <dgp-inspector-item label="Title"
                                                matIconName="label">
                                    <textarea [disabled]="disabled"
                                              [ngModel]="model.xAxisTitle"
                                              (ngModelChange)="updateXAxisTitle($event)"></textarea>
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

                            <dgp-inspector-item [metadata]="cspMetadata.attributes.xAxisMax">
                                <input type="number"
                                       [disabled]="disabled"
                                       [ngModel]="model.xAxisMax"
                                       (ngModelChange)="setXAxisMax($event)">
                            </dgp-inspector-item>

                            <dgp-inspector-item [metadata]="cspMetadata.attributes.xAxisMin">
                                <input type="number"
                                       [disabled]="disabled"
                                       [ngModel]="model.xAxisMin"
                                       (ngModelChange)="setXAxisMin($event)">
                            </dgp-inspector-item>

                            <dgp-inspector-item [metadata]="cspMetadata.attributes.xAxisStep">
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

                        <dgp-inspector-section label="y axis"
                                               matIconName="border_left">
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

                            <dgp-inspector-item [metadata]="cspMetadata.attributes.yAxisMax">
                                <input type="number"
                                       [disabled]="disabled"
                                       [ngModel]="model.yAxisMax"
                                       (ngModelChange)="setYAxisMax($event)">
                            </dgp-inspector-item>

                            <dgp-inspector-item [metadata]="cspMetadata.attributes.yAxisMin">
                                <input type="number"
                                       [disabled]="disabled"
                                       [ngModel]="model.yAxisMin"
                                       (ngModelChange)="setYAxisMin($event)">
                            </dgp-inspector-item>

                            <dgp-inspector-item [metadata]="cspMetadata.attributes.yAxisStep">
                                <input type="number"
                                       [disabled]="disabled"
                                       [ngModel]="model.yAxisStep"
                                       (ngModelChange)="setYAxisTicks($event)">
                            </dgp-inspector-item>

                            <dgp-inspector-item label="Grid lines"
                                                matIconName="border_horizontal">
                                <mat-slide-toggle [disabled]="disabled"
                                                  [ngModel]="model.showYAxisGridLines"
                                                  (ngModelChange)="setShowYAxisGridLines($event)"></mat-slide-toggle>
                            </dgp-inspector-item>

                        </dgp-inspector-section>

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

                </ng-template>
            </dgp-split-panel-content>

        </dgp-split-panel>

    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            height: 100%;
            overflow: auto;
        }

        dgp-shape-select {
            width: 100%;
        }

        input, select, textarea {
            width: 100%;
            background: transparent;
            color: inherit;
            border: none;
            border-bottom: 1px solid dimgray;
            font-size: smaller;
        }

        textarea {
            height: 32px;
        }

        option {
            color: black;
        }

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectedScatterPlotLabsComponent extends DgpModelEditorComponentBase<ConnectedScatterPlot> {

    readonly cspMetadata = connectedScatterPlotMetadata;
    readonly xAxisMetadata = cardinalXAxisMetadata;

    readonly rendererEnum = ConnectedScatterPlotRenderer;
    renderer = ConnectedScatterPlotRenderer.Hybrid;

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

    updateXAxisTitle(xAxisTitle: string) {
        this.updateModel({xAxisTitle});
    }


    updateYAxisTitle(yAxisTitle: string) {
        this.updateModel({yAxisTitle});
    }

    setXAxisMin(xAxisMin: number) {
        this.updateModel({xAxisMin});
    }

    setXAxisMax(xAxisMax: number) {
        this.updateModel({xAxisMax});
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

    updateXAxisScaleType(xAxisScaleType: ScaleType) {
        this.updateModel({xAxisScaleType});
    }

    updateRenderer(renderer: ConnectedScatterPlotRenderer) {
        this.renderer = renderer;
    }

    setShowYAxisGridLines(showYAxisGridLines: boolean) {
        this.updateModel({showYAxisGridLines});
    }

    setShowXAxisGridLines(showXAxisGridLines: boolean) {
        this.updateModel({showXAxisGridLines});
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

    setXAxisStep(xAxisStep: number) {
        this.updateModel({xAxisStep});
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
