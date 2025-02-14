import { RowKey } from "./row-key.model";

export interface TableRow extends RowKey {
    readonly rowKey: string;
    readonly position: number;
    readonly label: string;
}
