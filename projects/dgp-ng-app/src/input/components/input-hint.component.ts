import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { AttributeMetadata } from "data-modeling";
import { DgpView } from "../../utils/view";

@Component({
    selector: "dgp-input-hint",
    template: `
        <dgp-spacer></dgp-spacer>
        
        @if (metadata?.type === 'string') {
          <dgp-input-length-info
            [model]="model"
          [metadata]="metadata"></dgp-input-length-info>
        }
        `,
    styles: [`
        :host {
            display: flex;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DgpInputHintComponent extends DgpView<any> {

    @Input()
    metadata: AttributeMetadata<any>;

}

