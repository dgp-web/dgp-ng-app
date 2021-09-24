import { Bar } from "./bar.model";

export interface BarGroup {
    readonly barGroupKey: string;
    readonly label: string;
    readonly bars: ReadonlyArray<Bar>;
}
