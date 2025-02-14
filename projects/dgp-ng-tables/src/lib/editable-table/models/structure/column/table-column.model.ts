import { FormatMask } from "../format-mask/format-mask.model";
import { ColumnKey } from "./column-key.model";

export interface TableColumn extends ColumnKey {
    readonly position: number;
    readonly label: string;
    readonly formatMask: FormatMask;
}
