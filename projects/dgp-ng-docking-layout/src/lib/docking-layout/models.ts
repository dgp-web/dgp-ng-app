export interface DockingLayout {
    readonly dockingLayoutId: string;
    readonly isInitialised: boolean;
    readonly isFullPage: boolean;
    readonly resizeTimeOutId: string;
    readonly maximizedItemId: string;
    readonly creationTimeoutPassed: boolean;
    readonly dragSources: ReadonlyArray<any>;
    readonly updatingColumnsResponsive: boolean;
    readonly firstLoad: boolean;
    readonly width: number;
    readonly height: number;
    readonly rootItemId: string;
}

export interface DockingLayoutItem {
    readonly dockingLayoutItemId: string;
}

export interface DockingLayoutEntities {
    readonly dockingLayout: DockingLayout;
}

export type DockingLayoutStoreFeature = "DockingLayout";
export const dockingLayoutStoreFeature: DockingLayoutStoreFeature = "DockingLayout";

