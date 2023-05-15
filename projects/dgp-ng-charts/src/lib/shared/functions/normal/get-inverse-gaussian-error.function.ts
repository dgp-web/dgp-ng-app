/**
 * References
 * - https://stackoverflow.com/questions/12556685/is-there-a-javascript-implementation-of-the-inverse-error-function-akin-to-matl
 */
export function getInverseGaussianError(x: number): number {
    let z: number;
    const a = 0.147;
    let the_sign_of_x;
    if (0 == x) {
        the_sign_of_x = 0;
    } else if (x > 0) {
        the_sign_of_x = 1;
    } else {
        the_sign_of_x = -1;
    }

    if (0 !== x) {
        const ln_1minus_x_sqrd = Math.log(1 - x * x);
        const ln_1minusxx_by_a = ln_1minus_x_sqrd / a;
        const ln_1minusxx_by_2 = ln_1minus_x_sqrd / 2;
        const ln_etc_by2_plus2 = ln_1minusxx_by_2 + (2 / (Math.PI * a));
        const first_sqrt = Math.sqrt((ln_etc_by2_plus2 * ln_etc_by2_plus2) - ln_1minusxx_by_a);
        const second_sqrt = Math.sqrt(first_sqrt - ln_etc_by2_plus2);
        z = second_sqrt * the_sign_of_x;
    } else { // x is zero
        z = 0;
    }
    return z;
}
