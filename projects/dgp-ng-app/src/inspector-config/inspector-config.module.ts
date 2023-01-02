import { NgModule } from "@angular/core";
import { components } from "./components/components";
import { DgpInspectorModule } from "../inspector/inspector.module";
import { NgIf } from "@angular/common";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";

@NgModule({
    imports: [
        DgpInspectorModule,
        NgIf,
        MatSlideToggleModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule
    ],
    declarations: [
        ...components
    ],
    exports: [
        ...components
    ]
})
export class DgpInspectorConfigModule {
}
