import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Shape } from "dgp-ng-charts";

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
                    <dgp-shape-select [model]="shape"
                                      (modelChange)="updateShape($event)"></dgp-shape-select>

                    <dgp-svg-symbol [model]="shape"
                                    [fillColor]="colorHex"></dgp-svg-symbol>

                    <mat-form-field>
                        <input matInput
                               type="color"
                               [ngModel]="colorHex"
                               (ngModelChange)="updateColorHex($event)">
                    </mat-form-field>
                </div>

            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShapesAndPatternLabsComponent {

    readonly shapeEnum = Shape;
    shape = Shape.Rhombus;

    colorHex = "#ff6666";

    updateShape(shape: Shape) {
        this.shape = shape;
    }

    updateColorHex(colorHex: string) {
        this.colorHex = colorHex;
    }
}
