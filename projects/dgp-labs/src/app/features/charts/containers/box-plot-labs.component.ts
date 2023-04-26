import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ModelMetadata } from "data-modeling";
import { BoxPlot, BoxPlotConfig, BoxPlotRenderer, defaultBoxPlotConfig } from "dgp-ng-charts";
import { DgpModelEditorComponentBase } from "dgp-ng-app";

export const boxPlotMetadata: ModelMetadata<BoxPlot> = {
    label: "Box plot",

    attributes: {}
};

export const testBoxPlot: BoxPlot = {
    model: [{
        boxGroupId: "boxGroup01",
        label: "Box group 01",
        boxes: [{
            boxGroupId: "boxGroup01",
            boxId: "box01",
            colorHex: "#ffab40",
            quantiles: {
                max: 13,
                upper: 10,
                median: 1,
                lower: -13,
                min: -17
            },
            outliers: [
                15,
                16,
                17,
                18,
                19,
                -17.5,
                -18,
                -19,
                -20
            ]
        }]
    }],
    yAxisMax: 20,
    yAxisMin: -20
};


@Component({
    selector: "dgp-box-plot-labs",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            {{boxPlotMetadata.label}}
        </dgp-page-header>

        <dgp-split-panel orientation="horizontal">

            <dgp-split-panel-content [size]="80">
                <ng-template>
                    <dgp-box-plot [model]="model.model"
                                  [config]="config"
                                  [renderer]="renderer"
                                  [yAxisMin]="model.yAxisMin"
                                  [yAxisMax]="model.yAxisMax"
                                  [yAxisStep]="model.yAxisStep"
                                  [yAxisTitle]="model.yAxisTitle"
                                  [showYAxisGridLines]="model.showYAxisGridLines"></dgp-box-plot>
                </ng-template>
            </dgp-split-panel-content>

            <dgp-split-panel-content [size]="20">
                <ng-template>
                    <dgp-box-plot-config-form [model]="model"
                                              (modelChange)="setModel($event)"
                                              [config]="config"
                                              (configChange)="updateConfig($event)"></dgp-box-plot-config-form>
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
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxPlotLabsComponent extends DgpModelEditorComponentBase<BoxPlot> {

    readonly boxPlotMetadata = boxPlotMetadata;

    renderer = BoxPlotRenderer.Hybrid;
    model = testBoxPlot;
    config = defaultBoxPlotConfig;

    updateConfig(payload: BoxPlotConfig) {
        this.config = payload;
    }

    updateRenderer(renderer: BoxPlotRenderer) {
        this.renderer = renderer;
    }

}
