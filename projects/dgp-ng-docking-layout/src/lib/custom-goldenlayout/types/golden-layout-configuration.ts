import { TemplateRef } from "@angular/core";

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
    };
    readonly dimensions?: {
        readonly borderWidth?: number;
        readonly minItemHeight?: number;
        readonly minItemWidth?: number;
        readonly headerHeight?: number;
        readonly dragProxyWidth?: number;
        readonly dragProxyHeight?: number;
    };
    readonly labels?: {
        readonly close?: string;
        readonly maximise?: string;
        readonly minimise?: string;
        readonly popout?: string;
    };
    readonly content: ItemConfiguration[];
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
