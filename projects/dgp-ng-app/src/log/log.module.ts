import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import * as effects from "./effects";
import * as components from "./components";
import { StoreModule } from "@ngrx/store";
import * as mat from "@angular/material";
import { logStoreFeature } from "./models";
import { logStoreReducer, logStoreReducerProviders } from "./reducers";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { DgpListDetailsPageModule } from "../hamburger-shell/components/list-details-page";
import { DgpPageHeaderModule } from "../hamburger-shell/components/page-header";
import { DgpHamburgerMenuToggleModule } from "../hamburger-shell/components/hamburger-menu-toggle";
import { DgpEmptyStateModule } from "../empty-state";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,

        StoreModule.forFeature(logStoreFeature, logStoreReducer),
        EffectsModule.forFeature([
            effects.LogEffects
        ]),

        RouterModule.forChild([{
            path: "logEntries",
            component: components.LogPageComponent,
        }, {
            path: "logEntries/:logEntryId",
            component: components.LogPageComponent,
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
        components.LogEntryDetailsComponent,
        components.LogEntryListComponent,
        components.LogPageComponent
    ],
    providers: [
        logStoreReducerProviders
    ]
})
export class DgpLogModule {
}
