import { Directive, Inject, Input } from "@angular/core";
import { Mutable } from "data-modeling";
import { ChartGridLineConfig } from "../../shared/models";
import { ID_PREFIX } from "../../shared/id-prefix-injection-token.constant";

@Directive()
// tslint:disable-next-line:directive-class-suffix
export class DgpPlotComponentBase implements Mutable<ChartGridLineConfig> {

    @Input()
    showYAxisGridLines = true;

    @Input()
    showXAxisGridLines = true;

    readonly dataAreaClipPath = "url(#" + this.idPrefix + ".dataAreaClipPath" + ")";
    readonly containerAreaClipPath = "url(#" + this.idPrefix + ".containerAreaClipPath" + ")";

    constructor(
        @Inject(ID_PREFIX)
        protected readonly idPrefix: string
    ) {
    }

}
