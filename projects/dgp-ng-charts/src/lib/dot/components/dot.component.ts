import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { DgpView } from "dgp-ng-app";
import { Shape } from "../../shapes/models";
import { DotConfig } from "../../connected-scatter-plot/models";

@Component({
    selector: "[dgpDot]",
    template: `
@switch (model) {
  @default {
    <svg:circle xmlns:svg="http://www.w3.org/2000/svg"
      dgpCircle
      [width]="dotSize"></svg:circle>
    }
    @case (shapeEnum.Circle) {
      <svg:circle xmlns:svg="http://www.w3.org/2000/svg"
        dgpCircle
        [width]="dotSize"></svg:circle>
      }
      @case (shapeEnum.Rectangle) {
        <svg:rect xmlns:svg="http://www.w3.org/2000/svg"
          dgpRectangle
          [width]="dotSize-2"
          [height]="dotSize-2"></svg:rect>
        }
        @case (shapeEnum.Rhombus) {
          <svg:polygon xmlns:svg="http://www.w3.org/2000/svg"
            dgpRhombus
            [width]="dotSize"
            [height]="dotSize"></svg:polygon>
          }
          @case (shapeEnum.Star) {
            <svg:polygon xmlns:svg="http://www.w3.org/2000/svg"
              dgpStar
              [width]="dotSize"
              [height]="dotSize"></svg:polygon>
            }
            @case (shapeEnum.Cross) {
              <svg:polygon xmlns:svg="http://www.w3.org/2000/svg"
                dgpCross
                [width]="dotSize"
                [height]="dotSize"></svg:polygon>
              }
              @case (shapeEnum.Triangle) {
                <svg:polygon xmlns:svg="http://www.w3.org/2000/svg"
                  dgpTriangle
                  [width]="dotSize"
                  [height]="dotSize"></svg:polygon>
                }
                @case (shapeEnum.TriangleDown) {
                  <svg:polygon xmlns:svg="http://www.w3.org/2000/svg"
                    dgpTriangleDown
                    [width]="dotSize"
                    [height]="dotSize"></svg:polygon>
                  }
                  @case (shapeEnum.TriangleRight) {
                    <svg:polygon xmlns:svg="http://www.w3.org/2000/svg"
                      dgpTriangleRight
                      [width]="dotSize"
                      [height]="dotSize"></svg:polygon>
                    }
                    @case (shapeEnum.TriangleLeft) {
                      <svg:polygon xmlns:svg="http://www.w3.org/2000/svg"
                        dgpTriangleLeft
                        [width]="dotSize"
                        [height]="dotSize"></svg:polygon>
                      }
                    }
`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DgpDotComponent extends DgpView<Shape> implements DotConfig {
    readonly shapeEnum = Shape;

    @Input()
    dotSize: number;

}
