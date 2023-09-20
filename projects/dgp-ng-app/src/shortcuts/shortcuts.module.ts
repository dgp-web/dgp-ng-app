import { NgModule } from "@angular/core";
import { directives } from "./directives/directives";

@NgModule({
    imports: [],
    declarations: [
        ...directives
    ],
    exports: [
        ...directives
    ],
    providers: []
})
export class DgpShortcutsModule {
}
