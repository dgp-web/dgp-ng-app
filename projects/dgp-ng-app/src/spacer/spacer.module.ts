import { NgModule } from "@angular/core";
import * as components from "./components";

@NgModule({
    declarations: [
        components.SpacerComponent
    ],
    exports: [
        components.SpacerComponent
    ]
})
export class DgpSpacerModule {
}
