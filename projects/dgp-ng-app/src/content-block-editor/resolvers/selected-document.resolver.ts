import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { ContentBlockId, DocumentId } from "../models";
import { ContentBlockEditorState, contentBlockEditorStore } from "../store";
import { Store } from "@ngrx/store";
import { getContentBlockSurrogateKey } from "../functions";

@Injectable()
export class SelectedDocumentResolver implements Resolve<void> {

    constructor(
        private readonly store: Store<ContentBlockEditorState>
    ) {
    }

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {

        const documentTemplateId = route.params["documentTemplateId" as keyof DocumentId];

        if (!documentTemplateId) {

            this.store.dispatch(
                contentBlockEditorStore.actions.composeEntityActions({
                    select: {
                        documents: [],
                        contentBlocks: []
                    }
                })
            );

            return;

        } else {

            const documentNumber = route.params["documentNumber" as keyof DocumentId];
            const contentBlockNumber = route.params["contentBlockNumber" as keyof ContentBlockId];

            this.store.dispatch(
                contentBlockEditorStore.actions.composeEntityActions({
                    select: {
                        documents: [
                            documentTemplateId + "." + documentNumber
                        ],
                        contentBlocks: contentBlockNumber ? [
                            getContentBlockSurrogateKey({
                                documentTemplateId, documentNumber, contentBlockNumber
                            })
                        ] : []
                    }
                })
            );

        }

    }

}
