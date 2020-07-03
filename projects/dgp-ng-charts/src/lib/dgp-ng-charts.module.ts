import { NgModule } from "@angular/core";
import { components } from "./components";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ...components
    ],
    exports: [
        ...components
    ]
})
export class DgpNgChartsModule {
}
