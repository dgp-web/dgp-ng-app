import { NgModule } from "@angular/core";
import { components } from "./components";

@NgModule({
    imports: [],
    declarations: [
        ...components
    ],
    exports: [
        ...components
    ]
})
export class DgpNgChartsModule {
}
