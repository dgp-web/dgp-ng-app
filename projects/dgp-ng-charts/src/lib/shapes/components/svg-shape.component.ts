import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";
import { DgpView } from "dgp-ng-app";
import { Shape } from "../models";
import { FillPattern } from "../../fill-pattern-icon/models";

@Component({
    selector: "dgp-svg-shape",
    template: `
        <ng-container [ngSwitch]="model">
            <dgp-circle-shape *ngSwitchCase="shapeEnum.Circle"
                              [fillColor]="fillColor"
                              [fillPattern]="fillPattern"
                              [width]="getWidth()"
                              [height]="getHeight()"></dgp-circle-shape>
            <dgp-cross-shape *ngSwitchCase="shapeEnum.Cross"
                             [fillColor]="fillColor"
                             [fillPattern]="fillPattern"
                             [width]="getWidth()"
                             [height]="getHeight()"></dgp-cross-shape>
            <dgp-rectangle-shape *ngSwitchCase="shapeEnum.Rectangle"
                                 [fillColor]="fillColor"
                                 [fillPattern]="fillPattern"
                                 [width]="getWidth()"
                                 [height]="getHeight()"></dgp-rectangle-shape>
            <dgp-triangle-shape *ngSwitchCase="shapeEnum.Triangle"
                                [fillColor]="fillColor"
                                [fillPattern]="fillPattern"
                                [width]="getWidth()"
                                [height]="getHeight()"></dgp-triangle-shape>
            <dgp-triangle-down-shape *ngSwitchCase="shapeEnum.TriangleDown"
                                     [fillColor]="fillColor"
                                     [fillPattern]="fillPattern"
                                     [width]="getWidth()"
                                     [height]="getHeight()"></dgp-triangle-down-shape>
            <dgp-triangle-right-shape
                *ngSwitchCase="shapeEnum.TriangleRight"
                [fillColor]="fillColor"
                [fillPattern]="fillPattern"
                [width]="getWidth()"
                [height]="getHeight()"></dgp-triangle-right-shape>
            <dgp-triangle-left-shape *ngSwitchCase="shapeEnum.TriangleLeft"
                                     [fillColor]="fillColor"
                                     [fillPattern]="fillPattern"
                                     [width]="getWidth()"
                                     [height]="getHeight()"></dgp-triangle-left-shape>
            <dgp-star-shape *ngSwitchCase="shapeEnum.Star"
                            [fillColor]="fillColor"
                            [fillPattern]="fillPattern"
                            [width]="getWidth()"
                            [height]="getHeight()"></dgp-star-shape>
            <dgp-rhombus-shape *ngSwitchCase="shapeEnum.Rhombus"
                               [fillColor]="fillColor"
                               [fillPattern]="fillPattern"
                               [width]="getWidth()"
                               [height]="getHeight()"></dgp-rhombus-shape>
        </ng-container>
    `,
    styles: [`
        :host {
            display: inline-flex;
            justify-content: center;
            align-items: center;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
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
