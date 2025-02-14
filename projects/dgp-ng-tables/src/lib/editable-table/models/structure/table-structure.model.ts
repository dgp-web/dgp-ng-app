import { Many } from "data-modeling";
import { TableRow } from "./row";
import { TableColumn } from "./column";
import { TableCell } from "./cell";

export interface TableStructure {
    readonly rows: Many<TableRow>;
    readonly columns: Many<TableColumn>;
    readonly cells?: Many<TableCell>;
}
