import { Many } from "data-modeling";
import { ImageRegion } from "./image-region.model";
import { ImageConfig } from "./image-config.model";

export interface Image extends ImageConfig {
    readonly src?: string;
    readonly regions?: Many<ImageRegion>;
}
