import { DialogPosition } from "@angular/material/dialog";
import { TableCellEditorSizes } from "./models";
import { computeTableCellEditorSizes, getDialogPositionFromTableCellEditorSizes } from "./functions";

describe("table-cell-editor functions", () => {

    it(`computeTableCellEditorSizes should compute the offset
    of the dialog from the bottom left corner and compute the total available
    space for the dialog.`, () => {

        const result = computeTableCellEditorSizes({
            tableCellBoundingRect: {
                top: 16,
                left: 32
            } as ClientRect,
            window: {
                innerWidth: 640,
                innerHeight: 480
            } as Window,
            triggerButtonElement: {
                offsetHeight: 8
            } as HTMLElement
        });

        const expectedResult: TableCellEditorSizes = {
            offsetTop: 16 + 8,
            offsetLeft: 32,
            availableSpace: {
                left: 32,
                right: 640 - 32,
                bottom: 480 - (16 + 8),
                top: 480 - 16
            }
        };

        expect(result)
            .toEqual(expectedResult);

    });

    it(`getDialogPositionFromTableCellEditorSizes should open the dialog
    under the cell and align its upper left edge with with the lower left edge of the cell.`, () => {

        const result = getDialogPositionFromTableCellEditorSizes({
            tableCellEditorSizes: {
                offsetTop: 16 + 8,
                offsetLeft: 32,
                availableSpace: {
                    left: 32,
                    right: 640 - 32,
                    bottom: 480 - (16 + 8),
                    top: 480 - 16
                }
            },
            configureDialogWidth: 700
        });

        const expectedResult: DialogPosition = {
            top: 16 + 8 + "px",
            left: 32 + "px",
            bottom: null,
            right: null
        };

        expect(result)
            .toEqual(expectedResult);

    });

});
