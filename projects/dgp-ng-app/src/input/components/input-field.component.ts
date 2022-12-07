import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { DgpView } from "../../utils/view";
import { AttributeMetadata } from "data-modeling";
import { observeAttribute$ } from "../../utils/observe-input";
import { InspectorConfig } from "../../inspector/models/inspector-config.model";
import { ThemePalette } from "@angular/material/core";
import { InspectorService } from "../../inspector/services/inspector.service";
import { filter } from "rxjs/operators";

@Component({
    selector: "dgp-input-field",
    template: `
        <mat-list>
            <dgp-inspector-item [metadata]="metadata">
                <div class="input-with-hint">
                    <ng-content></ng-content>
                    <dgp-input-hint [model]="model"
                                    [metadata]="metadata"></dgp-input-hint>
                </div>
            </dgp-inspector-item>

            <dgp-input-error-info [model]="model"
                                  [metadata]="metadata"></dgp-input-error-info>

        </mat-list>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            padding: 0;
            overflow: auto;
        }

        .input-with-hint {
            display: flex;
            flex-direction: column;
            max-width: 320px;
            width: 100%;
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
export class DgpInputFieldComponent extends DgpView<any> implements InspectorConfig {

    @Input()
    metadata: AttributeMetadata<any>;

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

    private readonly fieldLabelThemeColor$ = observeAttribute$(this as DgpInputFieldComponent, "fieldLabelThemeColor");
    private readonly maxContentWidth$ = observeAttribute$(this as DgpInputFieldComponent, "maxContentWidth");
    private readonly responsive$ = observeAttribute$(this as DgpInputFieldComponent, "responsive");
    private readonly showFieldDescriptions$ = observeAttribute$(this as DgpInputFieldComponent, "showFieldDescriptions");
    private readonly showFieldIcons$ = observeAttribute$(this as DgpInputFieldComponent, "showFieldIcons");

    constructor(
        private readonly service: InspectorService
    ) {
        super();

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
