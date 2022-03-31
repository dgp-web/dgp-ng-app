import { Matrix } from "data-modeling";

export function parseStringMatrixAsNumberMatrix(payload: Matrix<string>): Matrix<number> {
    return payload.map(line => line.map(entry => +entry.replace(",", ".")));
}
