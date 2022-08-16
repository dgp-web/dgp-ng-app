import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { AttributeMetadata } from "data-modeling";
import { DgpView } from "../../utils/view";

@Component({
    selector: "dgp-input-info",
    template: `
        <dgp-input-error-info [model]="model"
                              [metadata]="metadata"></dgp-input-error-info>

        <dgp-spacer></dgp-spacer>

        <dgp-input-length-info [model]="model"
                               [metadata]="metadata"></dgp-input-length-info>
    `,
    styles: [`
        :host {
            display: flex;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DgpInputInfoComponent extends DgpView<any> {

    @Input()
    metadata: AttributeMetadata<any>;

}

