import * as _ from "lodash";
import {Matrix} from "./matrix.model";

export function flattenMatrix<T>(matrix: Matrix<T>): ReadonlyArray<T> {
    return _.flatten(matrix);
}

