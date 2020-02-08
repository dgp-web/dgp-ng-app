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
import { getDocumentSurrogateKey } from "./functions";

@Injectable()
export class ContentBlockEditorEffects {

    @Effect()
    readonly openAddDocumentDialog$ = this.actions$.pipe(
        ofType(openAddDocumentDialog),
        switchMap(() => {

            return this.matDialog
                .open<AddDocumentDialogComponent, null, DocumentCreationModel>(AddDocumentDialogComponent)
                .afterClosed()
                .toPromise();

        }),
        filter(x => x !== null && x !== undefined),
        switchMap(documentCreationModel => {

            return this.store.select(getAllDocuments)
                .pipe(
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
                                    [getDocumentSurrogateKey({
                                        documentTemplateId: documentCreationModel.documentTemplateId,
                                        documentNumber
                                    })]: {
                                        ...documentCreationModel,
                                        documentNumber
                                    }
                                },
                                sections: {
                                    [documentCreationModel.documentTemplateId + "." + documentNumber + "." + 1]: {
                                        label: "First section",
                                        documentNumber,
                                        documentTemplateId: documentCreationModel.documentTemplateId,
                                        position: 1,
                                        sectionNumber: 1
                                    }
                                },
                                contentBlocks: {
                                    [documentCreationModel.documentTemplateId + "." + documentNumber + "." + 1]: {
                                        label: "First section",
                                        documentNumber,
                                        documentTemplateId: documentCreationModel.documentTemplateId,
                                        position: 1,
                                        contentBlockNumber: 1,
                                        contentBlockTypeNumber: 1,
                                        content: "",
                                        sectionNumber: 1
                                    }
                                },
                                contentBlockTypes: {
                                    [documentCreationModel.documentTemplateId + "." + 1]: {
                                        matIconName: "description",
                                        position: 1,
                                        label: "Text block",
                                        documentTemplateId: documentCreationModel.documentTemplateId,
                                        contentBlockTypeNumber: 1,
                                        description: "Block of text"
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
