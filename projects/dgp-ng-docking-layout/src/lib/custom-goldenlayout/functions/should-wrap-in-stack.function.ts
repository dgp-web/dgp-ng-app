import { ItemConfiguration } from "../types";
import { StackComponent } from "../components/tabs/stack.component";
import { DockingLayoutItemComponent } from "../models/docking-layout-item-component.model";

export function shouldWrapInStack(payload: {
    readonly itemConfig: ItemConfiguration;
    readonly parentItem: DockingLayoutItemComponent;
}): boolean {
    return payload.itemConfig.type === "component" &&
        !(payload.parentItem instanceof StackComponent) &&
        !!payload.parentItem;
}

