import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { DgpView } from "dgp-ng-app";
import { Shape } from "../models";

@Component({
    selector: "dgp-svg-shape",
    template: `
        <ng-container [ngSwitch]="model">
            <dgp-circle-shape *ngSwitchCase="shapeEnum.Circle"
                              [fillColor]="fillColor"></dgp-circle-shape>
            <dgp-rectangle-shape *ngSwitchCase="shapeEnum.Rectangle"
                                 [fillColor]="fillColor"></dgp-rectangle-shape>
            <dgp-triangle-shape *ngSwitchCase="shapeEnum.Triangle"
                                [fillColor]="fillColor"></dgp-triangle-shape>
            <dgp-triangle-down-shape *ngSwitchCase="shapeEnum.TriangleDown"
                                     [fillColor]="fillColor"></dgp-triangle-down-shape>
            <dgp-triangle-right-shape
                *ngSwitchCase="shapeEnum.TriangleRight"
                [fillColor]="fillColor"></dgp-triangle-right-shape>
            <dgp-triangle-left-shape *ngSwitchCase="shapeEnum.TriangleLeft"
                                     [fillColor]="fillColor"></dgp-triangle-left-shape>
            <dgp-star-shape *ngSwitchCase="shapeEnum.Star"
                            [fillColor]="fillColor"></dgp-star-shape>
            <dgp-rhombus-shape *ngSwitchCase="shapeEnum.Rhombus"
                               [fillColor]="fillColor"></dgp-rhombus-shape>
        </ng-container>
    `,
    styles: [`
        :host {
            display: inline-flex;
            width: 48px;
            height: 48px;
            justify-content: center;
            align-items: center;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SVGShapeComponent extends DgpView<Shape> {
    readonly shapeEnum = Shape;
    @Input()
    fillColor: string;
}
