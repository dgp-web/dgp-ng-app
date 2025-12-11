import { NgModule } from "@angular/core";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
    imports: [
        NoopAnimationsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterTestingModule,
        MatDialogModule,
    ]
})
export class DgpNgAppTestingModule {
}
