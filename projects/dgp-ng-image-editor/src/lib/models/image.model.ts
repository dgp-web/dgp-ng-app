import { Many } from "data-modeling";
import { Transform } from "./transform.model";
import { ImageRegion } from "./image-region.model";

export interface Image extends Transform {
    readonly src?: string;
    readonly stretch?: boolean;
    readonly regions?: Many<ImageRegion>;
}
