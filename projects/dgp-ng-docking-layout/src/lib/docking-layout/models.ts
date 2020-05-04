import { EntityStateMap } from "entity-store";
import { LayoutConfiguration } from "../custom-goldenlayout/types";

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

export interface DockingLayoutConfig extends LayoutConfiguration {
    readonly dockingLayoutConfigId: string;
}

export interface DockingLayoutItem {
    readonly dockingLayoutItemId: string;
}

export interface DockingLayoutEntities {
    readonly dockingLayout: DockingLayout;
    readonly dockingLayoutConfig: DockingLayoutConfig;
}

export interface DockingLayoutState extends EntityStateMap<DockingLayoutEntities> {
}

export type DockingLayoutStoreFeature = "DockingLayout";
export const dockingLayoutStoreFeature: DockingLayoutStoreFeature = "DockingLayout";

