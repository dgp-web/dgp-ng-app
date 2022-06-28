import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { filterNotNullOrUndefined, observeAttribute$, Size } from "dgp-ng-app";
import { BarChart, BarGroups } from "../models";
import { BehaviorSubject, combineLatest } from "rxjs";
import { debounceTime, map, shareReplay } from "rxjs/operators";
import { createBarChartScales } from "../functions/create-bar-chart-scales.function";
import { idPrefixProvider } from "../../shared/id-prefix-provider.constant";
import { trackByBarGroupId } from "../functions/track-by-bar-group-id.function";
import { trackByBarId } from "../functions/track-by-bar-id.function";
import { defaultBarChartConfig } from "../constants";
import { DgpCardinalYAxisChartComponentBase } from "../../chart/components/cardinal-y-axis-chart.component-base";

@Component({
    selector: "dgp-bar-chart",
    template: `
        <dgp-chart [yAxisTitle]="yAxisTitle"
                   [xAxisTitle]="xAxisTitle"
                   [chartTitle]="chartTitle"
                   (sizeChanged)="onResize($event)">

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

            <dgp-svg-plot [showXAxisGridLines]="showXAxisGridLines"
                          [showYAxisGridLines]="showYAxisGridLines"
                          [scales]="scales$ | async"
                          [config]="config"
                          [size]="size$ | async">

                <svg:defs xmlns:svg="http://www.w3.org/2000/svg"
                          dgpPatternAndMaskDefs></svg:defs>

                <ng-container *ngIf="scales$ | async">
                    <svg:g xmlns:svg="http://www.w3.org/2000/svg"
                           *ngFor="let barGroup of model; trackBy: trackByBarGroupId"
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
                    </svg:g>
                </ng-container>

            </dgp-svg-plot>
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
export class DgpBarChartComponent extends DgpCardinalYAxisChartComponentBase implements BarChart {

    @Input()
    model: BarGroups;
    readonly model$ = observeAttribute$(this as DgpBarChartComponent, "model");

    @Input()
    config = defaultBarChartConfig;

    readonly trackByBarGroupId = trackByBarGroupId;
    readonly trackByBarId = trackByBarId;

    readonly size$ = new BehaviorSubject<Size>(null);

    readonly scales$ = combineLatest([
        this.size$.pipe(filterNotNullOrUndefined()),
        this.model$,
        this.yAxis$
    ]).pipe(
        debounceTime(0),
        map(combination => createBarChartScales({
            containerHeight: combination[0].height,
            containerWidth: combination[0].width,
            barGroups: combination[1] as BarGroups,
            ...combination[2]
        })),
        shareReplay(1)
    );


    onResize(size: Size) {
        this.size$.next(size);
    }

}
