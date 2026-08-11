import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-model-editor-primitive-docs-section",
    template: `

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
        <dgp-docs-code-block [code]="modelEditorUsageSampleCode"
                             language="html"></dgp-docs-code-block>

    `,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ModelEditorPrimitiveDocsSectionComponent {
    readonly modelEditorImplSampleCode =
        `import { DgpModelEditorComponentBase } from "dgp-ng-app";
import { User } from "../../models/user.model";

@Component({
    selector: "dgp-user-name-input",
    template: '
        <input [ngModel]="model.firstName"
               (ngModelChange)="updateFirstName($event)">
       <button (click)="resetUserData()"></button>
   '
})
export class UserNameInputComponent extends DgpModelEditorComponentBase<User> {

    updateFirstName(firstName: string) {
        // updateModel takes Partial<User> as payload
        this.updateModel({firstName});
    }

    resetUserData() {
        // updateModel takes User as payload
        this.setModel({
            firstName: "Jane",
            lastName: "Doe",
            age: 1
        });
    }

}
`;
    readonly modelEditorUsageSampleCode =
        `<dgp-user-name-input [model]="user"
                     (modelChange)="updateUser($event)"
                     [disabled]="disabled"></dgp-user-name-input>
// ...
updateUser(user: User) {
    console.log(user);
}
`;
}
