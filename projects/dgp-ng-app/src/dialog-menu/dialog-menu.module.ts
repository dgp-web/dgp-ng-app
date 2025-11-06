import { NgModule } from "@angular/core";
import { directives } from "./directives/directives";
import { components } from "./components/components";
import { CommonModule } from "@angular/common";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule
    ],
    declarations: [
        ...components,
        ...directives
    ],
    exports: [
        ...components,
        ...directives
    ],
    providers: []
})
export class DgpDialogMenuModule {
}
