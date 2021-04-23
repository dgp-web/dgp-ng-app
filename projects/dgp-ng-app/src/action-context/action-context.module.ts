import { NgModule } from "@angular/core";
import { DgpActionContextDirective } from "./directives/action-context.directive";

export const components = [];

export const directives = [
    DgpActionContextDirective
];

@NgModule({
    declarations: [
        ...components,
        ...directives
    ],
    exports: [
        ...components,
        ...directives
    ]
})
export class DgpActionContextModule {
}
