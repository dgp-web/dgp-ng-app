import { Many } from "data-modeling";
import { TableCellContent } from "./table-cell-content.model";

export interface TableModel {
    readonly model: Many<TableCellContent>;
}
