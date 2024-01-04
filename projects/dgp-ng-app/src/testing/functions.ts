import { MatDialogRef } from "@angular/material/dialog";
import { of } from "rxjs";

export function createTestMatDialogRef<T, TResult>(dialogResult: TResult): MatDialogRef<T, TResult> {
    return {
        afterClosed: () => of(dialogResult)
    } as unknown as MatDialogRef<T, TResult>;
}
