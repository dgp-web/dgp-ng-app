import { FillPattern } from "../../fill-pattern-icon/models";

export interface Bar {
    readonly barKey: string;
    readonly label?: string;
    readonly value?: number;
    readonly colorHex?: string;

    readonly fillPattern?: FillPattern;
}
