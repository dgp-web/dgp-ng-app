import { TableColumnEditConfig } from "./table-column-edit-config.model";
import { TableCellEditConfig } from "./table-cell-edit-config.model";
import { TableRowEditConfig } from "./table-row-edit-config.model";

export interface TableEditConfig extends TableRowEditConfig, TableColumnEditConfig, TableCellEditConfig {

}
