import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges,
    ViewChild
} from "@angular/core";
import { isNullOrUndefined, observeAttribute$ } from "dgp-ng-app";
import { BarChart, BarChartConfig, BarChartScales, BarGroup, BarGroups } from "../models";
import { defaultBarChartConfig } from "../constants";
import { ExportChartConfig } from "../../heatmap/models";
import { DrawD3ChartPayload } from "../../shared/chart.component-base";
import { DgpChartComponentBase } from "../../chart/components/chart.component-base";
import { Subject, Subscription } from "rxjs";
import { debounceTime, map, tap } from "rxjs/operators";
import { createBarChartScales } from "../functions/create-bar-chart-scales.function";
import { idPrefixProvider } from "../../shared/id-prefix-provider.constant";
import { getChartViewBox } from "../../shared/functions/get-chart-view-box.function";
import { DgpPlotContainerComponent } from "../../plot-container/components/plot-container.component";
import { getPlotRootTransform } from "../../shared/functions/get-plot-root-transform.function";
import { trackByBarGroupId } from "../functions/track-by-bar-group-id.function";
import { trackByBarId } from "../functions/track-by-bar-id.function";

@Component({
    selector: "dgp-bar-chart",
    template: `
        <dgp-chart [yAxisTitle]="yAxisTitle"
                   [xAxisTitle]="xAxisTitle"
                   [chartTitle]="chartTitle"
                   dgpResizeSensor
                   (sizeChanged)="drawChart()">

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

                <svg #svgRoot
                     *ngIf="barChartScales"
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
                    </defs>

                    <g [attr.transform]="containerTransform$ | async">

                        <g class="chart__x-axis"
                           dgpChartBottomAxis
                           [scales]="barChartScales"></g>

                        <g class="chart__x-axis-grid-lines"
                           dgpChartXAxisGridLines
                           [scales]="barChartScales"></g>

                        <g class="chart__y-axis"
                           dgpChartLeftAxis
                           [scales]="barChartScales"></g>

                        <g class="chart__y-axis-grid-lines"
                           dgpChartYAxisGridLines
                           [scales]="barChartScales"></g>

                        <g *ngFor="let barGroup of model; trackBy: trackByBarGroupId"
                           [attr.transform]="getResultRootTransform(barGroup)">
                            <ng-container *ngFor="let bar of barGroup.bars; trackBy: trackByBarId">
                                <rect dgpBarChartBarFillPattern
                                      [scales]="barChartScales"
                                      [barGroup]="barGroup"
                                      [bar]="bar"></rect>
                                <rect dgpBarChartBar
                                      [scales]="barChartScales"
                                      [barGroup]="barGroup"
                                      [bar]="bar"></rect>
                            </ng-container>
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
export class DgpBarChartComponent extends DgpChartComponentBase implements BarChart, OnChanges, OnDestroy {

    @ViewChild(DgpPlotContainerComponent, {
        read: ElementRef,
        static: true
    })
    elRef: ElementRef<HTMLDivElement>;

    @Input()
    model: BarGroups;

    @Input()
    barSortIndex: ReadonlyArray<string>;

    @Input()
    exportConfig: ExportChartConfig;

    @Input()
    config: BarChartConfig;

    readonly config$ = observeAttribute$(this as DgpBarChartComponent, "config");
    readonly margin$ = this.config$.pipe(map(x => x.margin));
    readonly containerTransform$ = this.margin$.pipe(map(getPlotRootTransform));
    readonly trackByBarGroupId = trackByBarGroupId;
    readonly trackByBarId = trackByBarId;

    barChartScales: BarChartScales;

    readonly containerDOMRect$ = new Subject<DOMRectReadOnly>();

    readonly viewBox$ = this.containerDOMRect$.pipe(
        map(containerDOMRect => getChartViewBox({containerDOMRect}))
    );

    private readonly drawChartActionScheduler = new EventEmitter();

    private drawChartSubscription: Subscription;

    constructor(
        private readonly cd: ChangeDetectorRef
    ) {
        super();

        this.drawChartSubscription = this.drawChartActionScheduler.pipe(
            debounceTime(250),
            tap(() => this.drawChart())
        ).subscribe();

        this.config = defaultBarChartConfig;
    }

    drawChart() {

        if (isNullOrUndefined(this.elRef.nativeElement)) return;

        const rect = this.elRef.nativeElement.getBoundingClientRect() as DOMRect;
        this.containerDOMRect$.next(rect);

        this.drawD3Chart({
            svg: null,
            containerHeight: rect.height,
            containerWidth: rect.width
        });

    }


    ngOnChanges(changes: SimpleChanges): void {
        if (changes.model || changes.config || changes.selectionMode || changes.selection) {
            this.drawChartActionScheduler.emit();
        }
    }

    ngOnDestroy(): void {
        if (!this.drawChartSubscription?.closed) {
            this.drawChartSubscription?.unsubscribe();
        }
    }


    protected drawD3Chart(payload: DrawD3ChartPayload): void {

        this.barChartScales = createBarChartScales({
            containerHeight: payload.containerHeight,
            containerWidth: payload.containerWidth,
            barGroups: this.model
        });

        this.cd.markForCheck();

    }

    getResultRootTransform(barGroup: BarGroup) {
        return "translate(" + this.barChartScales.xAxisScale(barGroup.barGroupKey) + ")";
    }

}
