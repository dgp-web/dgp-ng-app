import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { observeAttribute$ } from "../../utils/observe-input";
import { InspectorConfig } from "../models/inspector-config.model";
import { ThemePalette } from "@angular/material/core";
import { InspectorService } from "../services/inspector.service";

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
        this.fieldLabelThemeColor$.subscribe(fieldLabelThemeColor => {
            this.service.updateConfig({fieldLabelThemeColor});
        });

        this.maxContentWidth$.subscribe(maxContentWidth => {
            this.service.updateConfig({maxContentWidth});
        });

        this.responsive$.subscribe(responsive => {
            this.service.updateConfig({responsive});
        });

        this.showFieldDescriptions$.subscribe(showFieldDescriptions => {
            this.service.updateConfig({showFieldDescriptions});
        });

        this.showFieldIcons$.subscribe(showFieldIcons => {
            this.service.updateConfig({showFieldIcons});
        });
    }

}
