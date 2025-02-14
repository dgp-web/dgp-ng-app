import { FormatMaskType } from "./format-mask-type.model";
import { FormatMaskBase } from "./format-mask-base.model";

export interface ImageFormatMask extends FormatMaskBase {
    readonly type: FormatMaskType.Image;
}
