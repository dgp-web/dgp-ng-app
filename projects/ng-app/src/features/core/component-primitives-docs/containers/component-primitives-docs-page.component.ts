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


                <dgp-docs-section-title>
                    View
                </dgp-docs-section-title>

                <p>
                    Views help visualize a model. They receive a model as input and can access it
                    synchronously or asynchronously via a <code>model$</code>:
                </p>

                <p>
                    They also offer a <code>disabled</code> input in case the display needs to
                    be handled adjusted when the component is disabled.
                </p>

                Implementation
                <dgp-docs-code-block [code]="viewImplSampleCode"></dgp-docs-code-block>

                Usage
                <dgp-docs-code-block [code]="viewUsageSampleCode"
                                     language="html"></dgp-docs-code-block>

            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentPrimitivesDocsPageComponent {
    readonly viewImplSampleCode =
        `import { User } from "../../models/user.model";

@Component({
    selector: "dgp-user-label",
    template: '
        <div class="name">{{model.lastName}} {{model.firstName}}</div>
        <div *ngIf="!disabled"
             class="age">{{(model$ | async).age}}</div>
   '
})
export class UserLabelComponent extends DgpView<User> {}
`;
    readonly viewUsageSampleCode =
        `<dgp-user-label [model]="user"
                [disabled]="disabled"></dgp-user-label>`;
}
