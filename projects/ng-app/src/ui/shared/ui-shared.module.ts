import { NgModule } from "@angular/core";
import * as dgp from "dgp-ng-app";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
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
