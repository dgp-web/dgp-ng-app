import { InjectionToken, TemplateRef } from "@angular/core";
import { Subject } from "rxjs";
import { DropSegment } from "../models/drop-segment.model";

export type ItemType = "row" | "column" | "stack" | "component" | "root";

export interface HeaderConfig {
    show: boolean | DropSegment;
    popout: string;
    maximise: string;
    close: string;
    minimise: string;
}

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
    type?: ItemType;
    id?: string;
    width?: number;
    height?: number;
    isClosable?: boolean;

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
    selected?: () => void;
}

export interface SelectedItemChange {
    readonly id: string;
}

export interface StackConfiguration extends ItemConfiguration {
    type: "stack";
    activeItemIndex?: number;
    activeItemId?: string;
    hasHeaders?: boolean;
    header?: any;

    content: ComponentConfiguration[];
    onSelectedItemChange?: (id: string) => void;
    publishSelectedItemChange$?: Subject<SelectedItemChange>;
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
export const PARENT_ITEM_COMPONENT = new InjectionToken("parentItemCOmponent");
