import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { DgpView } from "dgp-ng-app";
import { Shape } from "../models";

@Component({
    selector: "dgp-svg-symbol",
    template: `
        <ng-container [ngSwitch]="model">
            <dgp-circle-symbol *ngSwitchCase="shapeEnum.Circle"
                               [fillColor]="fillColor"></dgp-circle-symbol>
            <dgp-rectangle-symbol *ngSwitchCase="shapeEnum.Rectangle"
                                  [fillColor]="fillColor"></dgp-rectangle-symbol>
            <dgp-triangle-symbol *ngSwitchCase="shapeEnum.Triangle"
                                 [fillColor]="fillColor"></dgp-triangle-symbol>
            <dgp-triangle-down-symbol *ngSwitchCase="shapeEnum.TriangleDown"
                                      [fillColor]="fillColor"></dgp-triangle-down-symbol>
            <dgp-triangle-right-symbol
                *ngSwitchCase="shapeEnum.TriangleRight"
                [fillColor]="fillColor"></dgp-triangle-right-symbol>
            <dgp-triangle-left-symbol *ngSwitchCase="shapeEnum.TriangleLeft"
                                      [fillColor]="fillColor"></dgp-triangle-left-symbol>
            <dgp-star-symbol *ngSwitchCase="shapeEnum.Star"
                             [fillColor]="fillColor"></dgp-star-symbol>
            <dgp-rhombus-symbol *ngSwitchCase="shapeEnum.Rhombus"
                                [fillColor]="fillColor"></dgp-rhombus-symbol>
        </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SVGSymbolComponent extends DgpView<Shape> {
    readonly shapeEnum = Shape;
    @Input()
    fillColor: string;
}
