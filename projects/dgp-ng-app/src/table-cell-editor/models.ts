export interface TableCellEditorSizes {
    readonly offsetTop: number;
    readonly offsetLeft: number;
    readonly availableSpace: {
        readonly left: number;
        readonly right: number;
        readonly top: number;
        readonly bottom: number;
    };
}
