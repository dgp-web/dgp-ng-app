import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ShapeBaseComponent } from "./shape.base-component";

@Component({
    selector: "dgp-circle-shape",
    template: `
        <svg xmlns="http://www.w3.org/2000/svg"
             [style.width.px]="width"
             [style.height.px]="height">

            <defs>
                <ng-container [ngSwitch]="fillPattern">

                    <ng-container *ngSwitchCase="fillPatternEnum.HorizontalLines">
                        <pattern dgpHorizontalLinesPattern></pattern>
                        <mask dgpHorizontalLinesMask></mask>
                    </ng-container>

                    <ng-container *ngSwitchCase="fillPatternEnum.VerticalLines">
                        <pattern dgpVerticalLinesPattern></pattern>
                        <mask dgpVerticalLinesMask></mask>
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

                    <ng-container *ngSwitchCase="fillPatternEnum.DiagonalGrid">
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

            <circle dgpCircle
                    [style.fill]="fillColor"
                    [style.stroke]="fillColor"
                    [width]="width"
                    [height]="height"
                    [attr.mask]="getMaskForFillPattern()"/>
        </svg>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CircleShapeComponent extends ShapeBaseComponent {

}
