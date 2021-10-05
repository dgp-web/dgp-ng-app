import { ChangeDetectionStrategy, Component } from "@angular/core";

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
                    <dgp-shape-select></dgp-shape-select>
                </div>

            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShapesAndPatternLabsComponent {

}
