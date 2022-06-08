import { NgModule } from "@angular/core";
import { components } from "./components/components";


@NgModule({
    declarations: [
        ...components
    ],
    exports: [
        ...components
    ]
})
export class DgpPagedMediaA4Module {
}
