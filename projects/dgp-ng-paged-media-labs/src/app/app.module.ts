import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { BlindTextComponent } from "./blind-text.component";

@NgModule({
    declarations: [
        AppComponent,
        BlindTextComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([])
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
