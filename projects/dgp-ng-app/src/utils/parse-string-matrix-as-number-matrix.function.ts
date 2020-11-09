import { Matrix } from "./matrix.model";

export function parseStringMatrixAsNumberMatrix(payload: Matrix<string>): Matrix<number> {
    return payload.map(line => line.map(entry => +entry.replace(",", ".")));
}
