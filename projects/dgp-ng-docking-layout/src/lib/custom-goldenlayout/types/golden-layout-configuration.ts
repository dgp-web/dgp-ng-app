import { TemplateRef } from "@angular/core";

export type ItemType = "row" | "column" | "stack" | "component";

export interface LayoutConfiguration {
    settings: {
        hasHeaders: boolean;
        constrainDragToContainer: boolean;
        reorderEnabled: boolean;
        selectionEnabled: boolean;
        popoutWholeStack: boolean;
        blockedPopoutsThrowError: boolean;
        closePopoutsOnUnload: boolean;
        showPopoutIcon: boolean;
        showMaximiseIcon: boolean;
        showCloseIcon: boolean;
    };
    dimensions: {
        borderWidth: number;
        minItemHeight: number;
        minItemWidth: number;
        headerHeight: number;
        dragProxyWidth: number;
        dragProxyHeight: number;
    };
    labels: {
        close: string;
        maximise: string;
        minimise: string;
        popout: string;
    };
    content: ItemConfiguration[];
}

export interface ItemConfiguration {
    type: ItemType;
    id?: string;
    width?: number;
    height?: number;

    content?: ItemConfiguration[];
}

export interface ComponentConfiguration extends ItemConfiguration {
    type: "component";
    componentName: string;
    componentState: {
        template: () => TemplateRef<any>
    };

    isClosable?: boolean;
    title?: string;
}

export interface RowConfiguration extends ItemConfiguration {
    type: "row";

    content: ItemConfiguration[];
}

export interface ColumnConfiguration extends ItemConfiguration {
    type: "column";

    content: ItemConfiguration[];
}
