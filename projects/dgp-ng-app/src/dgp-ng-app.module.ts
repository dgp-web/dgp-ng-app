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
import { DgpHamburgerMenuModule } from "./hamburger-shell/components/hamburger-menu/hamburger-menu.module";
import { defaultThemeSwitcherConfig } from "./theme-switcher/models";

export interface DgpNgAppConfig<TAppState> {
    readonly appReducer: ActionReducerMap<TAppState>;
}

export const APP_REDUCER = new InjectionToken<ActionReducerMap<any>>("AppReducer");

@NgModule({
    imports: [

        BrowserModule,
        BrowserAnimationsModule,


        StoreModule.forRoot(APP_REDUCER, {
            metaReducers: [hmrReducer]
        }),
        EffectsModule.forRoot([]),

        DgpHamburgerShellModule.forRoot(),
        DgpThemeSwitcherModule.forRoot({
            ...defaultThemeSwitcherConfig,
            components: ["inspector"]
        }),
        DgpHamburgerMenuModule,
        DgpLogModule,
        DgpRequestStoreModule,
        DgpRoutingOverlayModule
    ],
    exports: [
        DgpHamburgerShellModule,
        DgpThemeSwitcherModule,
        DgpHamburgerMenuModule
    ]
})
export class DgpNgAppModule {

    static forRoot<TAppState>(config: DgpNgAppConfig<TAppState>): ModuleWithProviders<DgpNgAppModule> {

        return {
            ngModule: DgpNgAppModule,
            providers: [{
                provide: APP_REDUCER,
                useValue: config.appReducer
            }]
        };
    }

}
