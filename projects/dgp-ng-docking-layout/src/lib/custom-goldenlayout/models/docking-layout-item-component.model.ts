import { RowOrColumnComponent } from "../components/grid/_row-or-column.component";
import { RootComponent } from "../components/_root.component";
import { StackComponent } from "../components/tabs/stack.component";
import { GlComponent } from "../components/component.component";

export type DockingLayoutItemComponent = RowOrColumnComponent | RootComponent | StackComponent | GlComponent;
