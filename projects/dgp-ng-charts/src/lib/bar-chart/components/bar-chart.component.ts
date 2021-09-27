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
import { isNullOrUndefined } from "dgp-ng-app";
import { BarChart, BarChartScales, BarGroup, BarGroups } from "../models";
import { defaultBarChartConfig } from "../constants/default-bar-chart-config.constant";
import { ExportChartConfig } from "../../heatmap/models";
import { DrawD3ChartPayload } from "../../shared/chart.component-base";
import { DgpChartComponentBase } from "../../chart/components/chart.component-base";
import { Subscription } from "rxjs";
import { debounceTime, tap } from "rxjs/operators";
import { createBarChartScales } from "../functions/create-bar-chart-scales.function";

@Component({
    selector: "dgp-bar-chart",
    template: `

        <dgp-chart [yAxisTitle]="yAxisTitle"
                   [xAxisTitle]="xAxisTitle"
                   [chartTitle]="chartTitle">

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

            <div class="plot-container"
                 #chartContainer>

                <svg #svgRoot
                     dgpResizeSensor
                     (sizeChanged)="drawChart()"
                     *ngIf="barChartScales"
                     [attr.viewBox]="getViewBox()">

                    <g [attr.transform]="getContainerTransform()">

                        <g class="chart__x-axis"
                           dgpBarChartBottomAxis
                           [scales]="barChartScales"></g>

                        <g class="chart__y-axis"
                           dgpBarChartLeftAxis
                           [scales]="barChartScales"></g>

                        <g *ngFor="let barGroup of model"
                           [attr.transform]="getResultRootTransform(barGroup)">
                            <ng-container *ngFor="let bar of barGroup.bars">
                                <rect dgpBarChartBar
                                      [scales]="barChartScales"
                                      [barGroup]="barGroup"
                                      [bar]="bar"></rect>
                            </ng-container>
                        </g>

                    </g>

                </svg>

            </div>

        </dgp-chart>
    `,
    styles: [`
        :host {
            display: flex;
            justify-content: center;
            flex-grow: 1;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DgpBarChartComponent extends DgpChartComponentBase implements BarChart, OnChanges, OnDestroy {

    @ViewChild("chartContainer") elRef: ElementRef;

    @Input()
    model: BarGroups;

    @Input()
    barSortIndex: ReadonlyArray<string>;

    @Input()
    exportConfig: ExportChartConfig;

    @Input()
    config = defaultBarChartConfig;

    barChartScales: BarChartScales;

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
    }

    drawChart() {

        if (isNullOrUndefined(this.elRef.nativeElement)) return;

        const rect = this.elRef.nativeElement.getBoundingClientRect() as DOMRect;

        this.drawD3Chart({
            svg: null,
            containerHeight: rect.height - this.config.margin.top - this.config.margin.bottom,
            containerWidth: rect.width - this.config.margin.left - this.config.margin.right
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

    getContainerTransform(): string {
        return "translate(" + this.config.margin.left + " " + this.config.margin.top + ")";
    }


    getResultRootTransform(barGroup: BarGroup) {
        return "translate(" + this.barChartScales.xAxis(barGroup.barGroupKey) + ")";
    }

    getViewBox() {
        const rect = this.elRef.nativeElement.getBoundingClientRect() as DOMRect;

        const height = rect.height - this.config.margin.top - this.config.margin.bottom;
        const width = rect.width - this.config.margin.left - this.config.margin.right;

        return "0 0 " + width + " " + height;
    }
}
