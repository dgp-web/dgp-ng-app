import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { DgpNgAppModule, DgpContentBlockEditorModule } from "dgp-ng-app";
import { RouterModule } from "@angular/router";

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
export class AppModule {
}
