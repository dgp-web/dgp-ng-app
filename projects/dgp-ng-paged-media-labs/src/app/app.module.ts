import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { BlindTextComponent } from "./blind-text.component";
import { DgpPagedMediaA4Module } from "../../../dgp-ng-paged-media/src/lib/A4/paged-media-a4.module";
import { DgpBoxPlotModule, DgpConnectedScatterPlotModule } from "dgp-ng-charts";
import { BlindTableComponent } from "./blind-table.component";
import { SafePipeModule } from "dgp-ng-app";

@NgModule({
    declarations: [
        AppComponent,
        BlindTextComponent,
        BlindTableComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([]),
        DgpPagedMediaA4Module,
        DgpBoxPlotModule,
        DgpConnectedScatterPlotModule,
        SafePipeModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
