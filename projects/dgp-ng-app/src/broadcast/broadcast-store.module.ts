import { ModuleWithProviders, NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { MatSnackBarModule } from "@angular/material";
import { broadcastReducer, broadcastReducerProvider, broadcastStoreFeature } from "./broadcast-store";
import { broadcastStoreProvider } from "./broadcast-store.decorator";
import { broadcastChannelServiceProvider } from "./services/broadcast-channel.service";
import { BroadcastEffects } from "./effects/broadcast.effects";
import { BROADCAST_CONFIG, BroadcastConfig, defaultBroadcastConfig } from "./models/broadcast-config.model";
import { NoPeonGuard } from "./guards/no-peon.guard";

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

    static forRoot(config: BroadcastConfig = defaultBroadcastConfig): ModuleWithProviders {
        return {
            ngModule: DgpBroadcastStoreModule,
            providers: [{
                provide: BROADCAST_CONFIG,
                useValue: config as BroadcastConfig
            }, broadcastStoreProvider]
        };
    }

}
