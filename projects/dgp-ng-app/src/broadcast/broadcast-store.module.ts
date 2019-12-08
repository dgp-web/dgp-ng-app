import {ModuleWithProviders, NgModule} from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { MatSnackBarModule } from "@angular/material";
import {broadcastReducer, broadcastReducerProviders, broadcastStoreFeature} from "./broadcast-store";
import * as effects from "./effects";
import * as guards from "./guards";
import * as services from "./services";
import {
    BROADCAST_CONFIG, BroadcastConfig,
    defaultBroadcastConfig
} from "./models";
import {broadcastStoreProvider} from "./broadcast-store.decorator";

@NgModule({
    imports: [
        StoreModule.forFeature(broadcastStoreFeature, broadcastReducer),
        EffectsModule.forFeature([
            effects.BroadcastEffects
        ]),
        MatSnackBarModule
    ],
    providers: [
        services.broadcastChannelServiceProvider,
        {
            provide: BROADCAST_CONFIG,
            useValue: defaultBroadcastConfig
        },
        guards.NoPeonGuard,
        broadcastReducerProviders,
        broadcastStoreProvider
    ]
})
export class DgpBroadcastStoreModule {

    static forRoot(config: BroadcastConfig = defaultBroadcastConfig): ModuleWithProviders {
        return {
          ngModule: DgpBroadcastStoreModule,
          providers: [{
              provide: BROADCAST_CONFIG,
              useValue: config as BroadcastConfig
          }]
        };
    }

}
