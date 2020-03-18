import { Directive, ElementRef } from "@angular/core";
import { Store } from "@ngrx/store";
import { openFileManagerOverlay } from "dgp-ng-app/file-upload/actions";

@Directive({
    selector: "[dgpFileDragListener]"
})
export class DragFileListenerDirective {

    constructor(
        private readonly store: Store<any>,
        private readonly elementRef: ElementRef
    ) {

        function dragOverHandler(e) {
            console.log("File(s) in drop zone");
            console.log(e);
            // Prevent default behavior (Prevent file from being opened)
            e.preventDefault();
            store.dispatch(openFileManagerOverlay());
        }

        function dropHandler(e) {
            console.log("File(s) dropped");
            console.log(e);
            // Prevent default behavior (Prevent file from being opened)
            e.preventDefault();
        }

        this.elementRef.nativeElement.addEventListener("dragover", dragOverHandler);

        document.querySelector("body").addEventListener("drop", dropHandler);
    }

}
