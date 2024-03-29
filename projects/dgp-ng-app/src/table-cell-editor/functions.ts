import { DialogPosition } from "@angular/material/dialog";
import { TableCellEditorSizes } from "./models";

export function computeTableCellEditorSizes(payload: {
    readonly tableCellBoundingRect: ClientRect;
    readonly window: Window;
    readonly triggerButtonElement: HTMLElement;
}): TableCellEditorSizes {

    return {
        offsetTop: (payload.tableCellBoundingRect.top + payload.triggerButtonElement.offsetHeight),
        offsetLeft: payload.tableCellBoundingRect.left,
        offsetRight: payload.tableCellBoundingRect.right,
        availableSpace: {
            left: payload.tableCellBoundingRect.left,
            right: payload.window.innerWidth - (payload.tableCellBoundingRect.left),
            bottom: payload.window.innerHeight - (payload.tableCellBoundingRect.top + payload.triggerButtonElement.offsetHeight),
            top: payload.tableCellBoundingRect.top
        }
    };

}

export function getDialogPositionFromTableCellEditorSizes(payload: {
    readonly tableCellEditorSizes: TableCellEditorSizes;
    readonly triggerButtonElement: HTMLElement;
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
            left: (payload.tableCellEditorSizes.offsetRight - payload.configureDialogWidth) + "px"
        };
    }

    if (payload.tableCellEditorSizes.availableSpace.bottom < 240
        && payload.tableCellEditorSizes.availableSpace.top >= 240) {
        result = {
            ...result,
            top: null,
            bottom: null,
            left: null,
            right: null
        };
    }

    return result;
}
