import { BoxQuantiles } from "./box-quantiles.model";

export interface BoxBody {
    /**
     * Boxes may come along with a BoxValues
     * that contains their original data
     */
    readonly boxValuesId?: string;

    readonly quantiles: BoxQuantiles;
}
