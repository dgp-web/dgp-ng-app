import { Injectable } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

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

        } else {
            this.currentEditor.close();
        }

        this.currentEditor?.close();
        this.currentEditor = null;
    }

}
