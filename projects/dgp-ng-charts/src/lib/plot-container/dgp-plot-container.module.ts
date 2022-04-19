import { NgModule } from "@angular/core";
import { components } from "./components/components";

@NgModule({
    imports: [],
    declarations: [
        ...components
    ],
    exports: [
        ...components
    ]
})
export class DgpPlotContainerModule {
}
