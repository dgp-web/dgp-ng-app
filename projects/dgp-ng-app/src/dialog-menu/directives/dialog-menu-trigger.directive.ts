import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, TemplateRef } from "@angular/core";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { computeTriggerElementSizes, getDialogPositionFromTriggerElementSizes } from "../../table-cell-editor/functions";
import { DgpDialogMenuComponent } from "../components/dialog-menu.component";
import { DgpDialogMenuService } from "../services/dialog-menu.service";


@Directive({selector: "[dgpDialogMenuTrigger]"})
export class DgpDialogMenuTriggerDirective {

    @Input()
    dialogConfig: MatDialogConfig = {
        width: "240px"
    };

    @Output()
    readonly dialogMenuOpened = new EventEmitter();

    @Output()
    readonly dialogMenuClosed = new EventEmitter();

    @Input()
    disabled: boolean;

    @Input()
    templateRef: TemplateRef<any>;

    private dialogRef: MatDialogRef<any>;

    constructor(
        private readonly triggerElRef: ElementRef,
        private readonly matDialog: MatDialog,
        private readonly service: DgpDialogMenuService
    ) {
    }

    @HostListener("click", ["$event"])
    async openDialogMenu() {

        if (this.disabled) {
            return;
        }

        this.dialogMenuOpened.emit();

        const triggerButtonElement = this.triggerElRef.nativeElement as HTMLElement;
        const configureDialogWidth = +this.dialogConfig.width.replace("px", "");
        const triggerBoundingClientRect = this.triggerElRef.nativeElement.getBoundingClientRect() as ClientRect;

        const sizes = computeTriggerElementSizes({
            triggerElementBoundingRect: triggerBoundingClientRect, triggerButtonElement, window
        });

        const position = getDialogPositionFromTriggerElementSizes({
            triggerElementSizes: sizes, configureDialogWidth, triggerButtonElement
        });

        this.dialogRef = this.matDialog.open(DgpDialogMenuComponent, {
            ...this.dialogConfig,
            position,
            backdropClass: "mat-dialog-no-backdrop",
            data: this.templateRef
        });
        this.service.cacheCurrentDialogMenu(this.dialogRef);

        await this.dialogRef.afterClosed().toPromise();

        this.dialogRef = null;
        this.dialogMenuClosed.emit();
    }

    closeMenuDialog() {
        if (this.dialogRef) {
            this.dialogRef.close();
        }
    }
}
