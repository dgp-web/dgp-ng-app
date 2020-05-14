/**
 * Recursive marks all attributes of an object
 * as optional.
 */
export type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};