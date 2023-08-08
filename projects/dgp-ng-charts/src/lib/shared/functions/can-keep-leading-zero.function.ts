export function canKeepLeadingZero(payload: {
    readonly decimalPlace: string;
    readonly result: string;
}): boolean {
    const decimalPlace = payload.decimalPlace;
    const result = payload.result;

    return decimalPlace === "0" && result.split("").every(x => x === "0");
}
