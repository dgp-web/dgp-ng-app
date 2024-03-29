import {ApplicationRef, NgModule} from "@angular/core";
import {Store} from "@ngrx/store";
import {InspectorDocsModule} from "../features/core/inspector-docs/inspector-docs.module";
import {AppComponent} from "./app.component";
import {UiSharedModule} from "../ui/shared";
import {ApiClientModule, ApiClientSettings, ApiClientSettingsProvider} from "../api-client";
import {AppEntities, appEntityStore, AppState} from "../store";
import {RouterModule} from "@angular/router";
import * as features from "../features";
import {ThemeSwitcherDocsModule} from "../features";
import {
    authenticateUser,
    authenticationStoreFeature,
    defaultBroadcastConfig,
    DgpAuthenticationModule,
    DgpBroadcastStoreModule, DgpInspectorModule,
    DgpNgApp,
    DgpNgAppModule,
    setBroadcastChannelDataId
} from "dgp-ng-app";
import {FileUploadDocsModule} from "../features/core/file-upload-docs/file-upload-docs.module";
import {CommonModule} from "@angular/common";
import {authenticationApiClientProvider, initializationServiceProvider} from "./services";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {FileViewerDocsModule} from "../features/core/file-viewer-docs/file-viewer-docs.module";
import {DockingLayoutDocsModule} from "../features/docking-layout/docking-layout-docs.module";
import {ChartDocsModule} from "../features/charts/chart-docs.module";
import {DragAndDropDocsModule} from "../features/drag-and-drop/drag-and-drop.module";
import {DocsDocsModule} from "../features/docs/docs-docs.module";

@NgModule({
    imports: [
        DgpNgAppModule.forRoot<AppState>({
            appReducer: appEntityStore.reducers
        }),

        DgpBroadcastStoreModule.forRoot<AppEntities>({
            ...defaultBroadcastConfig,
            actionTypesToPrefixWithPeon: [
                "[DocsApp]"
            ],
            sendInitialState: [state => appEntityStore.actions.composeEntityActions({
                set: {
                    user: state.user.entities
                }
            }),
                state => authenticateUser({user: state[authenticationStoreFeature].user})]
        }),

        StoreDevtoolsModule.instrument(),

        DgpAuthenticationModule.forRoot({
            authenticationApiClientProvider,
            initializationServiceProvider
        }),

        RouterModule.forRoot([{
            path: "",
            pathMatch: "full",
            redirectTo: "/home"
        }, {
            path: "**",
            redirectTo: "/home"
        }], {relativeLinkResolution: "legacy"}),

        UiSharedModule,

        ApiClientModule.forRoot({
            provide: ApiClientSettings,
            useValue: {}
        } as ApiClientSettingsProvider),

        features.HomeModule,
        features.AuthenticationDocsModule,
        features.BroadcastingDocsModule,
        features.EmptyStateDocsModule,
        FileUploadDocsModule,
        features.HamburgerShellDocsModule,
        InspectorDocsModule,
        features.ListDetailsPageDocsModule,
        features.LogDocsModule,
        features.RequestStoreDocsModule,
        features.RoutingOverlayDocsModule,
        features.SpacerDocsModule,
        features.StylingDocsModule,
        features.TableCellEditorDocsModule,
        ThemeSwitcherDocsModule,
        CommonModule,
        FileViewerDocsModule,
        ChartDocsModule,
        DragAndDropDocsModule,
        DockingLayoutDocsModule,
        DocsDocsModule,
        DgpInspectorModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule extends DgpNgApp {

    constructor(public readonly appRef: ApplicationRef,
                protected readonly ngrxStore: Store<AppState>) {
        super(appRef, ngrxStore);

        this.ngrxStore.dispatch(setBroadcastChannelDataId({payload: "DgpNgApp"}));
    }

}
