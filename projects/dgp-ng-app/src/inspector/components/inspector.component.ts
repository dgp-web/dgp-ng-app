import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { observeAttribute$ } from "../../utils/observe-input";
import { InspectorConfig } from "../models/inspector-config.model";
import { ThemePalette } from "@angular/material/core";
import { InspectorService } from "../services/inspector.service";
import { filter } from "rxjs/operators";

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
            flex-shrink: 0;
        }

        /* TODO(mdc-migration): The following rule targets internal classes of list that may no longer apply for the MDC version. */
        mat-list {
            padding: 0;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        InspectorService
    ]
})
export class InspectorComponent implements InspectorConfig {

    @Input()
    fieldLabelThemeColor: ThemePalette;

    @Input()
    maxContentWidth: string;

    @Input()
    showFieldDescriptions: boolean | "onHover";

    @Input()
    showFieldIcons: boolean;

    @Input()
    responsive: boolean;

    private readonly fieldLabelThemeColor$ = observeAttribute$(this as InspectorComponent, "fieldLabelThemeColor");
    private readonly maxContentWidth$ = observeAttribute$(this as InspectorComponent, "maxContentWidth");
    private readonly responsive$ = observeAttribute$(this as InspectorComponent, "responsive");
    private readonly showFieldDescriptions$ = observeAttribute$(this as InspectorComponent, "showFieldDescriptions");
    private readonly showFieldIcons$ = observeAttribute$(this as InspectorComponent, "showFieldIcons");

    constructor(
        private readonly service: InspectorService
    ) {
        this.fieldLabelThemeColor$.pipe(filter(x => x !== undefined)).subscribe(fieldLabelThemeColor => {
            this.service.updateConfig({fieldLabelThemeColor});
        });

        this.maxContentWidth$.pipe(filter(x => x !== undefined)).subscribe(maxContentWidth => {
            this.service.updateConfig({maxContentWidth});
        });

        this.responsive$.pipe(filter(x => x !== undefined)).subscribe(responsive => {
            this.service.updateConfig({responsive});
        });

        this.showFieldDescriptions$.pipe(filter(x => x !== undefined)).subscribe(showFieldDescriptions => {
            this.service.updateConfig({showFieldDescriptions});
        });

        this.showFieldIcons$.pipe(filter(x => x !== undefined)).subscribe(showFieldIcons => {
            this.service.updateConfig({showFieldIcons});
        });
    }

}
