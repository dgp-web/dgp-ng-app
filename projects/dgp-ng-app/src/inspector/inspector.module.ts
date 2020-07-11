import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DgpInspectorSectionComponent } from "./components/inspector-section.component";

const components = [
    DgpInspectorSectionComponent
];

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
export class DgpInspectorModule {
}
