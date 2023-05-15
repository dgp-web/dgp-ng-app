export function getMedianRank(payload: {
    /**
     * Rank of the smallest value, start at 1
     */
    readonly i: number;
    /**
     * Sample size
     */
    readonly n: number;
}) {
    const i = payload.i;
    const n = payload.n;

    return (i - 0.3) / (n + 0.4);
}
