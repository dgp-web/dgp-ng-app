import { Directive, Inject, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { openFileManager } from "../actions";
import { fromEvent, Subscription } from "rxjs";
import { filter, first, switchMap, tap } from "rxjs/operators";
import { isFileManagerOpen } from "../selectors";
import { FILE_UPLOAD_CONFIG, FileUploadConfig } from "../models";

@Directive({
    selector: "[dgpOpenFileManagerViaShortKey]"
})
export class OpenFileManagerViaShortKeyDirective implements OnDestroy {

    private readonly keyPressSubscription: Subscription;

    constructor(
        private readonly store: Store<any>,
        @Inject(FILE_UPLOAD_CONFIG)
        private readonly moduleConfig: FileUploadConfig
    ) {

        this.keyPressSubscription = fromEvent(document, "keydown")
            .pipe(
                filter(this.moduleConfig.openFileManagerShortKeyFilter),
                switchMap(() => this.store.select(isFileManagerOpen)
                    .pipe(first())
                    .toPromise()),
                filter(x => !x),
                tap(() => this.store.dispatch(openFileManager({})))
            )
            .subscribe();

    }

    ngOnDestroy(): void {
        if (!this.keyPressSubscription.closed) {
            this.keyPressSubscription.unsubscribe();
        }
    }

}
