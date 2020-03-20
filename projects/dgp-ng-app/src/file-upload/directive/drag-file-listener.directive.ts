import { Directive, ElementRef } from "@angular/core";
import { Store } from "@ngrx/store";
import { openFileManager } from "../actions";

@Directive({
    selector: "[dgpFileDragListener]"
})
export class DragFileListenerDirective {

    constructor(
        private readonly store: Store<any>,
        private readonly elementRef: ElementRef
    ) {

        function dragOverHandler(e) {
            e.preventDefault();
            store.dispatch(openFileManager());
        }

        this.elementRef.nativeElement.addEventListener("dragover", dragOverHandler);

    }

}
