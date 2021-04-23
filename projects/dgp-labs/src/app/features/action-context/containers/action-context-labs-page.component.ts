import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionContextState, DgpContainer, getSelectedActionContextKey } from "dgp-ng-app";

@Component({
    selector: "dgp-action-context-labs-page",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Action-context
            <dgp-spacer></dgp-spacer>
            {{ selectedActionContext$ | async }}
        </dgp-page-header>

        <div dgpActionContext
             actionContextKey="My action context">
            Test
        </div>

    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            height: 100%;
            overflow: auto;
        }

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionContextLabsPageComponent extends DgpContainer<ActionContextState> {
    readonly selectedActionContext$ = this.select(getSelectedActionContextKey);
}
