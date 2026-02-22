import { StackComponent } from "../components/tabs/stack.component";
import { GlComponent } from "../components/component.component";
import { RowOrColumnComponent } from "../components/grid/_row-or-column.component";

export const typeToComponentMap = {
    column: RowOrColumnComponent,
    row: RowOrColumnComponent,
    stack: StackComponent,
    component: GlComponent
};
