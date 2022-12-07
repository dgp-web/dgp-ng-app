import { NgModule } from "@angular/core";
import { components } from "./components/components";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { DgpSpacerModule } from "../spacer/spacer.module";
import { MatIconModule } from "@angular/material/icon";
import { directives } from "./directives/directives";
import { DgpInspectorModule } from "../inspector/inspector.module";
import { MatListModule } from "@angular/material/list";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatSlideToggleModule,
        DgpSpacerModule,
        MatIconModule,
        DgpInspectorModule,
        MatListModule
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
export class DgpInputFieldModule {
}
