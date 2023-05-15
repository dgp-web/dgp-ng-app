/**
 * References
 * - https://stackoverflow.com/questions/1906064/gauss-error-function-implementation-for-javascript
 */
export function getGaussianError(x: number) {
    let z: number;
    const ERF_A = 0.147;
    let theSignOfX: number;
    if (0 === x) {
        theSignOfX = 0;
        return 0;
    } else if (x > 0) {
        theSignOfX = 1;
    } else {
        theSignOfX = -1;
    }

    const one_plus_axsqrd = 1 + ERF_A * x * x;
    const four_ovr_pi_etc = 4 / Math.PI + ERF_A * x * x;
    let ratio = four_ovr_pi_etc / one_plus_axsqrd;
    ratio *= x * -x;
    const expofun = Math.exp(ratio);
    const radical = Math.sqrt(1 - expofun);
    z = radical * theSignOfX;
    return z;
}
