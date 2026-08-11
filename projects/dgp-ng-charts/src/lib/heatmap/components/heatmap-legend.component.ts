import {ChangeDetectionStrategy, Component} from "@angular/core";
import {DgpModelEditorComponentBase} from "dgp-ng-app";
import { HeatmapLegend } from "../models/heatmap-legend.model";

@Component({
    selector: "dgp-heatmap-legend",
    template: `
        <div class="container">
          <div class="filled"></div>
          <div class="labels">
            @if ($safeNavigationMigration(model?.max) !== null && $safeNavigationMigration(model?.max) !== undefined) {
              <div>{{ model?.max.toPrecision(3) }}</div>
            }
            <dgp-spacer></dgp-spacer>
            @if ($safeNavigationMigration(model?.median) !== null && $safeNavigationMigration(model?.median) !== undefined) {
              <div>{{ model?.median.toPrecision(3) }}</div>
            }
            <dgp-spacer></dgp-spacer>
            @if ($safeNavigationMigration(model?.min) !== null && $safeNavigationMigration(model?.min) !== undefined) {
              <div>{{ model?.min.toPrecision(3) }}</div>
            }
          </div>
        </div>
        `,
    styles: [`
        :host {
            display: flex;
            height: 100%;
            flex-direction: column;
        }

        .container {
            display: flex;
            flex-grow: 1;
        }

        .filled {
            margin-left: 8px;
            margin-right: 8px;
            width: 16px;
            min-width: 16px;
            max-width: 16px;
            flex-grow: 1;
            background: linear-gradient(to bottom, #0066ff, #66ff66, #ff6600);
        }

        .labels {
            display: flex;
            flex-direction: column;
            margin-right: 8px;
        }

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class HeatmapLegendComponent extends DgpModelEditorComponentBase<HeatmapLegend> {

}
