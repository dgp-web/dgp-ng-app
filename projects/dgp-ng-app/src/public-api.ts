/*
 * Public API Surface of dgp-ng-app
 */

// authentication
export { authenticateUser } from "./authentication/actions";
export { AuthenticationApiClient, AuthenticationApiClientProvider } from "./authentication/api-clients/authentication.api-client";
export { AuthenticationGuard } from "./authentication/guards/authentication.guard";
export { AuthenticationState, authenticationStoreFeature } from "./authentication/models";
export { getAuthenticatedUserSelector, getIsAuthenticatedSelector } from "./authentication/selectors";
export * from "./authentication/services/authentication.service";
export { InitializationService, InitializationServiceProvider } from "./authentication/services/initialization.service";
export { DgpAuthenticationModule, AuthenticationModuleSettings } from "./authentication/authentication.module";

// broadcast
export { setBroadcastChannelDataId, SetBroadcastChannelDataIdAction, SetOwnBroadcastRoleAction } from "./broadcast/actions";
export { NoPeonGuard } from "./broadcast/guards/no-peon.guard";
export { createGuid } from "./broadcast/functions/create-guid.function";
export * from "./broadcast/models";
export { BroadcastState, broadcastStoreFeature, broadcastStoreFeatureSelector, getOwnBroadcastRoleSelector } from "./broadcast/store";
export { DgpBroadcastStoreModule } from "./broadcast/broadcast-store.module";

// empty-state
export { EmptyStateComponent } from "./empty-state/components/empty-state.component";
export { DgpEmptyStateModule } from "./empty-state/empty-state.module";

// file-upload
export * from "./file-viewer/models";
export * from "./file-viewer/functions";
export * from "./file-viewer/components/fallback-file-viewer.component";
export * from "./file-viewer/components/file-item-list.component";
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
export * from "./file-upload/directive/drag-file-listener.directive";
export * from "./file-upload/directive/open-file-manager-via-short-key.directive";
export * from "./file-upload/functions";
export * from "./file-upload/models";
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
export { HamburgerMenuHeaderComponent } from "./hamburger-shell/components/hamburger-menu/hamburger-menu-header.component";
export { HamburgerMenuEntriesComponent } from "./hamburger-shell/components/hamburger-menu/hamburger-menu-entries.component";
export { HamburgerMenuEntryComponent } from "./hamburger-shell/components/hamburger-menu/hamburger-menu-entry.component";
export * from "./hamburger-shell/models";
export {
    hamburgerMenuModeSelector, hamburgerShellFeatureSelector, isHamburgerMenuOpenSelector, isPageMenuOpenSelector, pageMenuModeSelector
} from "./hamburger-shell/selectors";
export { DgpHamburgerShellModule } from "./hamburger-shell/hamburger-shell.module";

// hmr
export { hotReload } from "./hmr/hmr.actions";
export { hmrReducer } from "./hmr/hmr.reducer";
export { DgpNgApp } from "./hmr/hmr-app";

// log
export { addLogEntry, logError, LogErrorAction, logErrorActionType } from "./log/actions";
export { LogEntry, Severity } from "./log/models";
export { LogState, logStoreFeature } from "./log/models";
export { DgpLogModule } from "./log/log.module";

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

// routing-overlay
export { showLoadingSpinner } from "./routing-overlay/actions";
export { DgpRoutingOverlayModule } from "./routing-overlay/routing-overlay.module";

// safe pipe
export { SafePipe } from "./safe/safe.pipe";
export { SafePipeModule } from "./safe/safe-pipe.module";

// spacer
export { SpacerComponent } from "./spacer/components/spacer.component";
export { DgpSpacerModule } from "./spacer/spacer.module";

// table-cell
export { DgpTableCellComponent } from "./table-cell-editor/components/table-cell.component";
export { DgpTableCelLEditorDirective } from "./table-cell-editor/directives/table-cell-editor.directive";
export { DgpTableCellModule } from "./table-cell-editor/table-cell.module";

// theme-switcher
export { setIsDarkModeActive, toggleDarkMode } from "./theme-switcher/actions";
export { DarkModeToggleComponent } from "./theme-switcher/components/dark-mode-toggle.component";
export { ThemeHostDirective } from "./theme-switcher/directives/theme-host.directive";
export { ThemeSwitcherConfig, ThemeSwitcherState, themeSwitcherStoreFeature } from "./theme-switcher/models";
export {
    themeSwitcherFeatureSelector, isDarkModeActiveSelector, isDarkModeActive
} from "./theme-switcher/selectors";
export { DgpThemeSwitcherModule } from "./theme-switcher/theme-switcher.module";

// tile
export { TileComponent } from "./tile/tile.component";
export { DgpTileModule } from "./tile/tile.module";

// utils
export { DgpContainer } from "./utils/container.component-base";
export { HybridComponentBase } from "./utils/hybrid.component-base";
export { DgpModelEditorComponentBase } from "./utils/model-editor.component-base";
export { DgpSelectEntityViaRouteResolver, SelectEntityViaRouteResolverConfig } from "./utils/select-entity-via-route.resolver-base";

// virtual-list panel
export { VirtualListItemDirective } from "./virtual-list-panel/directives/virtual-list-item.directive";
export { VirtualListPanelComponent } from "./virtual-list-panel/components/virtual-list-panel.component";
export { DgpVirtualListPanelModule } from "./virtual-list-panel/virtual-list-panel.module";

export * from "./dgp-ng-app.module";

