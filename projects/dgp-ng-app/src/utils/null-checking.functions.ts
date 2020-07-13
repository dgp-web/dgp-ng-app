export function isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
}

export const nullOrUndefined = isNullOrUndefined;
export const notNullOrUndefined = x => !nullOrUndefined(x);
