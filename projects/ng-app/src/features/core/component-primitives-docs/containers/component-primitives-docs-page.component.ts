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
                    Component primitives
                </dgp-docs-chapter-title>

                <p>
                    Utilities and patterns for building components.
                </p>

                <dgp-docs-section-title>
                    Overview
                </dgp-docs-section-title>

                <p>
                    <code>dgp-ng-app</code> includes several base classes for components.
                </p>

                <p>
                    They include some basic functionality such as standardized input names
                    or proxy methods and they help classify components into certain categories.
                </p>

                <p>
                    Note that those base classes help implement certain patterns more easily
                    but are not meant to be an exhaustive list.
                </p>

                <dgp-component-primitive-overview-table></dgp-component-primitive-overview-table>

                <dgp-view-primitive-docs-section></dgp-view-primitive-docs-section>

                <dgp-model-editor-primitive-docs-section></dgp-model-editor-primitive-docs-section>

                <dgp-container-primitive-docs-section></dgp-container-primitive-docs-section>

                <dgp-docs-section-title>
                    Hybrid
                </dgp-docs-section-title>

                <p>
                    Hybrid components combine the capabilities of a model editor and a container.
                </p>

                <p>
                    Often they user their model to enrich further data for it from the store or they
                    dispatch actions internally because processing updates via outputs gets unwieldy.
                </p>

            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentPrimitivesDocsPageComponent {

}
