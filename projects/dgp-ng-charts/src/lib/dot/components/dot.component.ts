import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { DgpView } from "dgp-ng-app";
import { Shape } from "../../shapes/models";
import { DotConfig } from "../../connected-scatter-plot/models";

@Component({
    selector: "[dgpDot]",
    template: `
        <ng-container [ngSwitch]="model">
            <svg:circle xmlns:svg="http://www.w3.org/2000/svg"
                        *ngSwitchDefault
                        dgpCircle></svg:circle>
            <svg:circle xmlns:svg="http://www.w3.org/2000/svg"
                        *ngSwitchCase="shapeEnum.Circle"
                        dgpCircle></svg:circle>
            <svg:rect xmlns:svg="http://www.w3.org/2000/svg"
                      *ngSwitchCase="shapeEnum.Rectangle"
                      dgpRectangle></svg:rect>
            <svg:polygon xmlns:svg="http://www.w3.org/2000/svg"
                         *ngSwitchCase="shapeEnum.Rhombus"
                         dgpRhombus></svg:polygon>
            <svg:polygon xmlns:svg="http://www.w3.org/2000/svg"
                         *ngSwitchCase="shapeEnum.Star"
                         dgpStar></svg:polygon>
            <svg:polygon xmlns:svg="http://www.w3.org/2000/svg"
                         *ngSwitchCase="shapeEnum.Cross"
                         dgpCross></svg:polygon>
            <svg:polygon xmlns:svg="http://www.w3.org/2000/svg"
                         *ngSwitchCase="shapeEnum.Triangle"
                         dgpTriangle></svg:polygon>
            <svg:polygon xmlns:svg="http://www.w3.org/2000/svg"
                         *ngSwitchCase="shapeEnum.TriangleDown"
                         dgpTriangleDown></svg:polygon>
            <svg:polygon xmlns:svg="http://www.w3.org/2000/svg"
                         *ngSwitchCase="shapeEnum.TriangleRight"
                         dgpTriangleRight></svg:polygon>
            <svg:polygon xmlns:svg="http://www.w3.org/2000/svg"
                         *ngSwitchCase="shapeEnum.TriangleLeft"
                         dgpTriangleLeft></svg:polygon>
        </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DgpDotComponent extends DgpView<Shape> implements DotConfig {
    readonly shapeEnum = Shape;

    @Input()
    dotSize: number;

}
