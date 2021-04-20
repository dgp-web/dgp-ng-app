import { Directive, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { BoxGroup, BoxOutlier, BoxPlotScales, BoxPlotSelection } from "../models";
import * as d3 from "d3";
import { getOutlierXPosition, isBrushed } from "../functions";
import { defaultBoxPlotConfig } from "../constants";
import { ChartSelectionMode } from "../../shared/models";

function getOutliers(payload: ReadonlyArray<BoxGroup>) {
    const outliers = new Array<BoxOutlier>();
    payload.forEach(boxGroup => {
        boxGroup.boxes.forEach(box => {
            box.outliers.map((value, outlierIndex) => {
                outliers.push({
                    boxGroupId: boxGroup.boxGroupId,
                    boxId: box.boxId,
                    outlierIndex,
                    value,
                    colorHex: box.colorHex
                });
            });
        });
    });
    return outliers;
}

@Directive({selector: "[dgpBoxPlotBrushSelector]"})
export class BoxPlotBrushSelectorDirective implements OnChanges {

    @Input()
    boxGroups: ReadonlyArray<BoxGroup>;

    @Input()
    scales: BoxPlotScales;

    @Input()
    config = defaultBoxPlotConfig;

    @Input()
    selectionMode: ChartSelectionMode = "None";

    @Output()
    readonly selectionChange = new EventEmitter<BoxPlotSelection>();

    constructor(
        private readonly elementRef: ElementRef
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.scales || changes.box || changes.boxGroup || changes.selectionMode) {

            if (this.selectionMode !== "Brush") return;

            const svg = this.elementRef.nativeElement;

            d3.select(svg).call(d3.brush()
                .extent([
                    [0, 0],
                    [this.scales.barAreaWidth, this.scales.barAreaHeight]
                ])
                .on("start brush", () => {
                    const extent = d3.event.selection;

                    const outliers = getOutliers(this.boxGroups).filter(x => isBrushed(
                        extent,
                        getOutlierXPosition(x, this.scales, this.config),
                        this.scales.yAxis(x.value)
                    ));

                    this.selectionChange.emit({outliers});
                })
            );
        }


    }


}
