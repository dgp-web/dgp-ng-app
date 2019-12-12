import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import * as mat from "@angular/material";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { DgpEmptyStateModule } from "../empty-state";
import { logStoreReducer, logStoreReducerProviders } from "./reducers/log.reducer";
import { LogPageComponent } from "./components/log-page.component";
import { LogEntryListComponent } from "./components/log-entry-list.component";
import { LogEntryDetailsComponent } from "./components/log-entry-details.component";
import { logStoreFeature } from "./models/log-state.model";
import { LogEffects } from "./effects/log.effects";
import { DgpHamburgerMenuToggleModule } from "../hamburger-shell/components/hamburger-menu-toggle/hamburger-menu-toggle.module";
import { DgpListDetailsPageModule } from "../hamburger-shell/components/list-details-page/list-details-page.module";
import { DgpPageHeaderModule } from "../hamburger-shell/components/page-header/page-header.module";

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

        mat.MatDividerModule,
        mat.MatIconModule,
        mat.MatListModule,
        mat.MatSnackBarModule,

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
        logStoreReducerProviders
    ]
})
export class DgpLogModule {
}
