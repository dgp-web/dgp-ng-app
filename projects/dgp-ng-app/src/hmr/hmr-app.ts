import { ApplicationRef } from "@angular/core";
import { Store } from "@ngrx/store";
import { hotReload } from "./hmr.actions";
import { createNewHosts, removeNgStyles } from "@angularclass/hmr";
import { take } from "rxjs/operators";

export class DgpNgApp {

    constructor(public readonly appRef: ApplicationRef,
                protected readonly ngrxStore: Store<any>) {
    }

    //noinspection JSUnusedGlobalSymbols
    hmrOnInit(store: any) {
        if (!store || !store.rootState) {
            return;
        }
        if (store.rootState) {
            this.ngrxStore.dispatch(hotReload({ payload: store.rootState }));
        }

        Object.keys(store)
            .forEach(prop => delete store[prop]);
    }

    //noinspection JSUnusedGlobalSymbols
    hmrOnDestroy(store: any) {
        const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);

        store.disposeOldHosts = createNewHosts(cmpLocation);

        this.ngrxStore
            .pipe(take(1))
            .subscribe(s => store.rootState = s);

        let queryResults = document.querySelectorAll(".cdk-overlay-container");
        queryResults.forEach(x => {
            x.parentNode.removeChild(x);
        });

        queryResults = document.querySelectorAll(".cdk-visually-hidden");
        queryResults.forEach(x => {
            x.parentNode.removeChild(x);
        });

        removeNgStyles();
    }

    //noinspection JSUnusedGlobalSymbols
    hmrAfterDestroy(store: any) {
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
