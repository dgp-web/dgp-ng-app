import { NgModule } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { RouterModule } from "@angular/router";
import { DgpInspectorConfigModule, DgpInspectorModule } from "dgp-ng-app";
import { DocsPageModule } from "../../shared";
import { InspectorDocsPageComponent } from "./containers/inspector-docs-page.component";

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: "inspector",
            component: InspectorDocsPageComponent
        }]),
        DocsPageModule,
        DgpInspectorModule,
        DgpInspectorConfigModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
    ],
    declarations: [
        InspectorDocsPageComponent
    ]
})
export class InspectorDocsModule {
}
