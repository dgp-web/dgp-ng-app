import { DialogPosition } from "@angular/material/dialog";
import { TableCellEditorSizes } from "./models";

export function computeTableCellEditorSizes(payload: {
    readonly tableCellBoundingRect: ClientRect;
    readonly windowRef: Window;
    readonly triggerButtonElement: HTMLElement;
}): TableCellEditorSizes {

    return {
        offsetTop: (payload.tableCellBoundingRect.top + payload.triggerButtonElement.offsetHeight),
        offsetLeft: payload.tableCellBoundingRect.left,
        availableSpace: {
            left: payload.tableCellBoundingRect.left,
            right: payload.windowRef.innerWidth - (payload.tableCellBoundingRect.left),
            bottom: payload.windowRef.innerHeight - (payload.tableCellBoundingRect.top + payload.triggerButtonElement.offsetHeight),
            top: payload.windowRef.innerHeight - payload.tableCellBoundingRect.top
        }
    };

}

export function getDialogPositionFromTableCellEditorSizes(payload: {
    readonly tableCellEditorSizes: TableCellEditorSizes;
    readonly configureDialogWidth: number;
}): DialogPosition {

    let result: DialogPosition = {
        top: payload.tableCellEditorSizes.offsetTop + "px",
        left: payload.tableCellEditorSizes.offsetLeft + "px",
        bottom: null,
        right: null
    };


    if (payload.tableCellEditorSizes.availableSpace.right < payload.configureDialogWidth
        && payload.tableCellEditorSizes.availableSpace.left >= payload.configureDialogWidth) {
        result = {
            ...result,
            left: (payload.tableCellEditorSizes.availableSpace.right - payload.configureDialogWidth) + "px"
        };
    }

    return result;
}
