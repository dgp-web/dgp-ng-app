import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ModelMetadata } from "data-modeling";
import { BoxPlot, BoxPlotRenderer } from "dgp-ng-charts";
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
            colorHex: "#ff0000",
            quantiles: {
                max: 13,
                upper: 10,
                median: 1,
                lower: -13,
                min: -17
            }
        }]
    }]
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
                                  [renderer]="renderer"></dgp-box-plot>
                </ng-template>
            </dgp-split-panel-content>

            <dgp-split-panel-content [size]="20">
                <ng-template></ng-template>
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

    updateRenderer(renderer: BoxPlotRenderer) {
        this.renderer = renderer;
    }

}
