import { Inject, Injectable, Optional } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { InspectorConfig } from "../models/inspector-config.model";
import { DEFAULT_INSPECTOR_CONFIG, inspectorDefaultConfig } from "../constants";
import { map } from "rxjs/operators";
import { notNullOrUndefined } from "../../utils/null-checking.functions";
import { THEME_SWITCHER_CONFIG, ThemeSwitcherConfig, ThemeSwitcherState } from "../../theme-switcher/models";
import { Store } from "@ngrx/store";
import { getCurrentInspectorConfig } from "../../theme-switcher/selectors";

@Injectable()
export class InspectorService {

    readonly config$ = new BehaviorSubject<InspectorConfig>(inspectorDefaultConfig);

    readonly fieldLabelThemeColor$ = this.config$.pipe(map(x => x.fieldLabelThemeColor));
    readonly maxContentWidth$ = this.config$.pipe(map(x => x.maxContentWidth));
    readonly responsive$ = this.config$.pipe(map(x => x.responsive));
    readonly showFieldDescriptions$ = this.config$.pipe(map(x => x.showFieldDescriptions));
    readonly showFieldIcons$ = this.config$.pipe(map(x => x.showFieldIcons));

    constructor(
        @Optional()
        @Inject(DEFAULT_INSPECTOR_CONFIG)
        private readonly payload: InspectorConfig,
        @Optional()
        @Inject(THEME_SWITCHER_CONFIG)
        private readonly themeSwitcherConfig: ThemeSwitcherConfig,
        private readonly store: Store<ThemeSwitcherState>
    ) {
        if (notNullOrUndefined(payload)) this.config$.next(payload);

        if (themeSwitcherConfig?.components.includes("inspector")) {
            this.store.select(getCurrentInspectorConfig).subscribe(this.config$);
        }
    }

    updateConfig(payload: Partial<InspectorConfig>) {
        this.config$.next({
            ...this.config$.value,
            ...payload
        });
    }

}
