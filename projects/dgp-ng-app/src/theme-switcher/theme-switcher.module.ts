import { ModuleWithProviders, NgModule, ValueProvider } from "@angular/core";
import * as mat from "@angular/material";
import * as components from "./components";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { defaultThemeSwitcherConfig, THEME_SWITCHER_CONFIG, ThemeSwitcherConfig, ThemeSwitcherState } from "./models";
import { Store, StoreModule } from "@ngrx/store";
import { themeSwitcherStoreFeature } from "./models/theme-switcher-store-feature.model";
import { themeSwitcherReducer, themeSwitcherReducerProviders } from "./reducers";
import { EffectsModule } from "@ngrx/effects";
import { ThemeSwitcherEffects } from "./effects";
import { isNullOrUndefined } from "util";
import { SetIsDarkModeActiveAction } from "./actions";
import { ThemeHostDirective } from "./directives";
import { OverlayModule } from "@angular/cdk/overlay";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        OverlayModule,

        mat.MatSlideToggleModule,

        StoreModule.forFeature(themeSwitcherStoreFeature, themeSwitcherReducer),
        EffectsModule.forFeature([
            ThemeSwitcherEffects
        ])
    ],
    declarations: [
        components.DarkModeToggleComponent,
        ThemeHostDirective
    ],
    exports: [
        components.DarkModeToggleComponent,
        ThemeHostDirective
    ],
    providers: [
        themeSwitcherReducerProviders
    ]
})
export class DgpThemeSwitcherModule {

    static forRoot(config: ThemeSwitcherConfig = defaultThemeSwitcherConfig): ModuleWithProviders {

        return {
            ngModule: DgpThemeSwitcherModule,
            providers: [{
                provide: THEME_SWITCHER_CONFIG,
                useValue: config as ThemeSwitcherConfig
            } as ValueProvider]
        };
    }

    constructor(
        private readonly store: Store<ThemeSwitcherState>
    ) {
        const isDarkModeActiveJSON = localStorage.getItem("isDarkModeActive");
        if (!isNullOrUndefined(isDarkModeActiveJSON)) {
            const isDarkModeActive = JSON.parse(isDarkModeActiveJSON);
            this.store.dispatch(
                new SetIsDarkModeActiveAction(isDarkModeActive)
            );
        }
    }


}
