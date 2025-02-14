import { TextFormatMask } from "./text-format-mask.model";
import { IntegerFormatMask } from "./integer-format-mask.model";
import { FloatFormatMask } from "./float-format-mask.model";
import { BooleanFormatMask } from "./boolean-format-mask.model";
import { ImageFormatMask } from "./image-format-mask.model";
import { DateFormatMask } from "./date-format-mask.model";
import { AutoFormatMask } from "./auto-format-mask.model";

export type FormatMask = AutoFormatMask
    | TextFormatMask
    | IntegerFormatMask
    | FloatFormatMask
    | BooleanFormatMask
    | ImageFormatMask
    | DateFormatMask;
