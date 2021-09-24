import { NgModule } from "@angular/core";
import { components } from "./components/components";
import { CommonModule } from "@angular/common";
import { MatSelectModule } from "@angular/material/select";
import { DgpFillPatternIconModule } from "../fill-pattern-icon/fill-pattern-icon.module";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        MatSelectModule,
        DgpFillPatternIconModule,
        FormsModule
    ],
    declarations: [
        ...components
    ],
    exports: [
        ...components
    ]
})
export class DgpFillPatternSelectModule {
}
