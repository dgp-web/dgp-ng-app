export function isNullOrUndefined(value: any, ...additionalValues: any): boolean {
    return value === null
        || value === undefined
        || additionalValues.some(x => x === null || x === undefined);
}

export const nullOrUndefined = isNullOrUndefined;

export function notNullOrUndefined(value: any, ...additionalValues: any): boolean {
    return !isNullOrUndefined(value)
        && !additionalValues.some(isNullOrUndefined);
}
