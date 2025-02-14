import { FormatMaskType } from "./format-mask-type.model";
import { FormatMaskBase } from "./format-mask-base.model";

export interface TextFormatMask extends FormatMaskBase {
    readonly type: FormatMaskType.Text;
}
