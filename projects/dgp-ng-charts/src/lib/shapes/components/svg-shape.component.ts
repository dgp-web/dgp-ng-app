import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";
import { DgpView } from "dgp-ng-app";
import { Shape } from "../models";
import { FillPattern } from "../../fill-pattern-icon/models";
import { idPrefixProvider } from "../../shared/id-prefix-provider.constant";

@Component({
    selector: "dgp-svg-shape",
    template: `
@switch (model) {
  @case (shapeEnum.Circle) {
    <dgp-circle-shape
      [fillColor]="fillColor"
      [fillPattern]="fillPattern"
      [width]="getWidth()"
    [height]="getHeight()"></dgp-circle-shape>
  }
  @case (shapeEnum.Cross) {
    <dgp-cross-shape
      [fillColor]="fillColor"
      [fillPattern]="fillPattern"
      [width]="getWidth()"
    [height]="getHeight()"></dgp-cross-shape>
  }
  @case (shapeEnum.Rectangle) {
    <dgp-rectangle-shape
      [fillColor]="fillColor"
      [fillPattern]="fillPattern"
      [width]="getWidth()"
    [height]="getHeight()"></dgp-rectangle-shape>
  }
  @case (shapeEnum.Triangle) {
    <dgp-triangle-shape
      [fillColor]="fillColor"
      [fillPattern]="fillPattern"
      [width]="getWidth()"
    [height]="getHeight()"></dgp-triangle-shape>
  }
  @case (shapeEnum.TriangleDown) {
    <dgp-triangle-down-shape
      [fillColor]="fillColor"
      [fillPattern]="fillPattern"
      [width]="getWidth()"
    [height]="getHeight()"></dgp-triangle-down-shape>
  }
  @case (shapeEnum.TriangleRight) {
    <dgp-triangle-right-shape
      [fillColor]="fillColor"
      [fillPattern]="fillPattern"
      [width]="getWidth()"
    [height]="getHeight()"></dgp-triangle-right-shape>
  }
  @case (shapeEnum.TriangleLeft) {
    <dgp-triangle-left-shape
      [fillColor]="fillColor"
      [fillPattern]="fillPattern"
      [width]="getWidth()"
    [height]="getHeight()"></dgp-triangle-left-shape>
  }
  @case (shapeEnum.Star) {
    <dgp-star-shape
      [fillColor]="fillColor"
      [fillPattern]="fillPattern"
      [width]="getWidth()"
    [height]="getHeight()"></dgp-star-shape>
  }
  @case (shapeEnum.Rhombus) {
    <dgp-rhombus-shape
      [fillColor]="fillColor"
      [fillPattern]="fillPattern"
      [width]="getWidth()"
    [height]="getHeight()"></dgp-rhombus-shape>
  }
}
`,
    styles: [`
        :host {
            display: inline-flex;
            justify-content: center;
            align-items: center;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        idPrefixProvider
    ],
    standalone: false
})
export class SVGShapeComponent extends DgpView<Shape> {

    readonly shapeEnum = Shape;

    @Input()
    fillPattern: FillPattern;

    @Input()
    fillColor: string;

    @HostBinding("style.width.px")
    @Input()
    width = 48;

    @HostBinding("style.height.px")
    @Input()
    height = this.width;

    getWidth() {
        return this.width - 24;
    }

    getHeight() {
        return this.height - 24;
    }


}
