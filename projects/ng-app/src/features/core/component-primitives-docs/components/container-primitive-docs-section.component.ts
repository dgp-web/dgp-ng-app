import { Component } from "@angular/core";

@Component({
    selector: "dgp-container-primitive-docs-section",
    template: `
        <dgp-docs-section-title>
            Container
        </dgp-docs-section-title>

        <p>
            Containers are components using the store to dispatch actions and select data.
        </p>

        <p>
            The methods <code>dispatch</code> and <code>select</code> are proxied to make
            working with them still easier.
        </p>

        <p>
            Containers often don't have inputs and outputs at all and serve as link
            between presentational components and the store.
        </p>

        Implementation
        <dgp-docs-code-block [code]="containerImplSampleCode"></dgp-docs-code-block>

    `
})
export class ContainerPrimitiveDocsSectionComponent {
    readonly containerImplSampleCode =
        `import { DgpContainer } from "dgp-ng-app";
import { AppState } from "../../models/app-state.model";
import { getCurrentUser } from "../../selectors/get-current-user.selector";
import { updateCurrentUser } from "../../actions/update-current-user.action";

@Component({
    selector: "dgp-current-user-name-input",
    template: '
        <dgp-user-name-input [model]="currentUser$ | async"
                             (modelChange)="updateCurrentUser($event)">
        </dgp-user-name-input>
   '
})
export class CurrentUserNameInputComponent extends DgpContainer<AppState> {
    readonly currentUser$ = this.select(getCurrentUser);

    updateCurrentUser(user: User) {
        this.dispatch(updateCurrentUser({user}));
    }
}
`;
}
