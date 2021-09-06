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

    isModelDragged$(payload: WithDragContext): Observable<boolean> {
        return this.modelDragInfo$.pipe(
            map(x => {
                return notNullOrUndefined(x) && x.dragContext === payload.dragContext;
            })
        );
    }

}
