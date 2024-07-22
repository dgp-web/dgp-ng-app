import { NgModule } from "@angular/core";
import { authenticationReducer, authenticationStoreFeature, defaultRuntimeChecks, DgpRequestStoreModule } from "dgp-ng-app";
import { StoreModule } from "@ngrx/store";
import { appEntityStore } from "../../store";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { MatNativeDateModule } from "@angular/material/core";

@NgModule({
    imports: [
        NoopAnimationsModule,

        StoreModule.forRoot(appEntityStore.reducers, {
            runtimeChecks: defaultRuntimeChecks,
        }),
        StoreModule.forFeature(authenticationStoreFeature, authenticationReducer),
        DgpRequestStoreModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        MatNativeDateModule,

    ],
    declarations: [],
    exports: [],
    providers: []
})
export class AppTestingModule {
}
