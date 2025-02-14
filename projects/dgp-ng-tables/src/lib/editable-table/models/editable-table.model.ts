import { TableModel } from "./model/table-model.model";
import { TableStructure } from "./structure/table-structure.model";
import { TableDisplayConfig } from "./display-config/table-display-config.model";
import { TableEditConfig } from "./edit-config/table-edit-config.model";

export interface EditableTable extends TableModel, TableStructure, TableDisplayConfig, TableEditConfig {
}
