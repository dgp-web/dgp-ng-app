import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Store } from "@ngrx/store";
import { appEntityStore, AppState, User } from "../../../store";
import { updateUser } from "../actions";
import { openUrlAsPeon } from "../../../../../dgp-ng-app/src/broadcast/actions";

@Component({
    selector: "dgp-broadcasting-docs-page",
    template: `

        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Empty state
            <dgp-spacer></dgp-spacer>
            <button mat-button
                    (click)="openPeon()">Open as peon</button>
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
                                   (ngModelChange)="updateUser(user, { firstName: $event })">
                        </mat-form-field>

                    </div>

                    <button mat-raised-button
                            (click)="addUser()">
                        Add user
                    </button>

                </div>

                <dgp-docs-chapter-title>
                    1: Import DgpBroadcastStoreModule in your app module
                </dgp-docs-chapter-title>

                <dgp-docs-code-block [code]="moduleImportCodeSample"></dgp-docs-code-block>

                <!-- TODO: Explain what happens now -->
                <!-- Actions get broadcasted -->
                <!-- You can see this in your browser-tab title -->
                <!-- The "oldest" instance is the leader -->
                <!-- Nothing else has happened; now you can react to that -->
                <!-- making everything readonly -->


            </dgp-docs-page-content>

        </dgp-docs-page>
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BroadcastingDocsPageComponent {

    readonly moduleImportCodeSample = `
import { DgpBroadcastStoreModule } from "dgp-ng-app";

// ...

@NgModule({
    imports: [
        DgpBroadcastStoreModule.forRoot(),
        // ...
    ]
})
export class AppModule {}
    `;

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

    updateUser(user: User, changes: Partial<User>) {
        this.store.dispatch(updateUser({
            user: {
                ...user, ...changes
            }
        }));
    }

    openPeon() {
        this.store.dispatch(openUrlAsPeon({
            url: "http://localhost:4200"
        }));
    }
}
