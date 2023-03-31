import { ColumnComponent } from "../components/grid/column.component";
import { RootComponent } from "../components/root.component";
import { RowComponent } from "../components/grid/row.component";

export type RowParentComponent = ColumnComponent | RootComponent;
export type ColumnParentComponent = RowComponent | RootComponent;
export type RowOrColumnParentComponent = RowParentComponent | ColumnParentComponent;
