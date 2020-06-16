/**
 * Returns the name of the last attribute accessed by the passed function as string.
 * @param {Function} propertyFunction
 * @returns {string}
 */
export function getPropertyName(propertyFunction: Function) {
    return /\.([^\.;]+);?\s*\}$/.exec(propertyFunction.toString())[1];
}