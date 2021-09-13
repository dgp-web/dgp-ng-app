import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DgpView } from "dgp-ng-app";
import { FillPattern } from "../models";

@Component({
    selector: "dgp-fill-pattern-icon",
    template: `
        <svg>
            <defs>
                <ng-container [ngSwitch]="model">

                    <ng-container *ngSwitchCase="fillPatternEnum.HorizontalLines">
                        <dgp-horizontal-lines-pattern></dgp-horizontal-lines-pattern>
                        <dgp-horizontal-lines-mask></dgp-horizontal-lines-mask>
                    </ng-container>

                    <ng-container *ngSwitchCase="fillPatternEnum.VerticalLines">
                        <dgp-vertical-lines-pattern></dgp-vertical-lines-pattern>
                        <dgp-vertical-lines-mask></dgp-vertical-lines-mask>
                    </ng-container>

                    <ng-container *ngSwitchCase="fillPatternEnum.LinesFromLeftTopToRightBottom">
                        <dgp-lines-from-left-top-to-right-bottom-pattern></dgp-lines-from-left-top-to-right-bottom-pattern>
                        <dgp-lines-from-left-top-to-right-bottom-mask></dgp-lines-from-left-top-to-right-bottom-mask>
                    </ng-container>

                    <ng-container *ngSwitchCase="fillPatternEnum.LinesFromLeftBottomToRightTop">
                        <dgp-lines-from-left-bottom-to-right-top-pattern></dgp-lines-from-left-bottom-to-right-top-pattern>
                        <dgp-lines-from-left-bottom-to-right-top-mask></dgp-lines-from-left-bottom-to-right-top-mask>
                    </ng-container>

                    <ng-container *ngSwitchCase="fillPatternEnum.Grid">
                        <dgp-horizontal-lines-pattern></dgp-horizontal-lines-pattern>
                        <dgp-vertical-lines-pattern></dgp-vertical-lines-pattern>
                        <dgp-grid-mask></dgp-grid-mask>
                    </ng-container>

                    <ng-container *ngSwitchCase="fillPatternEnum.DiagonalCheckerboard">
                        <dgp-lines-from-left-top-to-right-bottom-pattern></dgp-lines-from-left-top-to-right-bottom-pattern>
                        <dgp-lines-from-left-bottom-to-right-top-pattern></dgp-lines-from-left-bottom-to-right-top-pattern>
                        <dgp-diagonal-grid-mask></dgp-diagonal-grid-mask>
                    </ng-container>

                    <ng-container *ngSwitchCase="fillPatternEnum.Checkerboard">
                        <dgp-checkerboard-pattern></dgp-checkerboard-pattern>
                        <dgp-checkerboard-mask></dgp-checkerboard-mask>
                    </ng-container>

                    <ng-container *ngSwitchCase="fillPatternEnum.DiagonalCheckerboard">
                        <dgp-diagonal-checkerboard-pattern></dgp-diagonal-checkerboard-pattern>
                        <dgp-diagonal-checkerboard-mask></dgp-diagonal-checkerboard-mask>
                    </ng-container>

                </ng-container>
            </defs>
            <rect x="0"
                  y="0"
                  [attr.mask]="getMaskForFillPattern()"
                  stroke-width="2"/>

        </svg>
    `,
    styles: [`
        :host {
            display: inline-block;
            width: 24px;
            height: 24px;
            margin-right: 8px;
        }

        svg {
            width: 100%;
            height: 100%;
        }

        rect {
            width: 100%;
            height: 100%;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgpFillPatternIconComponent extends DgpView<FillPattern> {
    readonly fillPatternEnum = FillPattern;

    getMaskForFillPattern() {
        let maskId: string = null;

        switch (this.model) {
            case FillPattern.All:
                break;
            case FillPattern.VerticalLines:
                maskId = "vertical-lines-mask";
                break;
            case FillPattern.LinesFromLeftTopToRightBottom:
                maskId = "lines-from-left-top-to-right-bottom-mask";
                break;
            case FillPattern.HorizontalLines:
                maskId = "horizontal-lines-mask";
                break;
            case FillPattern.LinesFromLeftBottomToRightTop:
                maskId = "lines-from-left-bottom-to-right-top-mask";
                break;
            case FillPattern.Grid:
                maskId = "grid-mask";
                break;
            case FillPattern.DiagonalGrid:
                maskId = "diagonal-grid-mask";
                break;
            case FillPattern.Checkerboard:
                maskId = "checkerboard-mask";
                break;
            case FillPattern.DiagonalCheckerboard:
                maskId = "diagonal-checkerboard-mask";
                break;
        }

        if (!maskId) return "";

        return "url(#" + maskId + ")";
    }


}
