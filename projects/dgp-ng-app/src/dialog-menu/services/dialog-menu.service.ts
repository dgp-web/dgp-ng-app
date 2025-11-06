import { Injectable } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Injectable({
    providedIn: "root"
})
export class DgpDialogMenuService {

    private currentDialogMenu: MatDialogRef<any>;

    cacheCurrentDialogMenu(editor: MatDialogRef<any>) {
        this.currentDialogMenu = editor;
    }

    closeCurrentDialogMenu() {
        if (!this.currentDialogMenu) {
            console.warn("DgpDialogMenuService.closeCurrentDialogMenu has been called but a dialog is currently open.");
        } else {
            this.currentDialogMenu.close();
            this.currentDialogMenu = null;
        }

    }

}
