import { ModuleWithProviders, NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { LayoutModule } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import * as mat from "@angular/material";
import { hamburgerShellReducer, hamburgerShellReducerProviders } from "./reducers/hamburger-shell.reducer";
import {
    defaultHamburgerShellConfigProvider,
    HamburgerShellConfigProvider
} from "./models/hamburger-shell-config-provider.model";
import { hamburgerShellStoreFeature } from "./models/hamburger-shell.store-feature";
import { HamburgerShellComponent } from "./components/hamburger-shell.component";
import { HamburgerShellEffects } from "./effects/hamburger-shell.effects";

@NgModule({
    imports: [
        LayoutModule,
        CommonModule,
        FormsModule,
        mat.MatButtonModule,
        mat.MatIconModule,
        mat.MatProgressBarModule,
        mat.MatSidenavModule,
        StoreModule.forFeature(
            hamburgerShellStoreFeature,
            hamburgerShellReducer
        ),
        EffectsModule.forFeature([
            HamburgerShellEffects
        ])
    ],
    providers: [
        hamburgerShellReducerProviders
    ],
    declarations: [
        HamburgerShellComponent
    ],
    exports: [
        HamburgerShellComponent
    ]
})
export class DgpHamburgerShellModule {

    static forRoot(
        configProvider: HamburgerShellConfigProvider = defaultHamburgerShellConfigProvider
    ): ModuleWithProviders {
        return {
            ngModule: DgpHamburgerShellModule,
            providers: [
                configProvider
            ]
        };
    }

}
