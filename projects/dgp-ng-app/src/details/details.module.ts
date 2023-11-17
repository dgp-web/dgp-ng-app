import { NgModule } from "@angular/core";
import { components } from "./components/components";
import { DgpExpansionToggleModule } from "../expansion-toggle/expansion-toggle.module";
import { DgpSpacerModule } from "../spacer/spacer.module";
import { MatIconModule } from "@angular/material/icon";
import { NgIf } from "@angular/common";

@NgModule({
    imports: [
        DgpExpansionToggleModule,
        DgpSpacerModule,
        MatIconModule,
        NgIf
    ],
    declarations: [
        ...components
    ],
    exports: [
        ...components
    ]
})
export class DgpDetailsModule {
}
