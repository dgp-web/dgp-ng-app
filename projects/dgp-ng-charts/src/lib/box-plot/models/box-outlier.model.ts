import { BoxOutlierId } from "./box-outlier-id.model";

export interface BoxOutlier extends BoxOutlierId {
    readonly value: any;
    readonly colorHex: string;
}
