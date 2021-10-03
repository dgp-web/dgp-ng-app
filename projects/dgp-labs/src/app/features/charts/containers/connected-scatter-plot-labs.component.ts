import { ChangeDetectionStrategy, Component } from "@angular/core";
import { testConnectedScatterGroups } from "../constants/test-connected-scatter-groups.constant";
import { DgpModelEditorComponentBase } from "dgp-ng-app";
import {
    ConnectedScatterPlot,
    ConnectedScatterPlotControlLine
} from "../../../../../../dgp-ng-charts/src/lib/connected-scatter-plot/models";
import { ScaleType } from "../../../../../../dgp-ng-charts/src/lib/shared/models";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

export const testConnectScatterPlot: ConnectedScatterPlot = {
    model: testConnectedScatterGroups,
    xAxisTitle: "x-axis title",
    yAxisTitle: "y-axis title",
    chartTitle: "Chart title",
    controlLines: [{
        label: "Upper limit",
        colorHex: "#666666",
        connectedScatterPlotControlLineId: "upperLimit",
        value: 10
    }]
};

@Component({
    selector: "dgp-connected-scatter-plot-labs",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Connected scatter plot
        </dgp-page-header>

        <dgp-split-panel orientation="horizontal">

            <dgp-split-panel-content [size]="80">
                <ng-template>
                    <dgp-connected-scatter-plot [model]="model.model"
                                                [chartTitle]="model.chartTitle"
                                                [xAxisTitle]="model.xAxisTitle"
                                                [xAxisMin]="model.xAxisMin"
                                                [xAxisMin]="model.xAxisMin"
                                                [xAxisMax]="model.xAxisMax"
                                                [yAxisTitle]="model.yAxisTitle"
                                                [yAxisScaleType]="model.yAxisScaleType"
                                                [yAxisMin]="model.yAxisMin"
                                                [yAxisMax]="model.yAxisMax"
                                                [controlLines]="model.controlLines"></dgp-connected-scatter-plot>


                </ng-template>

            </dgp-split-panel-content>
            <dgp-split-panel-content [size]="20">
                <ng-template>

                    <dgp-inspector>
                        <dgp-inspector-section label="General"
                                               matIconName="info">
                            <dgp-inspector-item label="Chart title"
                                                matIconName="label">
                                <mat-form-field>
                                    <textarea matInput
                                              [disabled]="disabled"
                                              [ngModel]="model.chartTitle"
                                              (ngModelChange)="updateChartTitle($event)"></textarea>
                                </mat-form-field>
                            </dgp-inspector-item>
                        </dgp-inspector-section>

                        <dgp-inspector-section label="x axis"
                                               matIconName="border_bottom">

                            <dgp-inspector-item label="Title"
                                                matIconName="label">
                                <mat-form-field>
                                    <textarea matInput
                                              [disabled]="disabled"
                                              [ngModel]="model.xAxisTitle"
                                              (ngModelChange)="updateXAxisTitle($event)"></textarea>
                                </mat-form-field>
                            </dgp-inspector-item>

                            <dgp-inspector-item label="Max"
                                                matIconName="maximize">
                                <mat-form-field>
                                    <input matInput
                                           type="number"
                                           [disabled]="disabled"
                                           [ngModel]="model.xAxisMax"
                                           (ngModelChange)="setXAxisMax($event)">
                                </mat-form-field>
                            </dgp-inspector-item>

                            <dgp-inspector-item label="Min"
                                                matIconName="minimize">
                                <mat-form-field>
                                    <input matInput
                                           type="number"
                                           [disabled]="disabled"
                                           [ngModel]="model.xAxisMin"
                                           (ngModelChange)="setXAxisMin($event)">
                                </mat-form-field>
                            </dgp-inspector-item>

                        </dgp-inspector-section>

                        <dgp-inspector-section label="y axis"
                                               matIconName="border_left">
                            <dgp-inspector-item label="Title"
                                                matIconName="label">
                                <mat-form-field>
                                    <textarea matInput
                                              [disabled]="disabled"
                                              [ngModel]="model.yAxisTitle"
                                              (ngModelChange)="updateYAxisTitle($event)"></textarea>
                                </mat-form-field>
                            </dgp-inspector-item>


                            <dgp-inspector-item label="Scale"
                                                matIconName="linear_scale">
                                <mat-form-field>
                                    <mat-select [disabled]="disabled"
                                                [ngModel]="model.yAxisScaleType"
                                                (ngModelChange)="updateYAxisScaleType($event)">
                                        <mat-option [value]="scaleTypeEnum.Linear">
                                            Linear
                                        </mat-option>
                                        <mat-option [value]="scaleTypeEnum.Logarithmic">
                                            Logarithmic
                                        </mat-option>
                                    </mat-select>
                                </mat-form-field>
                            </dgp-inspector-item>

                            <dgp-inspector-item label="Max"
                                                matIconName="maximize">
                                <mat-form-field>
                                    <input matInput
                                           type="number"
                                           [disabled]="disabled"
                                           [ngModel]="model.yAxisMax"
                                           (ngModelChange)="setYAxisMax($event)">
                                </mat-form-field>
                            </dgp-inspector-item>

                            <dgp-inspector-item label="Min"
                                                matIconName="minimize">
                                <mat-form-field>
                                    <input matInput
                                           type="number"
                                           [disabled]="disabled"
                                           [ngModel]="model.yAxisMin"
                                           (ngModelChange)="setYAxisMin($event)">
                                </mat-form-field>
                            </dgp-inspector-item>


                        </dgp-inspector-section>

                        <dgp-inspector-section label="Control lines"
                                               matIconName="vertical_distribute">

                            <dgp-inspector-item matIconName="horizontal_rule"
                                                label="Selected line">
                                <mat-form-field>
                                    <mat-select [ngModel]="selectedControlLineId$ | async"
                                                (ngModelChange)="selectControlLine($event)">
                                        <mat-option *ngFor="let controlLine of model.controlLines"
                                                    [value]="controlLine.connectedScatterPlotControlLineId">
                                            {{controlLine.label}}
                                        </mat-option>
                                    </mat-select>
                                </mat-form-field>
                            </dgp-inspector-item>

                            <ng-container *ngIf="selectedControlLine$ | async as selectedControlLine">
                                <dgp-inspector-item matIconName="label"
                                                    label="Label">
                                    <mat-form-field>
                                        <input matInput
                                               [ngModel]="selectedControlLine.label"
                                               (ngModelChange)="updateSelectedControlLineLabel($event)">
                                    </mat-form-field>
                                </dgp-inspector-item>

                                <dgp-inspector-item matIconName="pin"
                                                    label="Value">
                                    <mat-form-field>
                                        <input matInput
                                               type="number"
                                               [ngModel]="selectedControlLine.value"
                                               (ngModelChange)="updateSelectedControlLineValue($event)">
                                    </mat-form-field>
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

        dgp-connected-scatter-plot {
            /* width: 640px;
             max-height: 480px;*/
        }

        mat-form-field {
            width: 100%;
            max-width: 240px;
            margin-left: 32px;
        }

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectedScatterPlotLabsComponent extends DgpModelEditorComponentBase<ConnectedScatterPlot> {

    readonly scaleTypeEnum = ScaleType;
    protected modelValue = testConnectScatterPlot;
    readonly selectedControlLineId$ = new BehaviorSubject<string>(null);
    readonly selectedControlLine$ = this.selectedControlLineId$.pipe(
        map(controlLineId => {
            if (!controlLineId || !this.model || !this.model.controlLines) return null;

            return this.model.controlLines.find(x => x.connectedScatterPlotControlLineId === controlLineId);
        })
    );

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

    selectControlLine(controlLineId: string) {
        this.selectedControlLineId$.next(controlLineId);
    }

    updateSelectedControlLine(payload: Partial<ConnectedScatterPlotControlLine>) {

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
}
