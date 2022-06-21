import { NgModule } from "@angular/core";
import { components } from "./components/components";
import { CommonModule } from "@angular/common";
import { SafePipeModule } from "dgp-ng-app";


@NgModule({
    declarations: [
        ...components
    ],
    imports: [
        CommonModule,
        SafePipeModule
    ],
    exports: [
        ...components
    ]
})
export class DgpPagedMediaA4Module {
}
