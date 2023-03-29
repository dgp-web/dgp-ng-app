import { ItemConfiguration } from "../types";
import { AbstractContentItemComponent } from "../components/shared/abstract-content-item.component";
import { StackComponent } from "../components/tabs/stack.component";
import { RootComponent } from "../components/root.component";

export function shouldWrapInStack(payload: {
    readonly itemConfig: ItemConfiguration;
    readonly parentItem: AbstractContentItemComponent | RootComponent;
}): boolean {
    return payload.itemConfig.type === "component" &&
        !(payload.parentItem instanceof StackComponent) &&
        !!payload.parentItem;
}

