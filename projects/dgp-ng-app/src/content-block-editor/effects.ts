import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { openAddDocumentDialog } from "./actions";
import { filter, map, switchMap } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { AddDocumentDialogComponent } from "./containers/add-document-dialog.component";
import { DocumentCreationModel } from "./models";
import { ContentBlockEditorState, contentBlockEditorStore } from "./store";
import { Store } from "@ngrx/store";

@Injectable()
export class ContentBlockEditorEffects {

    @Effect()
    readonly openAddDocumentDialog$ = this.actions$.pipe(
        ofType(openAddDocumentDialog),
        switchMap(() => {

            return this.matDialog
                .open<AddDocumentDialogComponent, null, DocumentCreationModel>(AddDocumentDialogComponent)
                .afterClosed().toPromise();

        }),
        filter(x => x !== null && x !== undefined),
        map(documentCreationModel => {
            return contentBlockEditorStore.actions.composeEntityActions({
                add: {
                    documents: {
                        [documentCreationModel.documentTemplateId + "." + 1]: {
                            ...documentCreationModel,
                            documentNumber: 1
                        }
                    }
                }
            });
        })
    );

    constructor(
        private readonly actions$: Actions,
        private readonly matDialog: MatDialog,
        private readonly store: Store<ContentBlockEditorState>
    ) {
    }

}
