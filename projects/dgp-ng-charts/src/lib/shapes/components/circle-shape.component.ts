import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ShapeBaseComponent } from "./shape.base-component";

@Component({
    selector: "dgp-circle-shape",
    template: `
        <svg xmlns="http://www.w3.org/2000/svg"
          [style.width.px]="width"
          [style.height.px]="height">
        
          <defs>
            <ng-container>
              @switch (fillPattern) {
                @case (fillPatternEnum.HorizontalLines) {
                  <ng-container>
                    <pattern dgpHorizontalLinesPattern></pattern>
                    <mask dgpHorizontalLinesMask></mask>
                  </ng-container>
                }
                @case (fillPatternEnum.VerticalLines) {
                  <ng-container>
                    <pattern dgpVerticalLinesPattern></pattern>
                    <mask dgpVerticalLinesMask></mask>
                  </ng-container>
                }
                @case (fillPatternEnum.LinesFromLeftTopToRightBottom) {
                  <ng-container>
                    <pattern dgpLinesFromLeftTopToRightBottomPattern></pattern>
                    <mask dgpLinesFromLeftTopToRightBottomMask></mask>
                  </ng-container>
                }
                @case (fillPatternEnum.LinesFromLeftBottomToRightTop) {
                  <ng-container>
                    <pattern dgpLinesFromLeftBottomToRightTopPattern></pattern>
                    <mask dgpLinesFromLeftBottomToRightTopMask></mask>
                  </ng-container>
                }
                @case (fillPatternEnum.Grid) {
                  <ng-container>
                    <pattern dgpHorizontalLinesPattern></pattern>
                    <pattern dgpVerticalLinesPattern></pattern>
                    <mask dgpGridMask></mask>
                  </ng-container>
                }
                @case (fillPatternEnum.DiagonalGrid) {
                  <ng-container>
                    <pattern dgpLinesFromLeftTopToRightBottomPattern></pattern>
                    <pattern dgpLinesFromLeftBottomToRightTopPattern></pattern>
                    <mask dgpDiagonalGridMask></mask>
                  </ng-container>
                }
                @case (fillPatternEnum.Checkerboard) {
                  <ng-container>
                    <pattern dgpCheckerboardPattern></pattern>
                    <mask dgpCheckerboardMask></mask>
                  </ng-container>
                }
                @case (fillPatternEnum.DiagonalCheckerboard) {
                  <ng-container>
                    <pattern dgpDiagonalCheckerboardPattern></pattern>
                    <mask dgpDiagonalCheckerboardMask></mask>
                  </ng-container>
                }
              }
            </ng-container>
          </defs>
        
          <circle dgpCircle
            [style.fill]="fillColor + '00'"
            [style.stroke]="fillColor"
            [width]="width"
            [height]="height"/>
            <circle dgpCircle
              [style.fill]="fillColor"
              [style.stroke]="fillColor"
              [width]="width"
              [height]="height"
              [attr.mask]="getMaskForFillPattern()"/>
            </svg>
        `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CircleShapeComponent extends ShapeBaseComponent {

}
