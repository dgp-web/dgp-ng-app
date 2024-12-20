import { Directive, HostListener, Input } from "@angular/core";
import { DgpTableCellEditorService } from "../service/table-cell-editor.service";

@Directive({
    selector: "[dgpCloseTableCellEditor]",
    standalone: false
})
export class DgpCloseTableCellEditorDirective {

    @Input()
    disabled: boolean;

    constructor(
        private readonly service: DgpTableCellEditorService
    ) {
    }

    @HostListener("click")
    closeDialog() {
        if (this.disabled) return;

        this.service.closeCurrentEditor();
    }

}
