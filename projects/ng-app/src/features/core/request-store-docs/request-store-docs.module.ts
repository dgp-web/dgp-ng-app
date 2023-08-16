import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import * as containers from "./containers";
import { DocsPageModule } from "../../shared";
import { CommonModule } from "@angular/common";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatIconModule } from "@angular/material/icon";
import { DgpEmptyStateModule } from "dgp-ng-app";

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: "request-store",
            component: containers.RequestStoreDocsPageComponent
        }]),

        DocsPageModule,
        CommonModule,
        MatButtonModule,
        MatIconModule,
        DgpEmptyStateModule
    ],
    declarations: [
        containers.RequestStoreDocsPageComponent
    ]
})
export class RequestStoreDocsModule {
}
