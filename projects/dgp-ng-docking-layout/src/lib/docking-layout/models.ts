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

export interface View<TModel = null> {
    render(model?: TModel): string;
}

export interface ViewModels {
    [key: string]: any;
}

export declare type ViewMap<TViewModels extends ViewModels> = {
    readonly [K in keyof TViewModels]: View<TViewModels[K]>;
};

export interface HeaderButtonViewModel {
    readonly cssClass: string;
    readonly label: string;
}

export interface DockingLayoutViewModels extends ViewModels {
    readonly dragProxy;
    readonly dropTargetIndicator;
    readonly header;
    readonly headerButton: HeaderButtonViewModel;
    readonly itemContainer;
    readonly root;
    readonly rowOrColumn: RowOrColumn;
    readonly stack;
    readonly stackContent;
    readonly tab;
    readonly transitionIndicator;
}


export interface Area {
    readonly x1: number;
    readonly y1: number;
    readonly x2: number;
    readonly y2: number;

}

export interface RowOrColumn {
    readonly isColumn: boolean;
}
