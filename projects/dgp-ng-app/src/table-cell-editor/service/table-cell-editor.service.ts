import { Injectable } from "@angular/core";
import { MatLegacyDialogRef as MatDialogRef } from "@angular/material/legacy-dialog";

@Injectable({
    providedIn: "root"
})
export class DgpTableCellEditorService {

    private currentEditor: MatDialogRef<any>;

    cacheCurrentEditor(editor: MatDialogRef<any>) {
        this.currentEditor = editor;
    }

    closeCurrentEditor() {
        if (!this.currentEditor) {
            console.warn("DgpTableCellEditorService.closeCurrentEditor has been called but no editor is currently open.");
        } else {
            this.currentEditor.close();
            this.currentEditor = null;
        }

    }

}
