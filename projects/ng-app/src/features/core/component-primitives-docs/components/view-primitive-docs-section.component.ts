import { Component } from "@angular/core";

@Component({
    selector: "dgp-view-primitive-docs-section",
    template: `
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
    `
})
export class ViewPrimitiveDocsSectionComponent {
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
