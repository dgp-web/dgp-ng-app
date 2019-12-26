export const moduleImportCodeSample = `
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { DgpRequestStoreModule } from "dgp-ng-app";

@NgModule({
    imports: [
        StoreModule.forRoot(...),
        EffectsModule.forRoot([...]),
        DgpRequestStoreModule,
    ]
})
export class AppStoreModule {}
`;

export const scheduleRequestActionCodeSample = `
import { scheduleRequest } from "dgp-ng-app";

const request$ = await Promise.resolve({});

const action = scheduleRequest({ request$ });

`;

export const hasPendingRequestsSelectorCodeSample = `
import { hasPendingRequests } from "dgp-ng-app";

// ...

readonly hasPendingRequests$ = this.store.select(
    hasPendingRequests
);

constructor(
    private readonly store: Store<AppState>
) {}

`;
