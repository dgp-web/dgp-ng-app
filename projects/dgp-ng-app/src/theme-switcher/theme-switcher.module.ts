import { ModuleWithProviders, NgModule, ValueProvider } from "@angular/core";
import * as mat from "@angular/material";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Store, StoreModule } from "@ngrx/store";
import { themeSwitcherStoreFeature } from "./models/theme-switcher-store-feature.model";
import { EffectsModule } from "@ngrx/effects";
import { isNullOrUndefined } from "util";
import { OverlayModule } from "@angular/cdk/overlay";
import { ThemeSwitcherEffects } from "./effects/theme-switcher.effects";
import { themeSwitcherReducer, themeSwitcherReducerProviders } from "./reducers/theme-switcher.reducer";
import { ThemeHostDirective } from "./directives/theme-host.directive";
import { DarkModeToggleComponent } from "./components/dark-mode-toggle.component";
import {
    defaultThemeSwitcherConfig,
    THEME_SWITCHER_CONFIG,
    ThemeSwitcherConfig
} from "./models/theme-switcher-config.model";
import { ThemeSwitcherState } from "./models/theme-switcher-state.model";
import { SetIsDarkModeActiveAction } from "./actions/theme-switcher.actions";

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
        DarkModeToggleComponent,
        ThemeHostDirective
    ],
    exports: [
        DarkModeToggleComponent,
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
