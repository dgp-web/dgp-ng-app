import { NgModule } from "@angular/core";
import { components } from "./components/components";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { DgpSpacerModule } from "../spacer/spacer.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatSlideToggleModule,
        DgpSpacerModule
    ],
    declarations: [
        ...components
    ],
    exports: [
        ...components
    ]
})
export class DgpInputModule {
}
