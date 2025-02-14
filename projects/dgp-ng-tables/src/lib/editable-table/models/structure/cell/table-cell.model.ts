import { FormatMask } from "../format-mask";

export interface TableCell {
    readonly rowKey: string;
    readonly columnKey: string;
    readonly formatMask?: FormatMask;
}
