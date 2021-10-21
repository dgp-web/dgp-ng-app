import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FillPattern, Shape } from "dgp-ng-charts";

@Component({
    selector: "dgp-shapes-and-pattern-labs",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Charts
        </dgp-page-header>

        <dgp-docs-page>

            <dgp-docs-page-content>

                <dgp-docs-chapter-title>
                    Shapes and patterns
                </dgp-docs-chapter-title>

                <div>
                    <!--   <dgp-shape-select [model]="shape"
                                         (modelChange)="updateShape($event)"></dgp-shape-select>

                       <dgp-fill-pattern-select [model]="fillPattern"
                                                (modelChange)="updateFillPattern($event)"></dgp-fill-pattern-select>

                       <dgp-svg-shape [model]="shape"
                                      [fillColor]="colorHex"></dgp-svg-shape>-->

                    <dgp-svg-shape [model]="shape"
                                   [fillColor]="colorHex"
                                   [fillPattern]="fillPatternEnum.LinesFromLeftBottomToRightTop"
                                   [width]="64"
                                   [height]="64"></dgp-svg-shape>

                    <!-- <dgp-fill-pattern-icon [model]="fillPattern"
                                            [colorHex]="colorHex"></dgp-fill-pattern-icon>

                     <mat-form-field>
                         <input matInput
                                type="color"
                                [ngModel]="colorHex"
                                (ngModelChange)="updateColorHex($event)">
                     </mat-form-field>-->


                </div>

            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShapesAndPatternLabsComponent {

    readonly fillPatternEnum = FillPattern;
    readonly shapeEnum = Shape;

    fillPattern = FillPattern.LinesFromLeftBottomToRightTop;
    shape = Shape.Rhombus;

    colorHex = "#ff6666";

    updateShape(shape: Shape) {
        this.shape = shape;
    }

    updateColorHex(colorHex: string) {
        this.colorHex = colorHex;
    }

    updateFillPattern(fillPattern: FillPattern) {
        this.fillPattern = fillPattern;
    }
}
