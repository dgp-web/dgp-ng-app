import { NgModule } from "@angular/core";
import * as mat from "@angular/material";
import * as dgp from "dgp-ng-app";

const sharedModules = [
    mat.MatButtonModule,
    mat.MatIconModule,
    mat.MatListModule,
    mat.MatToolbarModule,

    dgp.DgpEmptyStateModule
];

@NgModule({
    imports: [
        ...sharedModules
    ],
    exports: [
        ...sharedModules
    ]
})
export class UiSharedModule {
}
