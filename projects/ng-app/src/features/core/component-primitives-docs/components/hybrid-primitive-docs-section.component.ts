import { Component } from "@angular/core";

@Component({
    selector: "dgp-hybrid-primitive-docs-section",
    template: `
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

        <dgp-docs-code-block [code]="hybridImplSampleCode"></dgp-docs-code-block>
    `,
    standalone: false
})
export class HybridPrimitiveDocsSectionComponent {
    readonly hybridImplSampleCode =
        `import { DgpHybridComponentBase } from "dgp-ng-app";
import { AppState } from "../../models/app-state.model";
import { UserId } from "../../models/user-id.model";
import { getUserById } from "../../selectors/get-user-by-id.selector";
import { updateUser } from "../../actions/update-user.action";

@Component({
    selector: "dgp-selected-user-name-input",
    template: '
        <dgp-user-name-input [model]="user$ | async"
                             (modelChange)="updateUser($event)">
        </dgp-user-name-input>
   '
})
export class CurrentUserNameInputComponent extends DgpHybridComponentBase<UserId, AppState> {
    // the actual user model here is fetched from the store, only the ID is passed as model
    readonly user$ = this.model$.pipe(
        switchMap(x => this.select(getUserById(x.userId))
    );

    updateUser(user: User) {
        this.dispatch(updateUser({user}));
    }
}
`;
}
