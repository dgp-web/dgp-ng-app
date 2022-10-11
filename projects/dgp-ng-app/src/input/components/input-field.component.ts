import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { DgpView } from "../../utils/view";
import { AttributeMetadata } from "data-modeling";

@Component({
    selector: "dgp-input-field",
    template: `
        <dgp-inspector>
            <dgp-inspector-item [metadata]="metadata"
                                [responsive]="responsive">
                <div class="input-with-hint">
                    <ng-content></ng-content>
                    <dgp-input-hint [model]="model"
                                    [metadata]="metadata"></dgp-input-hint>
                </div>
            </dgp-inspector-item>

            <dgp-input-error-info [model]="model"
                                  [metadata]="metadata"></dgp-input-error-info>

        </dgp-inspector>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
        }

        .input-with-hint {
            display: flex;
            flex-direction: column;
            max-width: 320px;
            width: 100%;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgpInputFieldComponent extends DgpView<any> {

    @Input()
    metadata: AttributeMetadata<any>;

    @Input()
    responsive: boolean;

}
