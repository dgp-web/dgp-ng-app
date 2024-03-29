import { matrixToMany } from "dgp-ng-app";

export function getLogTickValues(base: number = 10, steps = [1]) {
    return [
        Math.pow(base, -15),
        Math.pow(base, -14),
        Math.pow(base, -13),
        Math.pow(base, -12),
        Math.pow(base, -11),
        Math.pow(base, -10),
        Math.pow(base, -9),
        Math.pow(base, -8),
        Math.pow(base, -7),
        Math.pow(base, -6),
        Math.pow(base, -5),
        Math.pow(base, -4),
        Math.pow(base, -3),
        Math.pow(base, -2),
        Math.pow(base, -1),
        Math.pow(base, 0),
        Math.pow(base, 1),
        Math.pow(base, 2),
        Math.pow(base, 3),
        Math.pow(base, 4),
        Math.pow(base, 5),
        Math.pow(base, 6),
        Math.pow(base, 7),
        Math.pow(base, 8),
        Math.pow(base, 9),
        Math.pow(base, 10),
        Math.pow(base, 11),
        Math.pow(base, 12),
        Math.pow(base, 13),
        Math.pow(base, 14),
        Math.pow(base, 15)
    ].map(item => {
        return steps.map(step => step * item);
    }).reduce(matrixToMany);

}
