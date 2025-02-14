import { FormatMask } from "../format-mask";
import { ColumnKey } from "./column-key.model";

export interface TableColumn extends ColumnKey {
    readonly label: string;
    readonly formatMask?: FormatMask;
}
