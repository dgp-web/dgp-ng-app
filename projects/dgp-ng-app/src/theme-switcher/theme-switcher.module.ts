import { FactoryProvider, Inject, InjectionToken, ModuleWithProviders, NgModule, ValueProvider } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ActionReducer, Store, StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { OverlayModule } from "@angular/cdk/overlay";
import { ThemeSwitcherEffects } from "./effects";
import { themeSwitcherReducer } from "./reducers";
import { ThemeHostDirective } from "./directives/theme-host.directive";
import { DarkModeToggleComponent } from "./components/dark-mode-toggle.component";
import {
    defaultThemeSwitcherConfig,
    THEME_SWITCHER_CONFIG,
    ThemeSwitcherConfig,
    ThemeSwitcherState,
    themeSwitcherStoreFeature
} from "./models";
import { setIsDarkModeActive, updateCurrentInspectorConfig } from "./actions";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { notNullOrUndefined } from "../utils/null-checking.functions";
import { DgpCompactThemeHostDirective } from "./directives/compact-theme-host.directive";

export const THEME_SWITCHER_REDUCER = new InjectionToken<ActionReducer<ThemeSwitcherState>>("ThemeSwitcherReducer");

export function themeSwitcherReducerFactory() {
    return themeSwitcherReducer;
}

export const themeSwitcherReducerProvider: FactoryProvider = {
    provide: THEME_SWITCHER_REDUCER,
    useFactory: themeSwitcherReducerFactory
};

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        OverlayModule,

        MatSlideToggleModule,

        StoreModule.forFeature(themeSwitcherStoreFeature, THEME_SWITCHER_REDUCER),
        EffectsModule.forFeature([
            ThemeSwitcherEffects
        ])
    ],
    declarations: [
        DarkModeToggleComponent,
        ThemeHostDirective,
        DgpCompactThemeHostDirective
    ],
    exports: [
        DarkModeToggleComponent,
        ThemeHostDirective,
        DgpCompactThemeHostDirective
    ],
    providers: [
        themeSwitcherReducerProvider
    ]
})
export class DgpThemeSwitcherModule {

    static forRoot(config: Partial<ThemeSwitcherConfig> = defaultThemeSwitcherConfig): ModuleWithProviders<DgpThemeSwitcherModule> {

        config = {
            ...config,
            ...defaultThemeSwitcherConfig
        };

        return {
            ngModule: DgpThemeSwitcherModule,
            providers: [{
                provide: THEME_SWITCHER_CONFIG,
                useValue: config as ThemeSwitcherConfig
            } as ValueProvider]
        };
    }

    constructor(
        private readonly store: Store<ThemeSwitcherState>,
        @Inject(THEME_SWITCHER_CONFIG)
        private readonly themeSwitcherConfig: ThemeSwitcherConfig
    ) {
        const isDarkModeActiveJSON = localStorage.getItem("isDarkModeActive");
        if (notNullOrUndefined(isDarkModeActiveJSON)) {
            const isDarkModeActive = JSON.parse(isDarkModeActiveJSON);
            this.store.dispatch(setIsDarkModeActive({isDarkModeActive}));
        }

        if (themeSwitcherConfig.components.includes("inspector")) {
            const dgpInspectorConfigJSON = localStorage.getItem("dgpInspectorConfig");
            if (notNullOrUndefined(dgpInspectorConfigJSON)) {
                const inspectorConfig = JSON.parse(dgpInspectorConfigJSON);
                this.store.dispatch(updateCurrentInspectorConfig({inspectorConfig}));
            }
        }

    }


}
