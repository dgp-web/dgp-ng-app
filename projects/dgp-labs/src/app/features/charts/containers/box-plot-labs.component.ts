import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ModelMetadata } from "data-modeling";
import { BoxPlot, BoxPlotConfig, BoxPlotRenderer, defaultBoxPlotConfig } from "dgp-ng-charts";
import { DgpModelEditorComponentBase } from "dgp-ng-app";
import { CardinalAxisTickFormat } from "../../../../../../dgp-ng-charts/src/lib/shared/models/cardinal-axis-tick-format.model";
import { roundDecimalPlaces } from "../../../../../../dgp-ng-charts/src/lib/shared/functions";

export const formatCustomTick: CardinalAxisTickFormat = (x: string) => {

    const lastChar = x[x.length - 1];

    x = x.replace(lastChar, "");

    const elements = x.split(".");
    const integer = elements[0];
    const decimalPlaces = elements[1];

    if (!decimalPlaces || decimalPlaces.length <= 2) return x + lastChar;

    if (+integer >= 10) {
        let result = Number.parseFloat(x).toFixed(2);

        if (result.endsWith(".00")) result = result.replace(".00", "");

        return result + lastChar;
    }

    const trimmedDecimalPlaces = roundDecimalPlaces(decimalPlaces);
    return integer + "." + trimmedDecimalPlaces + lastChar;

};

export const boxPlotMetadata: ModelMetadata<BoxPlot> = {
    label: "Box plot",

    attributes: {}
};

export const testBoxPlot: BoxPlot = {
    model: [{
        boxGroupId: "123.0003333333x",
        label: "Box group 01",
        boxes: [{
            boxGroupId: "123.0003333333x",
            boxId: "456x",
            colorHex: "#ff0000",
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
    yAxisMin: -20,
    xAxisTickFormat: formatCustomTick
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
                                  [showYAxisGridLines]="model.showYAxisGridLines"
                                  [xAxisTickFormat]="model.xAxisTickFormat"></dgp-box-plot>
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
