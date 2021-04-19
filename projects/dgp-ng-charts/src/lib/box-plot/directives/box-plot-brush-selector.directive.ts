import { Directive, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChanges } from "@angular/core";
import { BoxGroup, BoxOutlier, BoxPlotScales, BoxPlotSelection } from "../models";
import * as d3 from "d3";
import { getOutlierXPosition, isBrushed } from "../functions";
import { defaultBoxPlotConfig } from "../constants";

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

    @Output()
    readonly selectionChange = new EventEmitter<BoxPlotSelection>();

    constructor(private readonly elementRef: ElementRef,
                private readonly renderer: Renderer2) {
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.scales || changes.box || changes.boxGroup) {

            const svg = this.elementRef.nativeElement;

            d3.select(svg).call(d3.brush()
                .extent([
                    [this.scales.chartMargin.left, this.scales.chartMargin.top],
                    [this.scales.containerWidth, this.scales.containerHeight]
                ])
                .on("start brush", () => {
                    const extent = d3.event.selection;

                    const filteredOutliers = getOutliers(this.boxGroups).filter(x => isBrushed(
                        extent,
                        getOutlierXPosition(x, this.scales, this.config),
                        this.scales.yAxis(x.value)
                    ));

                    console.log(filteredOutliers);

                    this.selectionChange.emit({
                        outliers: filteredOutliers
                    });
                })
            );
        }


    }


}
