import { Dimensions } from "./dimensions.model";

export interface ContentAreaDimensions {
    header: Dimensions;
    body?: Dimensions;
    top?: Dimensions;
    left?: Dimensions;
    right?: Dimensions;
    bottom?: Dimensions;
}
