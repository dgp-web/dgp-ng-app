import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { openAddDocumentDialog } from "./actions";
import { filter, first, map, switchMap } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { AddDocumentDialogComponent } from "./containers/add-document-dialog.component";
import { DocumentCreationModel } from "./models";
import { ContentBlockEditorState, contentBlockEditorStore } from "./store";
import { Store } from "@ngrx/store";
import { getAllDocuments } from "./selectors";

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
        switchMap(documentCreationModel => {

            return this.store.select(getAllDocuments).pipe(
                first(),
                map(documents => {
                    const documentNumbers = documents.map(x => x.documentNumber);
                    documentNumbers.sort();
                    let documentNumber: number;

                    if (documentNumbers.length > 0) {
                        documentNumber = documentNumbers[documentNumbers.length - 1] + 1;
                    } else {
                        documentNumber = 1;
                    }

                    return contentBlockEditorStore.actions.composeEntityActions({
                        add: {
                            documents: {
                                [documentCreationModel.documentTemplateId + "." + documentNumber]: {
                                    ...documentCreationModel,
                                    documentNumber
                                }
                            }
                        }
                    });
                })
            );

        })
    );

    constructor(
        private readonly actions$: Actions,
        private readonly matDialog: MatDialog,
        private readonly store: Store<ContentBlockEditorState>
    ) {
    }

}
