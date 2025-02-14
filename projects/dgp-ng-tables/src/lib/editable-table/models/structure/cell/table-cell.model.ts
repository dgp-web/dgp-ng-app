import { FormatMask } from "../format-mask/format-mask.model";

export interface TableCell {
    readonly rowKey: string;
    readonly columnKey: string;
    readonly formatMask: FormatMask;
}
