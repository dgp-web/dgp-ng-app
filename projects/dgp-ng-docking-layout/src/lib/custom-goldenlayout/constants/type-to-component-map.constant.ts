import { ColumnComponent } from "../components/column.component";
import { RowComponent } from "../components/row.component";
import { StackComponent } from "../components/stack.component";
import { Component } from "../components/component.component";

export const typeToComponentMap = {
    column: ColumnComponent,
    row: RowComponent,
    stack: StackComponent,
    component: Component
};
