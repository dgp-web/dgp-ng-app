import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BoxGroup, ConnectedScatterGroup } from "dgp-ng-charts";
import { Many } from "data-modeling";
import { createGuid } from "dgp-ng-app";

@Component({
    selector: "dgp-ng-paged-media-labs",
    template: `
        <dgp-paged-media-page-A4>
            <dgp-paged-media-header>
                First section header
            </dgp-paged-media-header>

            <dgp-paged-media-content>
                First section content
            </dgp-paged-media-content>

            <dgp-paged-media-footer>
                First section footer
            </dgp-paged-media-footer>
        </dgp-paged-media-page-A4>

        <dgp-paged-media-page-A4>
            <dgp-paged-media-header>
                Second section header
            </dgp-paged-media-header>

            <dgp-paged-media-content>
                <div style="display: flex; flex-wrap: wrap;">
                    <dgp-box-plot [model]="boxGroups"></dgp-box-plot>
                    <dgp-connected-scatter-plot [model]="connectedScatterGroups"></dgp-connected-scatter-plot>
                </div>
            </dgp-paged-media-content>

            <dgp-paged-media-footer>
                Second section footer
            </dgp-paged-media-footer>
        </dgp-paged-media-page-A4>

        <dgp-paged-media-section-A4>
            <dgp-paged-media-header>
                Dynamic-length section header
            </dgp-paged-media-header>

            <dgp-paged-media-content>

            </dgp-paged-media-content>

            <dgp-paged-media-footer>
                Dynamic-length section footer
            </dgp-paged-media-footer>
        </dgp-paged-media-section-A4>
    `,
    styles: [`
        :host {
        }

        dgp-box-plot, dgp-connected-scatter-plot {
            width: 320px;
            height: 240px;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    readonly boxGroups: Many<BoxGroup> = [{
        boxGroupId: "Box data",
        label: "First group",
        boxes: [{
            boxId: createGuid(),
            colorHex: "#d8d8ef",
            quantiles: {
                max: 8,
                min: 0.23,
                lower: 3,
                upper: 7.4,
                median: 5.2
            },
            outliers: []
        }]
    }];
    readonly connectedScatterGroups: Many<ConnectedScatterGroup> = [{
        connectedScatterGroupId: "Scatter data",
        colorHex: "#d8d8ef",
        series: [{
            connectedScatterSeriesId: createGuid(),
            dots: [{
                x: 1,
                y: 2
            }, {
                x: 10,
                y: 7
            }]
        }]
    }];
}
