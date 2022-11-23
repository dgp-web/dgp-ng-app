import { FactoryProvider, InjectionToken, ModuleWithProviders, NgModule } from "@angular/core";
import { ActionReducerMap, StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { MatLegacySnackBarModule as MatSnackBarModule } from "@angular/material/legacy-snack-bar";
import { broadcastReducer, BroadcastState, broadcastStoreFeature } from "./store";
import { broadcastStoreProvider } from "./broadcast-store.decorator";
import { broadcastChannelServiceProvider } from "./services/broadcast-channel.service";
import { BroadcastEffects } from "./effects";
import { NoPeonGuard } from "./guards/no-peon.guard";
import { EntityTypeMap } from "entity-store";
import { BroadcastConfig } from "./models";
import { BROADCAST_CONFIG } from "./constants/broadcast-config-injection-token.constant";
import { defaultBroadcastConfig } from "./constants/default-broadcast-config.model";

export const BROADCAST_REDUCER = new InjectionToken<ActionReducerMap<BroadcastState>>("BroadcastStoreReducer");

export function broadcastReducerFactory() {
    return broadcastReducer;
}

export const broadcastReducerProvider: FactoryProvider = {
    provide: BROADCAST_REDUCER,
    useFactory: broadcastReducerFactory
};

@NgModule({
    imports: [
        StoreModule.forFeature(broadcastStoreFeature, BROADCAST_REDUCER),
        EffectsModule.forFeature([
            BroadcastEffects
        ]),
        MatSnackBarModule
    ],
    providers: [
        broadcastChannelServiceProvider,
        {
            provide: BROADCAST_CONFIG,
            useValue: defaultBroadcastConfig
        },
        NoPeonGuard,
        broadcastReducerProvider
    ]
})
export class DgpBroadcastStoreModule {

    static forRoot<TEntityTypeMap extends EntityTypeMap = { [key: string]: any; }, TStoreFeature = string>(
        config: BroadcastConfig<TEntityTypeMap, TStoreFeature> = defaultBroadcastConfig as any
    ): ModuleWithProviders<DgpBroadcastStoreModule> {
        return {
            ngModule: DgpBroadcastStoreModule,
            providers: [{
                provide: BROADCAST_CONFIG,
                useValue: config
            }, broadcastStoreProvider]
        };
    }

}
