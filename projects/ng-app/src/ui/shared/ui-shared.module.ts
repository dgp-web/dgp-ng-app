import { NgModule } from "@angular/core";
import * as dgp from "dgp-ng-app";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatLegacyListModule as MatListModule } from "@angular/material/legacy-list";
import { MatIconModule } from "@angular/material/icon";

const sharedModules = [
    MatButtonModule,
    MatIconModule,
    MatListModule,
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
