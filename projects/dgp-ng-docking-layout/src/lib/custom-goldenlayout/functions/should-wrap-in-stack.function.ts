import { ItemConfiguration } from "../types";
import { AbstractContentItemComponent } from "../components/shared/abstract-content-item.component";
import { StackComponent } from "../components/tabs/stack.component";

export function shouldWrapInStack(payload: {
    readonly itemConfig: ItemConfiguration;
    readonly parentItem: AbstractContentItemComponent;
}): boolean {
    return payload.itemConfig.type === "component" &&
        !(payload.parentItem instanceof StackComponent) &&
        !!payload.parentItem;
}

