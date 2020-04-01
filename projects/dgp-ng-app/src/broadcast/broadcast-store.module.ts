import { ModuleWithProviders, NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { broadcastReducer, broadcastReducerProvider, broadcastStoreFeature } from "./broadcast-store";
import { broadcastStoreProvider } from "./broadcast-store.decorator";
import { broadcastChannelServiceProvider } from "./services/broadcast-channel.service";
import { BroadcastEffects } from "./effects/broadcast.effects";
import { BROADCAST_CONFIG, BroadcastConfig, defaultBroadcastConfig } from "./models/broadcast-config.model";
import { NoPeonGuard } from "./guards/no-peon.guard";
import { EntityTypeMap } from "entity-store";

@NgModule({
    imports: [
        StoreModule.forFeature(broadcastStoreFeature, broadcastReducer),
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
