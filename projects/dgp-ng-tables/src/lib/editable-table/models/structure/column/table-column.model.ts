import { FormatMask } from "../format-mask/format-mask.model";

export interface TableColumn {
    readonly columnKey: string;
    readonly position: number;
    readonly label: string;
    readonly formatMask: FormatMask;
}
