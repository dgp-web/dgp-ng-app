import { getHashCode } from "./get-hash-code.function";

export function areEqualByHashCode<T>(a: T, b: T): boolean {
    return getHashCode(a) === getHashCode(b);
}
