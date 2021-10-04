import { NgModule } from "@angular/core";
import { components } from "./components/components";
import { DgpSVGSymbolsModule } from "../symbols/svg-symbol.module";
import { MatOptionModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
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
