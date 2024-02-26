export function getNormalPBoundaryExponent(payload?: {
    readonly PLength: number;
}): number {
    const PLength = payload.PLength;

    const exponent = Math.log10(PLength);

    return Math.ceil(exponent) + 1;
}
