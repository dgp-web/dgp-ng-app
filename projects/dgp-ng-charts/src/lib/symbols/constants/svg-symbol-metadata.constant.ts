import { ModelMetadata } from "data-modeling";
import { SVGSymbol } from "../models";

export const svgSymbolMetadata: ModelMetadata<SVGSymbol, any> = {
    id: x => x.svgSymbolId
};
