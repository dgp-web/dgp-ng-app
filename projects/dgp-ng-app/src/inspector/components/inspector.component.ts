import { ChangeDetectionStrategy, Component, Injectable, Input } from "@angular/core";
import { observeAttribute$ } from "../../utils/observe-input";
import { BehaviorSubject } from "rxjs";
import { InspectorConfig } from "../models/inspector-config.model";
import { inspectorDefaultConfig } from "../constants";
import { map } from "rxjs/operators";
import { ThemePalette } from "@angular/material/core";

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

@Component({
    selector: "dgp-inspector",
    template: `
        <mat-list>
            <ng-content></ng-content>
        </mat-list>
    `,
    styles: [`
        :host {
            padding: 0;
            overflow: auto;
        }

        mat-list {
            padding: 0;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        InspectorService
    ]
})
export class InspectorComponent {

    @Input()
    responsive: boolean;

    @Input()
    fieldLabelThemeColor: ThemePalette;

    private readonly responsive$ = observeAttribute$(this as InspectorComponent, "responsive");
    private readonly fieldLabelThemeColor$ = observeAttribute$(this as InspectorComponent, "fieldLabelThemeColor");

    constructor(
        private readonly service: InspectorService
    ) {
        this.responsive$.subscribe(responsive => {
            this.service.updateConfig({responsive});
        });

        this.fieldLabelThemeColor$.subscribe(fieldLabelThemeColor => {
            this.service.updateConfig({fieldLabelThemeColor});
        });
    }

}
