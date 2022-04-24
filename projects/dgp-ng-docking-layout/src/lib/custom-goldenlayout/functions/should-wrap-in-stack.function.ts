import { ItemConfiguration } from "../types";
import { AbstractContentItemComponent } from "../components/abstract-content-item.component";
import { StackComponent } from "../components/stack.component";

export function shouldWrapInStack(payload: {
    readonly itemConfig: ItemConfiguration;
    readonly parentItem: AbstractContentItemComponent;
}): boolean {
    return payload.itemConfig.type === "component" &&
        !(payload.parentItem instanceof StackComponent) &&
        !!payload.parentItem;
}
 
