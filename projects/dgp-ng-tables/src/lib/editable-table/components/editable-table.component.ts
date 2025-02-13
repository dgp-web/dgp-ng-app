import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Many } from "data-modeling";

export interface TableRow {
    readonly tableRowKey: string;
    readonly position: number;
    readonly label: string;
}

export interface TableColumn {
    readonly tableColumnKey: string;
    readonly position: number;
    readonly label: string;
}

@Component({
    selector: "dgp-editable-table",
    template: ``,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgpEditableTableComponent {

    @Input()
    rows: Many<TableRow>;

    @Input()
    columns: Many<TableColumn>;

    @Input()
    canAddRows: boolean;

    @Input()
    canRemoveRows: boolean;

    @Input()
    canMoveRows: boolean;

    @Input()
    canAddColumns: boolean;

    @Input()
    canRemoveColumns: boolean;

    @Input()
    canMoveColumns: boolean;

}
