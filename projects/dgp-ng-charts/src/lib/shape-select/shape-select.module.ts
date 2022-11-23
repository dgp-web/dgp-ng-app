import { NgModule } from "@angular/core";
import { components } from "./components/components";
import { DgpSVGSymbolsModule } from "../shapes/svg-shape.module";
import { MatLegacyOptionModule as MatOptionModule } from "@angular/material/legacy-core";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { FormsModule } from "@angular/forms";
import { MatLegacySelectModule as MatSelectModule } from "@angular/material/legacy-select";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        DgpSVGSymbolsModule,
        MatOptionModule,
        MatFormFieldModule,
        FormsModule,
        MatSelectModule,
        CommonModule
    ],
    declarations: [
        ...components
    ],
    exports: [
        ...components
    ]
})
export class DgpShapeSelectModule {
}
