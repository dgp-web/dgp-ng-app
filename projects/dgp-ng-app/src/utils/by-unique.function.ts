/**
 * source: https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
 */
export function byUnique<T>(value: T, index: number, self: T[]) {
    return self.indexOf(value) === index;
}
