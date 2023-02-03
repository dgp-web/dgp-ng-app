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
                        dgpCircle
                        [width]="dotSize"></svg:circle>
            <svg:circle xmlns:svg="http://www.w3.org/2000/svg"
                        *ngSwitchCase="shapeEnum.Circle"
                        dgpCircle
                        [width]="dotSize"></svg:circle>
            <svg:rect xmlns:svg="http://www.w3.org/2000/svg"
                      *ngSwitchCase="shapeEnum.Rectangle"
                      dgpRectangle
                      [width]="dotSize-2"
                      [height]="dotSize-2"></svg:rect>
            <svg:polygon xmlns:svg="http://www.w3.org/2000/svg"
                         *ngSwitchCase="shapeEnum.Rhombus"
                         dgpRhombus
                         [width]="dotSize"
                         [height]="dotSize"></svg:polygon>
            <svg:polygon xmlns:svg="http://www.w3.org/2000/svg"
                         *ngSwitchCase="shapeEnum.Star"
                         dgpStar
                         [width]="dotSize"
                         [height]="dotSize"></svg:polygon>
            <svg:polygon xmlns:svg="http://www.w3.org/2000/svg"
                         *ngSwitchCase="shapeEnum.Cross"
                         dgpCross
                         [width]="dotSize"
                         [height]="dotSize"></svg:polygon>
            <svg:polygon xmlns:svg="http://www.w3.org/2000/svg"
                         *ngSwitchCase="shapeEnum.Triangle"
                         dgpTriangle
                         [width]="dotSize"
                         [height]="dotSize"></svg:polygon>
            <svg:polygon xmlns:svg="http://www.w3.org/2000/svg"
                         *ngSwitchCase="shapeEnum.TriangleDown"
                         dgpTriangleDown
                         [width]="dotSize"
                         [height]="dotSize"></svg:polygon>
            <svg:polygon xmlns:svg="http://www.w3.org/2000/svg"
                         *ngSwitchCase="shapeEnum.TriangleRight"
                         dgpTriangleRight
                         [width]="dotSize"
                         [height]="dotSize"></svg:polygon>
            <svg:polygon xmlns:svg="http://www.w3.org/2000/svg"
                         *ngSwitchCase="shapeEnum.TriangleLeft"
                         dgpTriangleLeft
                         [width]="dotSize"
                         [height]="dotSize"></svg:polygon>
        </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DgpDotComponent extends DgpView<Shape> implements DotConfig {
    readonly shapeEnum = Shape;

    @Input()
    dotSize: number;

}
