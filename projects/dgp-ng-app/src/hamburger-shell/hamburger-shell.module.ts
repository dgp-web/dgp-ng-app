import { ModuleWithProviders, NgModule, InjectionToken, FactoryProvider } from "@angular/core";
import { StoreModule, ActionReducer } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { LayoutModule } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { defaultHamburgerShellConfigProvider, HamburgerShellConfigProvider, HamburgerShellState } from "./models";
import { hamburgerShellStoreFeature } from "./models";
import { HamburgerShellComponent } from "./components/hamburger-shell.component";
import { HamburgerShellEffects } from "./effects";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { hamburgerShellReducer } from "./reducers";

export const HAMBURGER_SHELL_REDUCER = new InjectionToken<ActionReducer<HamburgerShellState>>("hamburgerShellReducer");

export function hamburgerShellReducerFactory() {
    return hamburgerShellReducer;
}

export const hamburgerShellReducerProvider: FactoryProvider = {
    provide: HAMBURGER_SHELL_REDUCER,
    useFactory: hamburgerShellReducerFactory
};


@NgModule({
    imports: [
        LayoutModule,
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatProgressBarModule,
        MatSidenavModule,
        StoreModule.forFeature(
            hamburgerShellStoreFeature,
            HAMBURGER_SHELL_REDUCER
        ),
        EffectsModule.forFeature([
            HamburgerShellEffects
        ]),
        RouterModule
    ],
    providers: [
        hamburgerShellReducerProvider
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
    ): ModuleWithProviders<DgpHamburgerShellModule> {
        return {
            ngModule: DgpHamburgerShellModule,
            providers: [
                configProvider
            ]
        };
    }

}
