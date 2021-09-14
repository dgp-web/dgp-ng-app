import { BoxOutlierId } from "../models";

export function getBoxOutlierSurrogateKey(payload: BoxOutlierId) {
    return payload.boxGroupId + "." + payload.boxId + "." + payload.outlierIndex;
}
