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


export interface BoxGroup<TValue = string | number> {
    readonly boxGroupId?: string;
    readonly label: string;
    readonly value?: TValue;
    readonly boxes: ReadonlyArray<Box>;
    readonly boxValues?: ReadonlyArray<BoxValues>;
}

export interface BoxValues {
    readonly boxValuesId: string;

    readonly originalValues: ReadonlyArray<number>;
}
