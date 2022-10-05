import { Rotate } from "./rotate.model";
import { Size } from "./size.model";
import { Offset } from "./offset.model";

export interface ImageRegion extends Size, Offset, Rotate {
    readonly imageRegionId?: string;
    readonly isHidden?: boolean;
    readonly isNormalized?: boolean;
}
