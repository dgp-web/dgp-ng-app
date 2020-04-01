import { FactoryProvider, InjectionToken, NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { DgpEmptyStateModule } from "../empty-state/empty-state.module";
import { logStore } from "./reducers/log.reducer";
import { LogPageComponent } from "./components/log-page.component";
import { LogEntryListComponent } from "./components/log-entry-list.component";
import { LogEntryDetailsComponent } from "./components/log-entry-details.component";
import { logStoreFeature } from "./models/log.models";
import { LogEffects } from "./effects/log.effects";
import { DgpHamburgerMenuToggleModule } from "../hamburger-shell/components/hamburger-menu-toggle/hamburger-menu-toggle.module";
import { DgpListDetailsPageModule } from "../hamburger-shell/components/list-details-page/list-details-page.module";
import { DgpPageHeaderModule } from "../hamburger-shell/components/page-header/page-header.module";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSnackBarModule } from "@angular/material/snack-bar";

export const logStoreReducer = new InjectionToken<typeof logStore.reducers>("LogStoreReducer");

export function createLogStoreReducer() {
    return logStore.reducers;
}

export const logStoreReducerProvider: FactoryProvider = {
    provide: logStoreReducer,
    useFactory: createLogStoreReducer
};

@NgModule({
    imports: [
        CommonModule,
        FormsModule,

        StoreModule.forFeature(logStoreFeature, logStoreReducer),
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
        DgpEmptyStateModule
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
