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
import { DgpChartComponentBase } from "../../chart/components/chart.component-base";
import { Subscription } from "rxjs";
import { debounceTime, tap } from "rxjs/operators";
import { DrawD3ChartPayload } from "../../shared/chart.component-base";
import { ConnectedScatterGroup, ConnectedScatterPlot } from "../models";
import { createConnectedScatterPlotScales } from "../functions";
import { ConnectedScatterPlotScales } from "../models/connected-scatter-plot-scales.model";
import { defaultConnectedScatterPlotConfig } from "../constants/default-connected-scatter-plot-config.constant";
import { isNullOrUndefined } from "dgp-ng-app";

@Component({
    selector: "dgp-connected-scatter-plot",
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
export class DgpConnectedScatterPlotComponent extends DgpChartComponentBase implements ConnectedScatterPlot, OnChanges, OnDestroy {

    @ViewChild("chartContainer") elRef: ElementRef;

    @Input()
    model: readonly ConnectedScatterGroup[];

    @Input()
    config = defaultConnectedScatterPlotConfig;

    private readonly drawChartActionScheduler = new EventEmitter();

    private drawChartSubscription: Subscription;

    connectedScatterPlotScales: ConnectedScatterPlotScales;

    constructor(
        private readonly cd: ChangeDetectorRef
    ) {
        super();

        this.drawChartSubscription = this.drawChartActionScheduler.pipe(
            debounceTime(250),
            tap(() => this.drawChart())
        ).subscribe();
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

        this.connectedScatterPlotScales = createConnectedScatterPlotScales({
            containerHeight: payload.containerHeight,
            containerWidth: payload.containerWidth,
            connectedScatterGroups: this.model
        });

        this.cd.markForCheck();

    }

    getContainerTransform(): string {
        return "translate(" + this.config.margin.left + " " + this.config.margin.top + ")";
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


    getViewBox() {
        const rect = this.elRef.nativeElement.getBoundingClientRect() as DOMRect;

        const height = rect.height - this.config.margin.top - this.config.margin.bottom;
        const width = rect.width - this.config.margin.left - this.config.margin.right;

        return "0 0 " + width + " " + height;
    }

}
