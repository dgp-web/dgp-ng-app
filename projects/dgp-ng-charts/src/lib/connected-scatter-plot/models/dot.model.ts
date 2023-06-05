import { Point } from "dgp-ng-app";

export interface Dot extends Point {
    readonly label?: string;
}
