export interface WithCardinalScaleOffset {
    /**
     * Normalized share with which the extreme values
     * are offset from the borders of the drawing area.
     *
     * If this is 0, then the extreme values are
     * drawn directly onto the borders
     *
     * default: 0.05
     */
    readonly cardinalScaleOffset: number;
}
