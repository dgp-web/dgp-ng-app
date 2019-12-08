import {
    ChangeDetectionStrategy,
    Component, ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    Output, TemplateRef,
    ViewChild,
    ViewEncapsulation
} from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DgpTableCelLEditorDirective } from "../../directives";

export interface TableCellEditorSizes {
    readonly offsetTop: number;
    readonly offsetLeft: number;
    readonly availableSpace: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
}

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

        mat-cell-dialog-editor {
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
    editDialogConfig: MatDialogConfig<any> = {
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
        read: TemplateRef, static: false
    })
    editorTemplate: TemplateRef<any>;

    @ViewChild("triggerButton", {
        read: ElementRef, static: false
    }) buttonElRef: ElementRef;

    constructor(private readonly matDialog: MatDialog) {
    }

    async openCellEditorDialog() {

        this.editorOpened.emit();

        const button = this.buttonElRef.nativeElement as HTMLElement;
        const width = +this.editDialogConfig.width.replace("px", "");
        const boundingClientRect = this.buttonElRef.nativeElement.getBoundingClientRect() as ClientRect;

        const sizes: TableCellEditorSizes = {
            offsetTop: (boundingClientRect.top + button.offsetHeight),
            offsetLeft: boundingClientRect.left,
            availableSpace: {
                left: boundingClientRect.left,
                right: window.innerWidth - (boundingClientRect.left),
                bottom: window.innerHeight - (boundingClientRect.top + button.offsetHeight),
                top: window.innerHeight - boundingClientRect.top
            }
        };

        const position = {
            top: sizes.offsetTop + "px",
            left: sizes.offsetLeft + "px",
            bottom: null,
            right: null
        };

        if (sizes.availableSpace.right < width && sizes.availableSpace.left >= width) {
            position.left = (boundingClientRect.right - width) + "px";
        }

        await this.matDialog.open(this.editorTemplate, {
            ...this.editDialogConfig,
            position,
            backdropClass: "mat-dialog-no-backdrop",
        }).afterClosed().toPromise();

        this.editorClosed.emit();
    }

}
