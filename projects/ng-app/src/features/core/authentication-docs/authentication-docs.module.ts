import { NgModule } from "@angular/core";
import * as components from "./containers";
import { RouterModule } from "@angular/router";
import { DocsPageModule } from "../../shared";

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: "authentication",
            component: components.AuthenticationDocsPageComponent
        }]),

        DocsPageModule
    ],
    declarations: [
        components.AuthenticationDocsPageComponent
    ]
})
export class AuthenticationDocsModule {
}
