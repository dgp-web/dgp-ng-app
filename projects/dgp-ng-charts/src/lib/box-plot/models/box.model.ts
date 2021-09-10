import { BoxQuantiles } from "./box-quantiles.model";

export interface Box {
    readonly boxId: string;
    /**
     * Boxes may be included in a group
     */
    readonly boxGroupId?: string;
    /**
     * Boxes may come along with a BoxValues
     * that contains their original data
     */
    readonly boxValuesId?: string;

    readonly quantiles: BoxQuantiles;

    readonly outliers?: ReadonlyArray<number>;

    readonly colorHex: string;

    // readonly fillPattern: FillPattern;
}
