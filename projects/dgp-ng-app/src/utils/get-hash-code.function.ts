import {isNullOrUndefined} from "dgp-ng-app";

/**
 * Source: https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
 */
export function getHashCode(object: any): number {
    let hash = 0;
    if (isNullOrUndefined(object)) return hash;

    const serializedObject = JSON.stringify(object);

    if (serializedObject.length === 0) return hash;

    for (let i = 0; i < serializedObject.length; i++) {
        const char = serializedObject.charCodeAt(i);
        // tslint:disable-next-line:no-bitwise
        hash = ((hash << 5) - hash) + char;
        // tslint:disable-next-line:no-bitwise
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}
