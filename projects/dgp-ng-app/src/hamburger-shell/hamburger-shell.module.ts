import { ModuleWithProviders, NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { hamburgerShellStoreFeature } from "./models";
import { hamburgerShellReducer, hamburgerShellReducerProviders } from "./reducers";
import { EffectsModule } from "@ngrx/effects";
import * as effects from "./effects";
import { defaultHamburgerShellConfigProvider, HamburgerShellConfigProvider } from "./models";
import { LayoutModule } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import * as mat from "@angular/material";
import * as components from "./components";

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
            effects.HamburgerShellEffects
        ])
    ],
    providers: [
        hamburgerShellReducerProviders
    ],
    declarations: [
        components.HamburgerShellComponent
    ],
    exports: [
        components.HamburgerShellComponent
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
