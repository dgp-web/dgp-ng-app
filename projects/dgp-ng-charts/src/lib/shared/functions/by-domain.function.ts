import { NumericDomain } from "../models/numeric-domain.model";

/**
 * Expression to be used in .filter() with a given domain
 */
export function byInvertedDomain(domain: NumericDomain) {
    return (value: number) => value >= domain[1] && value <= domain[0];
}
/**
 * Expression to be used in .filter() with a given domain
 */
export function byDomain(domain: NumericDomain) {
    return (value: number) => value >= domain[0] && value <= domain[1];
}
