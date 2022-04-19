import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DgpView } from "dgp-ng-app";
import { Shape } from "../../shapes/models";

@Component({
    selector: "[dgpDot]",
    template: `
        <ng-container [ngSwitch]="model">
            <svg:circle *ngSwitchDefault
                        dgpCircle></svg:circle>
            <svg:circle *ngSwitchCase="shapeEnum.Circle"
                        dgpCircle></svg:circle>
            <svg:rect *ngSwitchCase="shapeEnum.Rectangle"
                      dgpRectangle></svg:rect>
            <svg:polygon *ngSwitchCase="shapeEnum.Rhombus"
                         dgpRhombus></svg:polygon>
            <svg:polygon *ngSwitchCase="shapeEnum.Star"
                         dgpStar></svg:polygon>
            <svg:polygon *ngSwitchCase="shapeEnum.Cross"
                         dgpCross></svg:polygon>
            <svg:polygon *ngSwitchCase="shapeEnum.Triangle"
                         dgpTriangle></svg:polygon>
            <svg:polygon *ngSwitchCase="shapeEnum.TriangleDown"
                         dgpTriangleDown></svg:polygon>
            <svg:polygon *ngSwitchCase="shapeEnum.TriangleRight"
                         dgpTriangleRight></svg:polygon>
            <svg:polygon *ngSwitchCase="shapeEnum.TriangleLeft"
                         dgpTriangleLeft></svg:polygon>
        </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DgpDotComponent extends DgpView<Shape> {
    readonly shapeEnum = Shape;
}
