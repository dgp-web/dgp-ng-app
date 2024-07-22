import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "dgp-component-primitives-docs-page",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Component primitives
        </dgp-page-header>

        <dgp-docs-page>

            <dgp-docs-page-content>

                <dgp-docs-chapter-title>
                    Broadcasting
                </dgp-docs-chapter-title>

                <p>
                    Utilities and patterns for building components.
                </p>

                <dgp-docs-section-title>
                    Overview
                </dgp-docs-section-title>

                <dgp-component-primitive-overview-table></dgp-component-primitive-overview-table>

            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentPrimitivesDocsPageComponent {

}
