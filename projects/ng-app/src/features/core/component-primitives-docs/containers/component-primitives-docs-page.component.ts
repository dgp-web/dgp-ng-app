import { Component } from "@angular/core";

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

                <dgp-hybrid-primitive-docs-section></dgp-hybrid-primitive-docs-section>

                <dgp-docs-section-title>
                    When to use which pattern
                </dgp-docs-section-title>

                <ul>
                    <li>
                        Don't add more capabilities to your components than necessary. If a view fits your needs, don't make it
                        a model editor.
                    </li>
                    <li>
                        Help others and your future self understand the purpose of the component at one glance.
                    </li>
                    <li>
                        Break down your components. The smaller your components the easier it is to pick a primitive for them.
                    </li>
                </ul>

                <dgp-docs-section-title>
                    Common errors
                </dgp-docs-section-title>

                <ul>
                    <li>
                        Adding <code>@Input() disabled</code>: all primitives except the container already have it.
                    </li>
                    <li>
                        Adding inputs for data other than model instead of enriching it from the store. This clutters your
                        data handling in most cases.
                    </li>
                    <li>
                        Mutating models in place. <code>dgp-ng-app</code>'s primitives are geared towards redux-style
                        data architectures that derive new states from old ones..
                    </li>
                </ul>

            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    styles: [`

    `]
})
export class ComponentPrimitivesDocsPageComponent {

}
