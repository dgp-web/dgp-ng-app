import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import * as containers from "./containers";
import { DocsPageModule } from "../shared";

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: "request-store",
            component: containers.RequestStoreDocsPageComponent
        }]),

        DocsPageModule
    ],
    declarations: [
        containers.RequestStoreDocsPageComponent
    ]
})
export class RequestStoreDocsModule {
}
