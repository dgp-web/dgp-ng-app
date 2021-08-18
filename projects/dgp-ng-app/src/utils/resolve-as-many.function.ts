import { Many, OneOrMany } from "data-modeling";

export function resolveAsMany<T>(payload: OneOrMany<T>): Many<T> {
    if (Array.isArray(payload)) { // @ts-ignore
        return payload as T[];
    }
    return [payload as T];
}
