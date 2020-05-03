import { InjectionToken, TemplateRef } from "@angular/core";

export type ItemType = "row" | "column" | "stack" | "component";

export interface LayoutConfiguration {
    readonly settings?: {
        readonly hasHeaders?: boolean;
        readonly constrainDragToContainer?: boolean;
        readonly reorderEnabled?: boolean;
        readonly selectionEnabled?: boolean;
        readonly popoutWholeStack?: boolean;
        readonly blockedPopoutsThrowError?: boolean;
        readonly closePopoutsOnUnload?: boolean;
        readonly showPopoutIcon?: boolean;
        readonly showMaximiseIcon?: boolean;
        readonly showCloseIcon?: boolean;
        readonly responsiveMode?: string;
        readonly tabOverlapAllowance?: number;
        readonly reorderOnTabMenuClick?: boolean;
        readonly tabControlOffset?: number;
    };
    readonly dimensions?: {
        readonly borderWidth?: number;
        readonly minItemHeight?: number;
        readonly minItemWidth?: number;
        readonly headerHeight?: number;
        readonly dragProxyWidth?: number;
        readonly dragProxyHeight?: number;
        readonly borderGrabWidth?: number;
    };
    readonly labels?: {
        readonly close?: string;
        readonly maximise?: string;
        readonly minimise?: string;
        readonly popout?: string;
        readonly tabDropdown?: string;
    };
    readonly content?: ItemConfiguration[];
}

export interface ItemConfiguration {
    type: ItemType;
    id?: string | string[];
    width?: number;
    height?: number;
    isClosable?: boolean;
    hasHeaders?: boolean;
    reorderEnabled?: boolean;
    title?: string;
    activeItemIndex?: number;

    content?: ItemConfiguration[];
    header?: any;
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

export const ITEM_CONFIG = new InjectionToken<ItemConfiguration>("ItemConfig");
export const ROW_OR_COLUMN = new InjectionToken<boolean>("RowOrColumn");
