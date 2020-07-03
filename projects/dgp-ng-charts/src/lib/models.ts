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
}

export interface BoxBody {
    /**
     * Boxes may come along with a BoxValues
     * that contains their original data
     */
    readonly boxValuesId?: string;

    readonly quantiles: BoxQuantiles;
}

export interface BoxQuantiles {
    readonly max: number;
    readonly upper: number;
    readonly median: number;
    readonly lower: number;
    readonly min: number;
}


export interface BoxOutlierConfig {
    /**
     * Values below this limit are considered outliers
     */
    readonly lowerQuantilePercentage: number;
    /**
     * Values above this limit are considered outliers
     */
    readonly upperQuantilePercentage: number;
}

export const defaultBoxOutlierConfig: BoxOutlierConfig = {
    lowerQuantilePercentage: 2.5,
    upperQuantilePercentage: 97.5
};

export interface BoxGroup<TValue = any> {
    readonly boxGroupId?: string;
    readonly label: string;
    readonly value?: TValue;
}

export interface BoxValues {
    readonly boxValuesId: string;

    readonly originalValues: ReadonlyArray<number>;
}
