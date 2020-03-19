import { Directive, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { openFileManager } from "../actions";
import { fromEvent, Subscription } from "rxjs";
import { filter, first, switchMap, tap } from "rxjs/operators";
import { isFileManagerOpen } from "../selectors";

@Directive({
    selector: "[dgpOpenFileManagerViaShortKey]"
})
export class OpenFileManagerViaShortKeyDirective implements OnDestroy {

    private readonly keyPressSubscription: Subscription;

    constructor(
        private readonly store: Store<any>
    ) {

        this.keyPressSubscription = fromEvent(document, "keydown").pipe(
            filter((x: KeyboardEvent) => x.keyCode === 70 && x.altKey),
            switchMap(() => this.store.select(isFileManagerOpen).pipe(first()).toPromise()),
            filter(x => !x),
            tap(() => this.store.dispatch(openFileManager()))
        ).subscribe();

    }

    ngOnDestroy(): void {
        if (!this.keyPressSubscription.closed) {
            this.keyPressSubscription.unsubscribe();
        }
    }

}
