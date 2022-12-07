import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { InspectorConfig } from "../models/inspector-config.model";
import { inspectorDefaultConfig } from "../constants";
import { map } from "rxjs/operators";

@Injectable()
export class InspectorService {

    readonly config$ = new BehaviorSubject<InspectorConfig>(inspectorDefaultConfig);

    readonly fieldLabelThemeColor$ = this.config$.pipe(map(x => x.fieldLabelThemeColor));
    readonly maxContentWidth$ = this.config$.pipe(map(x => x.maxContentWidth));
    readonly responsive$ = this.config$.pipe(map(x => x.responsive));
    readonly showFieldDescriptions$ = this.config$.pipe(map(x => x.showFieldDescriptions));
    readonly showFieldIcons$ = this.config$.pipe(map(x => x.showFieldIcons));

    updateConfig(payload: Partial<InspectorConfig>) {
        this.config$.next({
            ...this.config$.value,
            ...payload
        });
    }

}
