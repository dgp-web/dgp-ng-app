import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Store } from "@ngrx/store";
import { appEntityStore, AppState, User } from "../../../store";

@Component({
    selector: "dgp-broadcasting-docs-page",
    template: `

        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Empty state
        </dgp-page-header>

        <dgp-docs-page>

            <dgp-docs-page-content>

                <dgp-docs-chapter-title>
                    Broadcasting
                </dgp-docs-chapter-title>

                <p>
                    Bidirectional data sync between windows and tabs.
                </p>

                <dgp-docs-section-title>
                    Demo
                </dgp-docs-section-title>

                <div>

                    <div *ngFor="let user of (users$ | async); trackBy: trackBy">
                        <mat-form-field>
                            <input matInput
                                   [ngModel]="user.firstName"
                                   (ngModelChange)="updateUser(user.userId, { firstName: $event })">
                        </mat-form-field>

                    </div>

                    <button mat-raised-button
                            (click)="addUser()">
                        Add user
                    </button>

                </div>

            </dgp-docs-page-content>

        </dgp-docs-page>
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BroadcastingDocsPageComponent {

    readonly users$ = this.store.select(
        appEntityStore.selectors.user.getAll
    );
    trackBy = (index, item: User) => item.userId;

    constructor(
        private readonly store: Store<AppState>
    ) {
    }

    addUser() {
        const user: User = {
            userId: new Date().toISOString(),
            lastName: "Doe",
            firstName: "John"
        };

        this.store.dispatch(
            appEntityStore.actions.composeEntityActions({
                add: {
                    user: {
                        [user.userId]: user
                    }
                }
            })
        );
    }

    updateUser(userId: string, user: Partial<User>) {
        this.store.dispatch(
            appEntityStore.actions.composeEntityActions({
                update: {
                    user: {
                        [userId]: user
                    }
                }
            })
        );
    }
}
