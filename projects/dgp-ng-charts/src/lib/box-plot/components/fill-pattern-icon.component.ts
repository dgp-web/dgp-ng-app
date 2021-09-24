import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DgpView } from "dgp-ng-app";
import { FillPattern } from "../models";
import { getMaskIdForFillPattern } from "../functions/get-mask-id-for-fill-pattern.function";

@Component({
    selector: "dgp-fill-pattern-icon",
    template: `
        <svg>
            <defs>
                <ng-container [ngSwitch]="model">

                    <ng-container *ngSwitchCase="fillPatternEnum.HorizontalLines">
                        <pattern dgpHorizontalLinesPattern></pattern>
                        <mask dgpHorizontalLinesMask></mask>
                    </ng-container>

                    <ng-container *ngSwitchCase="fillPatternEnum.VerticalLines">
                        <pattern dgpVerticalLinesPattern></pattern>
                        <mask dgpHorizontalLinesMask></mask>
                    </ng-container>

                    <ng-container *ngSwitchCase="fillPatternEnum.LinesFromLeftTopToRightBottom">
                        <pattern dgpLinesFromLeftTopToRightBottomPattern></pattern>
                        <mask dgpLinesFromLeftTopToRightBottomMask></mask>
                    </ng-container>

                    <ng-container *ngSwitchCase="fillPatternEnum.LinesFromLeftBottomToRightTop">
                        <pattern dgpLinesFromLeftBottomToRightTopPattern></pattern>
                        <mask dgpLinesFromLeftBottomToRightTopMask></mask>
                    </ng-container>

                    <ng-container *ngSwitchCase="fillPatternEnum.Grid">
                        <pattern dgpHorizontalLinesPattern></pattern>
                        <pattern dgpVerticalLinesPattern></pattern>
                        <mask dgpGridMask></mask>
                    </ng-container>

                    <ng-container *ngSwitchCase="fillPatternEnum.DiagonalCheckerboard">
                        <pattern dgpLinesFromLeftTopToRightBottomPattern></pattern>
                        <pattern dgpLinesFromLeftBottomToRightTopPattern></pattern>
                        <mask dgpDiagonalGridMask></mask>
                    </ng-container>

                    <ng-container *ngSwitchCase="fillPatternEnum.Checkerboard">
                        <pattern dgpCheckerboardPattern></pattern>
                        <mask dgpCheckerboardMask></mask>
                    </ng-container>

                    <ng-container *ngSwitchCase="fillPatternEnum.DiagonalCheckerboard">
                        <pattern dgpDiagonalCheckerboardPattern></pattern>
                        <mask dgpDiagonalCheckerboardMask></mask>
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
        const maskId: string = getMaskIdForFillPattern(this.model);
        if (!maskId) return "";
        return "url(#" + maskId + ")";
    }

}
