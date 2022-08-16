import { NgModule } from "@angular/core";
import { components } from "./components/components";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { DgpSpacerModule } from "../spacer/spacer.module";
import { MatIconModule } from "@angular/material/icon";
import { directives } from "./directives/directives";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatSlideToggleModule,
        DgpSpacerModule,
        MatIconModule
    ],
    declarations: [
        ...components,
        ...directives
    ],
    exports: [
        ...components,
        ...directives
    ]
})
export class DgpInputModule {
}
