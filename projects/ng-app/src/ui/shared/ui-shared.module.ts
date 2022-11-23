import { NgModule } from "@angular/core";
import * as dgp from "dgp-ng-app";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacyListModule } from "@angular/material/legacy-list";

const sharedModules = [
    MatButtonModule,
    MatIconModule,
    MatLegacyListModule,
    MatToolbarModule,

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
