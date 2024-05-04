/*
 * Public API Surface of dgp-ng-app
 */

// action context

export { FirstArg } from "./utils/first-arg.model";
import { negateMap } from "./utils/negate-map.function";

export { DgpActionContextModule } from "./action-context/action-context.module";
export { deselectActionContext } from "./action-context/actions/deselect-action-context.action";
export { selectActionContext } from "./action-context/actions/select-action-context.action";
export { actionContextStoreFeature } from "./action-context/constants/action-context-store-feature.constant";
export { emptyActionContext } from "./action-context/constants/empty-action-context.constant";
export { emptyActionContextState } from "./action-context/constants/empty-action-context-state.constant";
export { DgpActionContextDirective } from "./action-context/directives/action-context.directive";
export { ActionContextState } from "./action-context/models/action-context-state.model";
export { ActionContextStoreFeature } from "./action-context/models/action-context-store-feature.model";
export { actionContextReducer } from "./action-context/reducers/action-context.reducer";
export { actionContextFeatureSelector } from "./action-context/selectors/action-context-feature.selector";
export { isAnyActionContextSelected } from "./action-context/selectors/is-any-action-context-selected.selector";
export { isActionContextSelected } from "./action-context/selectors/is-action-context-selected.selector";
export { getSelectedActionContext } from "./action-context/selectors/get-selected-action-context.selector";
export { getSelectedActionContextKey } from "./action-context/selectors/get-selected-action-context-key.selector";
export { getSelectedActionContextLabel } from "./action-context/selectors/get-selected-action-context-label.selector";
export { getSelectedActionContextType } from "./action-context/selectors/get-selected-action-context-type.selector";
export { getSelectedActionContextValue } from "./action-context/selectors/get-selected-action-context-value.selector";

// authentication
export { authenticateUser } from "./authentication/actions";
export {
    AuthenticationApiClient, AuthenticationApiClientProvider
} from "./authentication/api-clients/authentication.api-client";
export { AuthenticationGuard } from "./authentication/guards/authentication.guard";
export { AuthenticationState, authenticationStoreFeature } from "./authentication/models";
export {
    getAuthenticatedUserSelector, getIsAuthenticatedSelector, getAuthenticatedUser, isAuthenticated, isInitialized
} from "./authentication/selectors";
export * from "./authentication/services/authentication.service";
export { authenticationReducer, initialAuthenticationState } from "./authentication/reducers";
export { InitializationService, InitializationServiceProvider } from "./authentication/services/initialization.service";
export { DgpAuthenticationModule, AuthenticationModuleSettings } from "./authentication/authentication.module";

// broadcast
export {
    setBroadcastChannelDataId, SetBroadcastChannelDataIdAction, SetOwnBroadcastRoleAction
} from "./broadcast/actions";
export { NoPeonGuard } from "./broadcast/guards/no-peon.guard";
export { createGuid } from "./broadcast/functions/create-guid.function";
export { BROADCAST_CONFIG } from "./broadcast/constants/broadcast-config-injection-token.constant";
export {
    defaultBroadcastRoleDisplayConfig
} from "./broadcast/constants/default-broadcast-role-display-config.constant";
export { defaultBroadcastConfig } from "./broadcast/constants/default-broadcast-config.model";
export { heartbeatBroadcastChannelId } from "./broadcast/constants/heartbeat-broadcast-channel-id.constant";
export { actionBroadcastChannelId } from "./broadcast/constants/action-broadcast-channel-id.constant";
export * from "./broadcast/models";
export {
    BroadcastState, broadcastStoreFeature, broadcastStoreFeatureSelector, getOwnBroadcastRoleSelector,
    broadcastReducer
} from "./broadcast/store";
export { DgpBroadcastStoreModule, BROADCAST_REDUCER, broadcastReducerProvider } from "./broadcast/broadcast-store.module";

// confirm-dialog
export {
    DgpConfirmDialogComponent, RemovalDialogButtonConfig, cancelButtonConfig, confirmButtonConfig
} from "./confirm-dialog/containers/confirm-dialog.component";
export { DgpConfirmDialogModule } from "./confirm-dialog/confirm-dialog.module";

// details
export * from "./details/models";
export { DgpDetailsComponent } from "./details/components/details.component";
export { DgpDetailsModule } from "./details/details.module";

// page-header-context-actions
export {
    DgpPageHeaderContextActionsComponent
} from "./context-action-slot/containers/page-header-context-actions.component";
export { DgpPageHeaderContextActionsModule } from "./context-action-slot/page-header-context-actions.module";

// empty-state
export { EmptyStateComponent } from "./empty-state/components/empty-state.component";
export { DgpEmptyStateModule } from "./empty-state/empty-state.module";

// expansion-toggle
export { DgpExpansionToggleComponent } from "./expansion-toggle/components/expansion-toggle.component";
export { DgpExpansionToggleModule } from "./expansion-toggle/expansion-toggle.module";

// file-upload
export * from "./file-viewer/models";
export * from "./file-viewer/functions";
export * from "./file-viewer/components/fallback-file-viewer.component";
export * from "./file-viewer/components/list/file-item-list.component";
export * from "./file-viewer/components/file-viewer.component-base";
export * from "./file-viewer/components/file-viewer.component";
export * from "./file-viewer/components/dynamic-file-viewer.component";
export * from "./file-viewer/components/jpg-viewer.component";
export * from "./file-viewer/components/pdf-viewer.component";
export * from "./file-viewer/components/png-viewer.component";
export * from "./file-viewer/components/svg-viewer.component";
export * from "./file-viewer/file-viewer.module";

// file-upload
export * from "./file-upload/actions";
export * from "./file-upload/directives/drag-file-listener.directive";
export * from "./file-upload/directives/open-file-manager-via-short-key.directive";
export * from "./file-upload/functions";
export * from "./file-upload/models";
export * from "./file-upload/selectors";
export { fileUploadEntityStore } from "./file-upload/store";
export { DgpFileUploadModule } from "./file-upload/file-upload.module";

// hamburger-shell
export * from "./hamburger-shell/actions";
export * from "./hamburger-shell/components/hamburger-shell.component";
export * from "./hamburger-shell/components/hamburger-menu-toggle/hamburger-menu-toggle.component";
export * from "./hamburger-shell/components/hamburger-menu-toggle/hamburger-menu-toggle.module";
export * from "./hamburger-shell/components/list-details-page/list-details-page-content.component";
export * from "./hamburger-shell/components/list-details-page/list-details-page.component";
export * from "./hamburger-shell/components/list-details-page/list-details-page.module";
export * from "./hamburger-shell/components/page-header/page-header.component";
export * from "./hamburger-shell/components/page-header/page-header.module";
export { DgpHamburgerMenuModule } from "./hamburger-shell/components/hamburger-menu/hamburger-menu.module";
export { HamburgerMenuComponent } from "./hamburger-shell/components/hamburger-menu/hamburger-menu.component";
export {
    HamburgerMenuHeaderComponent
} from "./hamburger-shell/components/hamburger-menu/hamburger-menu-header.component";
export {
    HamburgerMenuEntriesComponent
} from "./hamburger-shell/components/hamburger-menu/hamburger-menu-entries.component";
export {
    HamburgerMenuEntryComponent
} from "./hamburger-shell/components/hamburger-menu/hamburger-menu-entry.component";
export * from "./hamburger-shell/models";
export {
    hamburgerMenuModeSelector,
    hamburgerShellFeatureSelector,
    isHamburgerMenuOpenSelector,
    isPageMenuOpenSelector,
    pageMenuModeSelector
} from "./hamburger-shell/selectors";
export { DgpHamburgerShellModule } from "./hamburger-shell/hamburger-shell.module";

// hmr
export { hotReload } from "./hmr/hmr.actions";
export { hmrReducer } from "./hmr/hmr.reducer";
export { DgpNgApp } from "./hmr/hmr-app";

// input
export { DgpInputErrorInfoComponent } from "./input/components/input-error-info.component";
export { DgpInputFieldComponent } from "./input/components/input-field.component";
export { DgpInputHintComponent } from "./input/components/input-hint.component";
export { DgpInputLengthInfoComponent } from "./input/components/input-length-info.component";
export { DgpInputMetadataDirective } from "./input/directives/input-metadata.directive";
export { DgpInputFieldModule } from "./input/input-field.module";

// inspector
export * from "./inspector/models";
export * from "./inspector/constants";
export * from "./inspector/functions";
export { InspectorComponent } from "./inspector/components/inspector.component";
export { InspectorItemComponent } from "./inspector/components/inspector-item.component";
export { InspectorSectionComponent } from "./inspector/components/inspector-section.component";
export { InspectorService } from "./inspector/services/inspector.service";
export { DgpInspectorModule } from "./inspector/inspector.module";

// inspector-config
export { DgpInspectorConfigFormComponent } from "./inspector-config/components/inspector-config-form.component";
export { DgpInspectorConfigComponent } from "./inspector-config/containers/inspector-config.component";
export { DgpInspectorConfigModule } from "./inspector-config/inspector-config.module";
 
// lazy-rendered
export { DgpLazyRenderedModule } from "./lazy-rendered/lazy-rendered.module";
export { DgpLazyRenderedComponent } from "./lazy-rendered/components/lazy-rendered.component";

// log
export { addLogEntry, logError, LogErrorAction, logErrorActionType } from "./log/actions";
export { LogEntry, Severity } from "./log/models";
export { LogState, logStoreFeature } from "./log/models";
export { DgpLogModule } from "./log/log.module";

// negate
export { DgpNegatePipe } from "./negate/negate.pipe";
export { DgpNegatePipeModule } from "./negate/negate-pipe.module";

// request-store
export { requestStoreFeature } from "./request-store/models";
export { RequestState } from "./request-store/models";
export {
    ScheduleRequestAction, scheduleRequest, scheduleRequestActionType
} from "./request-store/actions";
export {
    hasPendingRequestsSelector, hasPendingRequests, requestStateSelector
} from "./request-store/selectors";
export { DgpRequestStoreModule } from "./request-store/request-store.module";

// resize-sensor
export { DgpResizeSensorDirective } from "./resize-sensor/directives/resize-sensor.directive";
export { DgpResizeSensorModule } from "./resize-sensor/resize-sensor.module";

// routing-overlay
export { showLoadingSpinner } from "./routing-overlay/actions";
export { DgpRoutingOverlayModule } from "./routing-overlay/routing-overlay.module";

// safe pipe
export { SafePipe } from "./safe/safe.pipe";
export { SafePipeModule } from "./safe/safe-pipe.module";

// shortcuts
export * from "./shortcuts/models";
export { DgpActionShortcutDirective } from "./shortcuts/directives/action-shortcut.directive";
export { DgpShortcutModule } from "./shortcuts/shortcuts.module";

// spacer
export { SpacerComponent } from "./spacer/components/spacer.component";
export { DgpSpacerModule } from "./spacer/spacer.module";

// table-cell
export { DgpTableCellComponent } from "./table-cell-editor/components/table-cell.component";
export { DgpTableCelLEditorDirective } from "./table-cell-editor/directives/table-cell-editor.directive";
export { DgpCloseTableCellEditorDirective } from "./table-cell-editor/directives/close-table-cell-editor.directive";
export { DgpTableCellEditorService } from "./table-cell-editor/service/table-cell-editor.service";
export { DgpTableCellModule } from "./table-cell-editor/table-cell.module";

// theme-switcher
export { setIsDarkModeActive, toggleDarkMode, toggleCompactTheme } from "./theme-switcher/actions";
export { CompactThemeToggleComponent } from "./theme-switcher/components/compact-theme-toggle.component";
export { DarkModeToggleComponent } from "./theme-switcher/components/dark-mode-toggle.component";
export { DgpCompactThemeHostDirective } from "./theme-switcher/directives/compact-theme-host.directive";
export { ThemeHostDirective } from "./theme-switcher/directives/theme-host.directive";
export { ThemeSwitcherConfig, ThemeSwitcherState, themeSwitcherStoreFeature } from "./theme-switcher/models";
export {
    themeSwitcherFeatureSelector, isDarkModeActiveSelector, isDarkModeActive,
    isCompactThemeActive,
} from "./theme-switcher/selectors";
export { DgpThemeSwitcherModule } from "./theme-switcher/theme-switcher.module";

// tile
export { TileComponent } from "./tile/tile.component";
export { DgpTileModule } from "./tile/tile.module";

// utils
export { AppFeature } from "./utils/app-feature.model";
export { createOnChangeEffect$ } from "./utils/create-on-change-effect$.function";
export { defaultRuntimeChecks } from "./utils/default-runtime-checks";
export { distinctUntilHashChanged } from "./utils/distinct-until-hash-changed.function";
export { DgpDisabledBase } from "./utils/dgp-disabled-base.directive";
export { DgpEffectsBase } from "./utils/effects-base";
export { filterEmpty } from "./utils/filter-empty.function";
export { filterNotNullOrUndefined } from "./utils/filter-not-null-or-undefined.function";
export { flattenMatrix } from "./utils/flatten-matrix.function";
export { getHashCode } from "./utils/get-hash-code.function";
export { negate } from "./utils/negate.function";
export { negateMap } from "./utils/negate-map.function";
export { DgpContainer } from "./utils/container.component-base";
export { DgpHybridComponentBase, HybridComponentBase } from "./utils/hybrid.component-base";
export { DgpModelEditorComponentBase } from "./utils/model-editor.component-base";
export * from "./utils/observe-input";
export {
    DgpSelectEntityViaRouteResolver, SelectEntityViaRouteResolverConfig
} from "./utils/select-entity-via-route.resolver-base";
export { nullOrUndefined, isNullOrUndefined, notNullOrUndefined } from "./utils/null-checking.functions";
export { Point } from "./utils/point.model";
export { resolveOverridableValue } from "./utils/resolve-overridable-value.function";
export { DgpResolverBase } from "./utils/resolver-base";
export { parseStringMatrixAsNumberMatrix } from "./utils/parse-string-matrix-as-number-matrix.function";
export { Magnitude } from "./utils/magnitude.model";
export { HttpSSEApiClient } from "./utils/http-sse.api-client";
export { firstAsPromise } from "./utils/first-as-promise";
export { there } from "./utils/there.function";
export { DgpViewComponentBase } from "./utils/view.component-base";
export { DgpView } from "./utils/view";
export { getDefaultValue } from "./utils/get-default-value.function";
export { byUnique } from "./utils/by-unique.function";
export { matrixToMany } from "./utils/matrix-to-many.constant";
export { ofNull } from "./utils/of-null.function";
export { withoutDispatch } from "./utils/without-dispatch.constant";
export { waitForStableDOM$ } from "./utils/wait-for-stable-DOM$.function";

// virtual-list panel
export { VirtualListItemDirective } from "./virtual-list-panel/directives/virtual-list-item.directive";
export { VirtualListPanelComponent } from "./virtual-list-panel/components/virtual-list-panel.component";
export { DgpVirtualListPanelModule } from "./virtual-list-panel/virtual-list-panel.module";

export * from "./dgp-ng-app.module";
export { Size } from "./resize-sensor/models/size.model";
export { ResizeSensor, defaultResizeSensorConfig, ResizeSensorConfig } from "./resize-sensor/services/resize-sensor.service";
export { selectFileItem } from "./file-viewer/select-file-item.action";

