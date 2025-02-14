import { FormatMaskType } from "./format-mask-type.model";
import { FormatMaskBase } from "./format-mask-base.model";

export interface FloatFormatMask extends FormatMaskBase {
    readonly type: FormatMaskType.Float;
}
