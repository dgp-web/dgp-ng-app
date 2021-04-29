import { Component } from "@angular/core";
import { DgpContainer } from "../../utils/container.component-base";
import { ActionContextState } from "../../action-context/models/action-context-state.model";
import { isAnyActionContextSelected } from "../../action-context/selectors/is-any-action-context-selected.selector";
import { getSelectedActionContextLabel } from "../../action-context/selectors/get-selected-action-context-label.selector";

@Component({
    selector: "dgp-page-header-context-actions",
    template: `
        <div *ngIf="isAnyActionContextSelected$ | async"
             style="position: relative;"
             class="mat-elevation-z10">
            <mat-toolbar color="accent"
                         style="flex-grow: 0;">
                <ng-content></ng-content>
            </mat-toolbar>
            <mat-toolbar *ngIf="currentActionContextLabel$ | async as label"
                         color="accent"
                         class="dgp-bg--accent"
                         style="flex-grow: 0; position: absolute; left: 0; right: 0; height: auto; font-size: small;">
                {{ label }}
            </mat-toolbar>
        </div>
    `
})
export class DgpPageHeaderContextActionsComponent extends DgpContainer<ActionContextState> {
    readonly isAnyActionContextSelected$ = this.select(isAnyActionContextSelected);
    readonly currentActionContextLabel$ = this.select(getSelectedActionContextLabel);
}
