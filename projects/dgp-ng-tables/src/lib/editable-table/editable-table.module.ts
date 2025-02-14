import { NgModule } from "@angular/core";
import { components } from "./components/components";
import { AsyncPipe, NgForOf } from "@angular/common";

@NgModule({
    imports: [
        NgForOf,
        AsyncPipe
    ],
    declarations: [
        ...components
    ],
    exports: [
        ...components
    ],
    providers: []
})
export class DgpTableEditorModule {
}
