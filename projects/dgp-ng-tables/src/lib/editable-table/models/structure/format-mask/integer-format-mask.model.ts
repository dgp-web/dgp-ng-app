import { FormatMaskType } from "./format-mask-type.model";
import { FormatMaskBase } from "./format-mask-base.model";

export interface IntegerFormatMask extends FormatMaskBase {
    readonly type: FormatMaskType.Integer;
}
