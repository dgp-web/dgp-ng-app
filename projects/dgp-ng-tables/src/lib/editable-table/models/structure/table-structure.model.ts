import { Many } from "data-modeling";
import { TableRow } from "./row/table-row.model";
import { TableColumn } from "./column/table-column.model";
import { TableCell } from "./cell/table-cell.model";

export interface TableStructure {
    readonly rows: Many<TableRow>;
    readonly columns: Many<TableColumn>;
    readonly cells: Many<TableCell>;
}
