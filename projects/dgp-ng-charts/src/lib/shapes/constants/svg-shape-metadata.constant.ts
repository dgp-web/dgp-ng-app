import { ModelMetadata } from "data-modeling";
import { SVGShape } from "../models";

export const svgShapeMetadata: ModelMetadata<SVGShape, any> = {
    id: x => x.svgShapeId
};
