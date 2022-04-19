import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, ViewChild } from "@angular/core";
import { filterNotNullOrUndefined, isNullOrUndefined, observeAttribute$ } from "dgp-ng-app";
import { BarChart, BarGroups } from "../models";
import { ExportChartConfig } from "../../heatmap/models";
import { DgpChartComponentBase } from "../../chart/components/chart.component-base";
import { BehaviorSubject, combineLatest } from "rxjs";
import { debounceTime, map, shareReplay } from "rxjs/operators";
import { createBarChartScales } from "../functions/create-bar-chart-scales.function";
import { idPrefixProvider } from "../../shared/id-prefix-provider.constant";
import { getChartViewBox } from "../../shared/functions/get-chart-view-box.function";
import { DgpPlotContainerComponent } from "../../plot-container/components/plot-container.component";
import { getPlotRootTransform } from "../../shared/functions/get-plot-root-transform.function";
import { trackByBarGroupId } from "../functions/track-by-bar-group-id.function";
import { trackByBarId } from "../functions/track-by-bar-id.function";
import { defaultBarChartConfig } from "../constants";
import { ScaleType } from "../../shared/models";
import { CardinalAxisTickFormat } from "../../shared/models/cardinal-axis-tick-format.model";
import { ID_PREFIX } from "../../shared/id-prefix-injection-token.constant";

@Component({
    selector: "dgp-bar-chart",
    template: `
        <dgp-chart [yAxisTitle]="yAxisTitle"
                   [xAxisTitle]="xAxisTitle"
                   [chartTitle]="chartTitle"
                   dgpResizeSensor
                   (sizeChanged)="onResize()">

            <ng-container chart-title>
                <ng-content select="[chart-title]"></ng-content>
            </ng-container>

            <ng-container x-axis-title>
                <ng-content select="[x-axis-title]"></ng-content>
            </ng-container>

            <ng-container y-axis-title>
                <ng-content select="[y-axis-title]"></ng-content>
            </ng-container>

            <ng-container right-legend>
                <ng-content select="[right-legend]"></ng-content>
            </ng-container>

            <dgp-plot-container>

                <svg *ngIf="scales$ | async"
                     [attr.viewBox]="viewBox$ | async">

                    <defs>
                        <!-- Patterns -->
                        <pattern dgpHorizontalLinesPattern></pattern>
                        <pattern dgpVerticalLinesPattern></pattern>
                        <pattern dgpLinesFromLeftTopToRightBottomPattern></pattern>
                        <pattern dgpLinesFromLeftBottomToRightTopPattern></pattern>
                        <pattern dgpCheckerboardPattern></pattern>
                        <pattern dgpDiagonalCheckerboardPattern></pattern>

                        <!-- Masks -->
                        <mask dgpVerticalLinesMask></mask>
                        <mask dgpHorizontalLinesMask></mask>
                        <mask dgpLinesFromLeftTopToRightBottomMask></mask>
                        <mask dgpLinesFromLeftBottomToRightTopMask></mask>
                        <mask dgpGridMask></mask>
                        <mask dgpDiagonalGridMask></mask>
                        <mask dgpCheckerboardMask></mask>
                        <mask dgpDiagonalCheckerboardMask></mask>

                        <!-- Other -->
                        <clipPath dgpChartDataAreaClipPath
                                  [scales]="scales$ | async"></clipPath>
                        <clipPath dgpChartContainerAreaClipPath
                                  [scales]="scales$ | async"></clipPath>
                    </defs>

                    <g [attr.clip-path]="containerAreaClipPath">
                        <g [attr.transform]="containerTransform$ | async">

                            <g dgpChartBottomAxis
                               [scales]="scales$ | async"></g>

                            <g *ngIf="showXAxisGridLines"
                               dgpChartXAxisGridLines
                               [scales]="scales$ | async"></g>

                            <g dgpChartLeftAxis
                               [scales]="scales$ | async"></g>

                            <g *ngIf="showYAxisGridLines"
                               dgpChartYAxisGridLines
                               [scales]="scales$ | async"></g>

                            <g [attr.clip-path]="dataAreaClipPath">
                                <g *ngFor="let barGroup of model; trackBy: trackByBarGroupId"
                                   dgpBarChartBarGroup
                                   [barGroup]="barGroup"
                                   [scales]="scales$ | async">
                                    <ng-container *ngFor="let bar of barGroup.bars; trackBy: trackByBarId">
                                        <rect dgpBarChartBarFillPattern
                                              [scales]="scales$ | async"
                                              [barGroup]="barGroup"
                                              [bar]="bar"></rect>
                                        <rect dgpBarChartBar
                                              [scales]="scales$ | async"
                                              [barGroup]="barGroup"
                                              [bar]="bar"></rect>
                                    </ng-container>
                                </g>
                            </g>
                        </g>
                    </g>

                </svg>

            </dgp-plot-container>

        </dgp-chart>
    `,
    styles: [`
        :host {
            display: flex;
            justify-content: center;
            flex-grow: 1;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        idPrefixProvider
    ]
})
export class DgpBarChartComponent extends DgpChartComponentBase implements BarChart {

    @ViewChild(DgpPlotContainerComponent, {read: ElementRef, static: true})
    elRef: ElementRef<HTMLDivElement>;

    @Input()
    model: BarGroups;
    readonly model$ = observeAttribute$(this as DgpBarChartComponent, "model");

    @Input()
    exportConfig: ExportChartConfig;

    @Input()
    config = defaultBarChartConfig;
    readonly config$ = observeAttribute$(this as DgpBarChartComponent, "config");
    readonly margin$ = this.config$.pipe(map(x => x.margin));

    @Input()
    yAxisMin?: number;
    readonly yAxisMin$ = observeAttribute$(this as DgpBarChartComponent, "yAxisMin");

    @Input()
    yAxisMax?: number;
    readonly yAxisMax$ = observeAttribute$(this as DgpBarChartComponent, "yAxisMax");

    @Input()
    yAxisStep?: number;
    readonly yAxisStep$ = observeAttribute$(this as DgpBarChartComponent, "yAxisStep");

    @Input()
    yAxisScaleType?: ScaleType;
    readonly yAxisScaleType$ = observeAttribute$(this as DgpBarChartComponent, "yAxisScaleType");

    @Input()
    showYAxisGridLines = true;

    @Input()
    showXAxisGridLines = true;

    @Input()
    yAxisTickFormat?: (x: string) => string;
    readonly yAxisTickFormat$ = observeAttribute$(this as DgpBarChartComponent, "yAxisTickFormat");

    readonly containerTransform$ = this.margin$.pipe(map(getPlotRootTransform));
    readonly trackByBarGroupId = trackByBarGroupId;
    readonly trackByBarId = trackByBarId;

    readonly containerDOMRect$ = new BehaviorSubject<DOMRectReadOnly>(null);

    readonly viewBox$ = this.containerDOMRect$.pipe(
        filterNotNullOrUndefined(),
        map(containerDOMRect => getChartViewBox({containerDOMRect}))
    );

    readonly scales$ = combineLatest([
        this.containerDOMRect$.pipe(filterNotNullOrUndefined()),
        this.model$,
        this.yAxisMin$,
        this.yAxisMax$,
        this.yAxisStep$,
        this.yAxisScaleType$,
        this.yAxisTickFormat$,
    ]).pipe(
        debounceTime(250),
        map(combination => createBarChartScales({
            containerHeight: (combination[0] as DOMRectReadOnly).height,
            containerWidth: (combination[0] as DOMRectReadOnly).width,
            barGroups: combination[1] as BarGroups,
            yAxisMin: combination[2] as number,
            yAxisMax: combination[3] as number,
            yAxisStep: combination[4] as number,
            yAxisScaleType: combination[5] as ScaleType,
            yAxisTickFormat: combination[6] as CardinalAxisTickFormat
        })),
        shareReplay(1)
    );

    readonly dataAreaClipPath = "url(#" + this.idPrefix + ".dataAreaClipPath" + ")";
    readonly containerAreaClipPath = "url(#" + this.idPrefix + ".containerAreaClipPath" + ")";

    constructor(
        @Inject(ID_PREFIX)
        protected readonly idPrefix: string
    ) {
        super();
    }

    onResize() {
        if (isNullOrUndefined(this.elRef.nativeElement)) return;
        this.containerDOMRect$.next(this.elRef.nativeElement.getBoundingClientRect());
    }

}
