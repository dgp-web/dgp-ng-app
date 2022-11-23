import { FactoryProvider, InjectionToken, NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { DgpEmptyStateModule } from "../empty-state/empty-state.module";
import { logStore } from "./reducers";
import { LogPageComponent } from "./components/log-page.component";
import { LogEntryListComponent } from "./components/log-entry-list.component";
import { LogEntryDetailsComponent } from "./components/log-entry-details.component";
import { logStoreFeature } from "./models";
import { LogEffects } from "./effects";
import { DgpHamburgerMenuToggleModule } from "../hamburger-shell/components/hamburger-menu-toggle/hamburger-menu-toggle.module";
import { DgpListDetailsPageModule } from "../hamburger-shell/components/list-details-page/list-details-page.module";
import { DgpPageHeaderModule } from "../hamburger-shell/components/page-header/page-header.module";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacyListModule as MatListModule } from "@angular/material/legacy-list";
import { MatLegacySnackBarModule as MatSnackBarModule } from "@angular/material/legacy-snack-bar";
import { SafePipeModule } from "../safe/safe-pipe.module";

export const LOG_STORE_REDUCER = new InjectionToken<typeof logStore.reducers>("LogStoreReducer");

export function createLogStoreReducer() {
    return logStore.reducers;
}

export const logStoreReducerProvider: FactoryProvider = {
    provide: LOG_STORE_REDUCER,
    useFactory: createLogStoreReducer
};

@NgModule({
    imports: [
        CommonModule,
        FormsModule,

        StoreModule.forFeature(logStoreFeature, LOG_STORE_REDUCER),
        EffectsModule.forFeature([
            LogEffects
        ]),

        RouterModule.forChild([{
            path: "logEntries",
            component: LogPageComponent,
        }, {
            path: "logEntries/:logEntryId",
            component: LogPageComponent,
        }]),

        MatDividerModule,
        MatIconModule,
        MatListModule,
        MatSnackBarModule,

        DgpHamburgerMenuToggleModule,
        DgpPageHeaderModule,
        DgpListDetailsPageModule,
        DgpEmptyStateModule,
        SafePipeModule
    ],
    declarations: [
        LogEntryDetailsComponent,
        LogEntryListComponent,
        LogPageComponent
    ],
    providers: [
        logStoreReducerProvider
    ]
})
export class DgpLogModule {
}
