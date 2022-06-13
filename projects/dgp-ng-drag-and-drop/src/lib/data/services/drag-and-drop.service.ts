import { Injectable } from "@angular/core";
import { ModelDragInfo } from "../../models/model-drag-info.model";
import { BehaviorSubject, Observable } from "rxjs";
import { WithDragContext } from "../../models";
import { map } from "rxjs/operators";
import { notNullOrUndefined } from "dgp-ng-app";

@Injectable()
export class DgpDragAndDropService {

    private readonly modelDragInfo$ = new BehaviorSubject<ModelDragInfo<any>>(null);

    registerDragStart<TModel>(payload: ModelDragInfo<TModel>) {
        this.modelDragInfo$.next(payload);
    }

    registerDragEnd() {
        this.modelDragInfo$.next(null);
    }

    getDraggedModel$<TModel>(payload: WithDragContext): Observable<TModel> {
        return this.modelDragInfo$.pipe(
            map(x => {
                if (x && x.dragContext !== payload.dragContext) return null;

                return x ? x.model : null;
            })
        );
    }

    isModelDragged$(payload: WithDragContext): Observable<boolean> {
        return this.modelDragInfo$.pipe(
            map(x => {
                return notNullOrUndefined(x) && x.dragContext === payload.dragContext;
            })
        );
    }

    isContextDragged(payload: WithDragContext): boolean {
        return this.modelDragInfo$.value?.dragContext === payload.dragContext;
    }

}
