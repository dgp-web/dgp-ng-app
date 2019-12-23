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
import { ScheduleRequestAction } from "dgp-ng-app";

const request$ = await Promise.resolve({});

const action = new ScheduleRequestAction({ request$ });

`;

export const hasPendingRequestsSelectorCodeSample = `
import { hasPendingRequestsSelector } from "dgp-ng-app";

// ...

readonly hasPendingRequests$ = this.store.select(
    hasPendingRequestsSelector
);

constructor(
    private readonly store: Store<AppState>
) {}

`;
