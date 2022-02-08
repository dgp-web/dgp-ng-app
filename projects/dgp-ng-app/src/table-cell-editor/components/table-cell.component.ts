import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DgpTableCelLEditorDirective } from "../directives/table-cell-editor.directive";
import { MatDialogRef } from "@angular/material/dialog";
import {
    computeTableCellEditorSizes,
    getDialogPositionFromTableCellEditorSizes
} from "../functions";

@Component({
    selector: "dgp-table-cell",
    template: `

        <button #triggerButton
                mat-button
                [disabled]="disabled"
                (click)="openCellEditorDialog()"
                class="mat-table-cell-editor-trigger-button">
            <ng-content></ng-content>
        </button>

    `,
    styles: [`

        dgp-table-cell {
            display: flex;
            flex-grow: 1;
        }

        .mat-table-cell-editor-trigger-button {
            flex-grow: 1;
            justify-content: flex-start;
            padding: initial;
            display: flex;
            font-weight: initial;
        }

        .mat-table-cell-editor-trigger-button .mat-button-wrapper {
            flex-grow: 1;
            justify-content: flex-start;
            display: flex;
        }

        .mat-dialog-no-backdrop {
            background: initial;
        }


    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})

export class DgpTableCellComponent {

    @Input()
    editDialogConfig: MatDialogConfig = {
        width: "240px"
    };

    @Output()
    readonly editorOpened = new EventEmitter();

    @Output()
    readonly editorClosed = new EventEmitter();

    @Input()
    disabled: boolean;

    @Input()
    scrollParentSelector: string;

    @ContentChild(DgpTableCelLEditorDirective, {
    read: TemplateRef
})
    editorTemplate: TemplateRef<any>;

    @ViewChild("triggerButton", {
    read: ElementRef
}) buttonElRef: ElementRef;

    private dialogRef: MatDialogRef<any>;

    constructor(private readonly matDialog: MatDialog) {
    }

    async openCellEditorDialog() {

        this.editorOpened.emit();

        const triggerButtonElement = this.buttonElRef.nativeElement as HTMLElement;
        const configureDialogWidth = +this.editDialogConfig.width.replace("px", "");
        const tableCellBoundingRect = this.buttonElRef.nativeElement.getBoundingClientRect() as ClientRect;

        const tableCellEditorSizes = computeTableCellEditorSizes({
            tableCellBoundingRect, triggerButtonElement, window
        });

        const position = getDialogPositionFromTableCellEditorSizes({
            tableCellEditorSizes, configureDialogWidth, triggerButtonElement
        });

        this.dialogRef = this.matDialog.open(this.editorTemplate, {
            ...this.editDialogConfig,
            position,
            backdropClass: "mat-dialog-no-backdrop",
        });

        await this.dialogRef.afterClosed().toPromise();

        this.dialogRef = null;
        this.editorClosed.emit();
    }

    closeCellEditorDialog() {
        if (this.dialogRef) {
            this.dialogRef.close();
        }
    }

}
