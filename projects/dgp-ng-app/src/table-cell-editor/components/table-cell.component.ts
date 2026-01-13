import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
    ViewChild
} from "@angular/core";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { DgpTableCelLEditorDirective } from "../directives/table-cell-editor.directive";
import { computeTriggerElementSizes, getDialogPositionFromTriggerElementSizes } from "../functions";
import { DgpTableCellEditorService } from "../service/table-cell-editor.service";
import { DgpTableCellEditorComponent } from "./table-cell-editor.component";

@Component({
    selector: "dgp-table-cell",
    template: `

        <button #triggerButton
                mat-button
                [disabled]="disabled"
                (click)="openCellEditorDialog()"
                class="mat-mdc-table-cell-editor-trigger-button">
            <ng-content></ng-content>
        </button>

    `,
    styles: [`
        :host {
            display: flex;
            flex-grow: 1;
        }

        .mat-mdc-table-cell-editor-trigger-button {
            flex-grow: 1;
            justify-content: flex-start;
            padding: initial;
            display: flex;
            font-weight: initial;
        }

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
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

    constructor(
        private readonly matDialog: MatDialog,
        private readonly service: DgpTableCellEditorService
    ) {
    }

    async openCellEditorDialog() {

        this.editorOpened.emit();

        const triggerButtonElement = this.buttonElRef.nativeElement as HTMLElement;
        const configureDialogWidth = +this.editDialogConfig.width.replace("px", "");
        const tableCellBoundingRect = this.buttonElRef.nativeElement.getBoundingClientRect() as ClientRect;

        const tableCellEditorSizes = computeTriggerElementSizes({
            triggerElementBoundingRect: tableCellBoundingRect, triggerButtonElement, window
        });

        const position = getDialogPositionFromTriggerElementSizes({
            triggerElementSizes: tableCellEditorSizes, configureDialogWidth, triggerButtonElement
        });

        this.dialogRef = this.matDialog.open(DgpTableCellEditorComponent, {
            ...this.editDialogConfig,
            position,
            backdropClass: "mat-dialog-no-backdrop",
            data: this.editorTemplate
        });
        this.service.cacheCurrentEditor(this.dialogRef);

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
