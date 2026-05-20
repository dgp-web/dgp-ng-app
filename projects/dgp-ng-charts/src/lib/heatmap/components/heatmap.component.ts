import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { Many } from "data-modeling";
import { areEqualByHashCode, Size } from "dgp-ng-app";
import { BehaviorSubject } from "rxjs";
import { ChartComponentBase } from "../../shared/chart.component-base";
import { defaultDgpHeatmapConfig } from "../constants/default-dgp-heatmap-config.constant";
import { renderHeatmap } from "../functions/render-heatmap.function";
import { ExportChartConfig } from "../models/export-chart-config.model";
import { HeatmapSegment } from "../models/heatmap-segment.model";
import { HeatmapSelection } from "../models/heatmap-selection.model";
import { HeatmapTile } from "../models/heatmap-tile.model";

@Component({
    selector: "dgp-heatmap",
    template: `
        <dgp-chart [yAxisTitle]="yAxisTitle"
                   [xAxisTitle]="xAxisTitle"
                   [chartTitle]="chartTitle"
                   (sizeChanged)="onResize($event)">

            <ng-container right-legend>
                <ng-content select="[right-legend]"></ng-content>
            </ng-container>

            <div #chartElRef
                 class="d3-hook"></div>
            <div class="right-legend">
                <ng-content select="[right-legend]"></ng-content>
            </div>
        </dgp-chart>
    `,
    styles: [`
        :host {
            display: flex;
            flex-grow: 1;
            font-size: smaller;
        }

        .d3-hook {
            flex-grow: 1;
            height: 100%;
            position: relative;
        }

        .right-legend {
        }

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class HeatmapComponent extends ChartComponentBase<ReadonlyArray<HeatmapTile>, any> {

    readonly size$ = new BehaviorSubject<Size>(null);

    @Input()
    exportConfig: ExportChartConfig;

    @Input()
    config = defaultDgpHeatmapConfig;

    @Output()
    readonly selectionChange = new EventEmitter<HeatmapSelection>();

    @Input()
    segments: Many<HeatmapSegment>;

    svgNode: Node;

    private selectionValue: HeatmapSelection = {};

    @Input()
    get selection(): HeatmapSelection {
        return this.selectionValue;
    }

    set selection(value: HeatmapSelection) {

        if (areEqualByHashCode(value, this.selectionValue)) return;

        this.selectionValue = value;
        this.scheduleDrawChartAction();
    }

    private setSelectionInternally(value: HeatmapSelection) {
        this.selectionValue = value;
        this.selectionChange.emit(value);
    }


    protected drawD3Chart(payload): void {
        this.svgNode = payload.svg.node().parentNode;

        renderHeatmap({
            drawD3ChartInfo: payload,
            model: this.model,
            selection: this.selection,
            config: this.config,
            nativeElement: this.chartElRef.nativeElement,
            selectionMode: this.selectionMode,
            segments: this.segments,
            updateSelection: selection => this.setSelectionInternally(selection)
        });
    }

    onResize(size: Size) {
        this.size$.next(size);
        this.drawChartActionScheduler.next();
    }

}
