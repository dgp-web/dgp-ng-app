import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { DocumentId } from "../models";
import { ContentBlockEditorState, contentBlockEditorStore } from "../store";
import { Store } from "@ngrx/store";

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

            this.store.dispatch(
                contentBlockEditorStore.actions.composeEntityActions({
                    select: {
                        documents: [
                            documentTemplateId + "." + documentNumber
                        ],
                        contentBlocks: []
                    }
                })
            );

        }

    }

}
