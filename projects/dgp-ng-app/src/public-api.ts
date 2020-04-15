/*
 * Public API Surface of dgp-ng-app
 */

// authentication
export * from "./authentication/actions";
export * from "./authentication/api-clients/authentication.api-client";
export * from "./authentication/guards/authentication.guard";
export * from "./authentication/models";
export * from "./authentication/selectors";
export * from "./authentication/services/authentication.service";
export * from "./authentication/services/initialization.service";
export * from "./authentication/authentication.module";

// broadcast
export * from "./broadcast/actions/broadcast-channel.actions";
export * from "./broadcast/guards/no-peon.guard";
export * from "./broadcast/functions/create-guid.function";
export * from "./broadcast/models/broadcast-role.model";
export * from "./broadcast/models/broadcast-channel.model";
export * from "./broadcast/models/broadcast-config.model";
export * from "./broadcast/models/broadcast-heartbeat.model";
export * from "./broadcast/models/broadcast-participant.model";
export * from "./broadcast/models/broadcast-role.model";
export * from "./broadcast/models/broadcast-role-display-config.model";
export * from "./broadcast/broadcast-store";
export * from "./broadcast/broadcast-store.module";

// empty-state
export * from "./empty-state/components/empty-state.component";
export * from "./empty-state/empty-state.module";

// file-upload
export * from "./file-viewer/models";
export * from "./file-viewer/functions";
export * from "./file-viewer/components/fallback-file-viewer.component";
export * from "./file-viewer/components/file-item-list.component";
export * from "./file-viewer/components/file-viewer.component-base";
export * from "./file-viewer/components/file-viewer.component";
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
export * from "./file-upload/file-upload.module";

// hamburger-shell
export * from "./hamburger-shell/actions/hamburger-shell.actions";
export * from "./hamburger-shell/components/hamburger-shell.component";
export * from "./hamburger-shell/components/hamburger-menu-toggle/hamburger-menu-toggle.component";
export * from "./hamburger-shell/components/hamburger-menu-toggle/hamburger-menu-toggle.module";
export * from "./hamburger-shell/components/list-details-page/list-details-page-content.component";
export * from "./hamburger-shell/components/list-details-page/list-details-page.component";
export * from "./hamburger-shell/components/list-details-page/list-details-page.module";
export * from "./hamburger-shell/components/page-header/page-header.component";
export * from "./hamburger-shell/components/page-header/page-header.module";
export * from "./hamburger-shell/models/hamburger-shell.store-feature";
export * from "./hamburger-shell/models/hamburger-shell-config.model";
export * from "./hamburger-shell/models/hamburger-shell-config-provider.model";
export * from "./hamburger-shell/models/hamburger-shell-state.model";
export * from "./hamburger-shell/selectors/hamburger-shell.selectors";
export * from "./hamburger-shell/hamburger-shell.module";

// hmr
export { hotReload } from "./hmr/hmr.actions";
export { hmrReducer } from "./hmr/hmr.reducer";
export { DgpNgApp } from "./hmr/hmr-app";

// log
export { addLogEntry, logError, LogErrorAction, logErrorActionType } from "./log/actions/log.actions";
export { LogEntry, Severity } from "./log/models/log.models";
export { LogState, logStoreFeature } from "./log/models/log.models";
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
export * from "./routing-overlay/actions";
export { DgpRoutingOverlayModule } from "./routing-overlay/routing-overlay.module";

// safe pipe
export * from "./safe/safe.pipe";
export * from "./safe/safe-pipe.module";

// spacer
export { SpacerComponent } from "./spacer/components/spacer.component";
export { DgpSpacerModule } from "./spacer/spacer.module";

// table-cell
export { DgpTableCellComponent } from "./table-cell-editor/components/table-cell.component";
export { DgpTableCelLEditorDirective } from "./table-cell-editor/directives/table-cell-editor.directive";
export { DgpTableCellModule } from "./table-cell-editor/table-cell.module";

// theme-switcher
export * from "./theme-switcher/actions/theme-switcher.actions";
export { DarkModeToggleComponent } from "./theme-switcher/components/dark-mode-toggle.component";
export { ThemeHostDirective } from "./theme-switcher/directives/theme-host.directive";
export { themeSwitcherStoreFeature } from "./theme-switcher/models/theme-switcher-store-feature.model";
export { ThemeSwitcherConfig } from "./theme-switcher/models/theme-switcher-config.model";
export { ThemeSwitcherState } from "./theme-switcher/models/theme-switcher-state.model";
export {
    themeSwitcherFeatureSelector, isDarkModeActiveSelector, isDarkModeActive
} from "./theme-switcher/selectors/theme-switcher.selectors";
export { DgpThemeSwitcherModule } from "./theme-switcher/theme-switcher.module";

// utils
export { DgpContainer } from "./utils/container.component-base";
export { DgpModelEditorComponentBase } from "./utils/model-editor.component-base";
export * from "./utils/select-entity-via-route.resolver-base";

// virtual-list panel
export { VirtualListItemDirective } from "./virtual-list-panel/directives/virtual-list-item.directive";
export { VirtualListPanelComponent } from "./virtual-list-panel/components/virtual-list-panel.component";
export { DgpVirtualListPanelModule } from "./virtual-list-panel/virtual-list-panel.module";

export * from "./dgp-ng-app.module";

