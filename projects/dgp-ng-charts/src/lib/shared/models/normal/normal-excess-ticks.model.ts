import { Many } from "data-modeling";

export interface NormalExcessTicks {
    readonly lower: Many<number>;
    readonly upper: Many<number>;
}
