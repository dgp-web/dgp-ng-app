import { NgModule } from "@angular/core";
import { components } from "./components/components";
import { DgpInputFieldModule, DgpSpacerModule } from "dgp-ng-app";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        DgpInputFieldModule,
        MatSlideToggleModule,
        FormsModule,
        CommonModule,
        DgpSpacerModule
    ],
    declarations: [
        ...components
    ],
    exports: [
        ...components
    ]
})
export class DgpImageConfigModule {
}
