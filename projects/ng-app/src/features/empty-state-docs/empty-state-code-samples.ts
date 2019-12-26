export const moduleImportCodeSample = `
import { DgpEmptyStateModule } from "dgp-ng-app";

// ...

@NgModule({
    imports: [
        DgpEmptyStateModule,
        // ...
    ]
})
export class FeatureModule {}
    `;

export const templateCodeSample = `
<div *ngIf="areDataAvailable; else emptyState"> Hello world </div>

<ng-template #emptyState>

    <dgp-empty-state title="No data available"
                     matIconName="mood_bad">
        Add some!
    </dgp-empty-state>

</ng-template>

    `;
