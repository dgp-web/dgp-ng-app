import {InjectionToken, ModuleWithProviders, NgModule, ValueProvider} from "@angular/core";
import {StoreModule} from "@ngrx/store";
import {KeyValueStoreConfig, keyValueStoreFeature} from "./models";
import {createKVSReducer} from "./functions";

export const keyValueStoreReducer = new InjectionToken("KVSStoreReducer");

@NgModule({
    imports: [
        StoreModule.forFeature(
            keyValueStoreFeature,
            keyValueStoreReducer
        )
    ]
})
export class DgpKeyValueStoreModule {

    static forRoot(config: KeyValueStoreConfig): ModuleWithProviders {

        const _keyValueStoreReducer = createKVSReducer({
            initialState: config.initialState
        });

        const keyValueStoreReducerProviders = [{
            provide: keyValueStoreReducer,
            useValue: _keyValueStoreReducer
        } as ValueProvider];

        return {
            ngModule: DgpKeyValueStoreModule,
            providers: [keyValueStoreReducerProviders]
        };
    }

}
