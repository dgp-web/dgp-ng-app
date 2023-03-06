import { ColumnComponent } from "../components/grid/column.component";
import { RowComponent } from "../components/grid/row.component";
import { StackComponent } from "../components/tabs/stack.component";
import { GlComponent } from "../components/component.component";

export const typeToComponentMap = {
    column: ColumnComponent,
    row: RowComponent,
    stack: StackComponent,
    component: GlComponent
};
