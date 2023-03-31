import { ItemConfiguration } from "../types";
import { StackComponent } from "../components/tabs/stack.component";
import { RootComponent } from "../components/root.component";
import { RowOrColumnComponent } from "../components/grid/row-or-column.component";
import { GlComponent } from "../components/component.component";

export function shouldWrapInStack(payload: {
    readonly itemConfig: ItemConfiguration;
    readonly parentItem: RowOrColumnComponent | RootComponent | StackComponent | GlComponent;
}): boolean {
    return payload.itemConfig.type === "component" &&
        !(payload.parentItem instanceof StackComponent) &&
        !!payload.parentItem;
} 

