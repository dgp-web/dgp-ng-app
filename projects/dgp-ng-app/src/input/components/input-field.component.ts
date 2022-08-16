import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { DgpView } from "../../utils/view";
import { AttributeMetadata } from "data-modeling";

@Component({
    selector: "dgp-input-field",
    template: `
        <dgp-inspector>
            <dgp-inspector-item [metadata]="metadata">
                <div class="input-slot">
                    <ng-content></ng-content>
                    <dgp-input-info [model]="model"
                                    [metadata]="metadata"></dgp-input-info>
                </div>
            </dgp-inspector-item>
        </dgp-inspector>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
        }

        .input-slot {
            display: flex;
            flex-direction: column;
            margin-left: 16px;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgpInputFieldComponent extends DgpView<any> {

    @Input()
    metadata: AttributeMetadata<any>;

}
