import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { DgpView } from "../../utils/view";
import { AttributeMetadata } from "data-modeling";
import { map } from "rxjs/operators";
import { notNullOrUndefined } from "../../utils/null-checking.functions";
import { observeAttribute$ } from "../../utils/observe-input";

@Component({
    selector: "dgp-input-length-info",
    template: `
        @if (hasMax$ | async) {
          {{model?.length || 0}}/{{metadata.max}}
        }`,
    styles: [`
        :host {
            font-size: smaller;
            opacity: 0.7;
            margin-left: 8px;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DgpInputLengthInfoComponent extends DgpView<string> {
    @Input()
    metadata: AttributeMetadata<string>;
    readonly metadata$ = observeAttribute$(this as DgpInputLengthInfoComponent, "metadata");

    readonly hasMax$ = this.metadata$.pipe(map(x => x && notNullOrUndefined(x.max)));

}
