import { InjectionToken, ModuleWithProviders, NgModule } from "@angular/core";
import { ActionReducerMap, StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { DgpHamburgerShellModule } from "./hamburger-shell/hamburger-shell.module";
import { DgpRequestStoreModule } from "./request-store/request-store.module";
import { DgpRoutingOverlayModule } from "./routing-overlay/routing-overlay.module";
import { DgpThemeSwitcherModule } from "./theme-switcher/theme-switcher.module";
import { hmrReducer } from "./hmr/hmr.reducer";
import { DgpLogModule } from "./log/log.module";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

export interface DgpNgAppConfig<TAppState> {
    readonly appReducer: ActionReducerMap<TAppState>;
}

export const appReducer = new InjectionToken<ActionReducerMap<any>>("AppReducer");

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,

        StoreModule.forRoot(appReducer, {
            metaReducers: [ hmrReducer ]
        }),
        EffectsModule.forRoot([]),
        DgpHamburgerShellModule.forRoot(),
        DgpThemeSwitcherModule.forRoot(),
        DgpLogModule,
        DgpRequestStoreModule,
        DgpRoutingOverlayModule
    ],
    exports: [
        DgpHamburgerShellModule,
        DgpThemeSwitcherModule
    ]
})
export class DgpNgAppModule {

    static forRoot<TAppState>(createAppConfig: () => DgpNgAppConfig<TAppState>): ModuleWithProviders {

        const config = createAppConfig();

        return {
            ngModule: DgpNgAppModule,
            providers: [{
                provide: appReducer, useFactory: () => config.appReducer
            }]
        };
    }

}
