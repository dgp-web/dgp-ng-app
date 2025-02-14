import { RowKey } from "./row-key.model";

export interface TableRow extends RowKey {
    readonly position: number;
}
