import { NgModule } from "@angular/core";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { MatLegacySelectModule as MatSelectModule } from "@angular/material/legacy-select";
import { RouterModule } from "@angular/router";
import { DgpInputFieldModule, DgpInspectorConfigModule, DgpInspectorModule } from "dgp-ng-app";
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
        MatSelectModule,
        DgpInputFieldModule
    ],
    declarations: [
        InspectorDocsPageComponent
    ]
})
export class InspectorDocsModule {
}
