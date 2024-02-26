export function getPValueByExponent(payload: {
    readonly exponent: number;
}): number {
    const exponent = payload.exponent;
    return 1 / (10 ** exponent);
}
