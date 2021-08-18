import { NgModule } from "@angular/core";
import { DgpNegatePipe } from "./negate.pipe";

@NgModule({
    declarations: [
        DgpNegatePipe
    ],
    exports: [
        DgpNegatePipe
    ]
})
export class DgpNegatePipeModule {
}
