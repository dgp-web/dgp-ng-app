import * as _ from "lodash";
import { Matrix } from "data-modeling";

export function flattenMatrix<T>(matrix: Matrix<T>): ReadonlyArray<T> {
    return _.flatten(matrix);
}

