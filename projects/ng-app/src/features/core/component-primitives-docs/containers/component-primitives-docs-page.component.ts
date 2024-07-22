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

                <dgp-docs-section-title>
                    Model editor
                </dgp-docs-section-title>

                <p>
                    Model editors are views with update capabilities.
                </p>

                <p>
                    They support non-mutating update patterns via two methods:
                    <code>setModel</code> and <code>updateModel</code>.
                </p>

                <ul>
                    <li>
                        Non-mutating means that the passed object is not modified
                        but a new object is created or derived from the previous
                        one and then published via the <code>modelChange</code> output.
                    </li>
                    <li>
                        <code>setModel</code> replaces an existing model.
                    </li>
                    <li>
                        <code>updateModels</code> updates specific attributes but
                        leaves all others as they are via <code>Object.assign</code>.
                    </li>
                </ul>

                Implementation
                <dgp-docs-code-block [code]="modelEditorImplSampleCode"></dgp-docs-code-block>

                Usage

            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentPrimitivesDocsPageComponent {
    readonly modelEditorImplSampleCode =
        `import { DgpModelEditorComponentBase } from "dgp-ng-app";
import { User } from "../../models/user.model";

@Component({
    selector: "dgp-user-name-input",
    template: '
        <input [ngModel]="model.firstName"
               (ngModelChange)="updateFirstName($event)">
   '
})
export class UserNameInputComponent extends DgpModelEditorComponentBase<User> {

    updateFirstName(firstName: string) {
        // updateModel takes Partial<User> as payload
        this.updateModel({firstName});
    }

}
`;
}
