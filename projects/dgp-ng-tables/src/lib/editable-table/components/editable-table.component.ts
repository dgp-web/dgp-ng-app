import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Many } from "data-modeling";

export interface TableRow {
    readonly rowKey: string;
    readonly position: number;
    readonly label: string;
}

export enum FormatMaskType {
    Auto = "auto",
    Text = "text",
    Integer = "integer",
    Float = "float",
    Boolean = "boolean",
    Image = "image",
    Date = "date"
}

export interface FormatMaskBase {
    readonly type: FormatMaskType;
}

export interface TextFormatMask {
    readonly type: FormatMaskType.Text;
}

export interface IntegerFormatMask {
    readonly type: FormatMaskType.Integer;
}

export interface FloatFormatMask {
    readonly type: FormatMaskType.Float;
}

export interface BooleanFormatMask {
    readonly type: FormatMaskType.Boolean;
}

export interface ImageFormatMask {
    readonly type: FormatMaskType.Image;
}

export interface DateFormatMask {
    readonly type: FormatMaskType.Date;
}

export interface AutoFormatMask {
    readonly type: FormatMaskType.Auto;
}

export type FormatMask = AutoFormatMask
    | TextFormatMask
    | IntegerFormatMask
    | FloatFormatMask
    | BooleanFormatMask
    | ImageFormatMask
    | DateFormatMask;

export interface TableColumn {
    readonly columnKey: string;
    readonly position: number;
    readonly label: string;
    readonly formatMask: FormatMask;
}

export interface TableCell {
    readonly rowKey: string;
    readonly columnKey: string;
    readonly formatMask: FormatMask;
}

export interface TableCellContent {
    readonly rowKey: string;
    readonly columnKey: string;
    readonly value: any; // TODO
}

export interface TableDisplayConfig {
    readonly sizingStrategy: "default" | "stretch";
}

export interface TableRowEditConfig {
    readonly canAddRows: boolean;
    readonly canRemoveRows: boolean;
    readonly canMoveRows: boolean;
    readonly canResizeRows: boolean;
}

export interface TableColumnEditConfig {
    readonly canAddColumns: boolean;
    readonly canRemoveColumns: boolean;
    readonly canMoveColumns: boolean;
    readonly canResizeColumns: boolean;
    readonly canEditColumnFormatMasks: boolean;
}

export interface TableCellEditConfig {
    readonly canEditCellFormatMasks: boolean;
}

export interface TableEditConfig extends TableRowEditConfig, TableColumnEditConfig, TableCellEditConfig {

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

    /**
     * Row editing capabilities
     */

    @Input()
    canAddRows: boolean;

    @Input()
    canRemoveRows: boolean;

    @Input()
    canMoveRows: boolean;

    @Input()
    canResizeRows: boolean;

    /**
     * Column editing capabilities
     */

    @Input()
    canAddColumns: boolean;

    @Input()
    canRemoveColumns: boolean;

    @Input()
    canMoveColumns: boolean;

    @Input()
    canResizeColumns: boolean;

    @Input()
    canEditColumnFormatMasks: boolean;

}
