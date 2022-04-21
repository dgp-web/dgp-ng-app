import { NgModule } from "@angular/core";
import { components } from "./components/components";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule,
        CommonModule
    ],
    declarations: [
        ...components
    ],
    exports: [
        ...components
    ]
})
export class DgpExpansionToggleModule {
}
