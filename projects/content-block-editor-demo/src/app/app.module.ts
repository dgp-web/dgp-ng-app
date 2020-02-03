import { ApplicationRef, NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { DgpNgAppModule, DgpContentBlockEditorModule, DgpNgApp } from "dgp-ng-app";
import { RouterModule } from "@angular/router";
import { Store } from "@ngrx/store";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        RouterModule.forRoot([{
            path: "",
            pathMatch: "full",
            redirectTo: "/content-block-editor"
        }, {
            path: "**",
            redirectTo: "/content-block-editor"
        }]),
        DgpNgAppModule.forRoot(() => {
                return {
                    appReducer: {}
                };
            }
        ),
        DgpContentBlockEditorModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule extends DgpNgApp {

    constructor(public readonly appRef: ApplicationRef,
                protected readonly ngrxStore: Store<any>) {
        super(appRef, ngrxStore);
    }

}
