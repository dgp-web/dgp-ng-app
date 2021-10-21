import { Directive, Inject, Input } from "@angular/core";
import { FillPattern } from "../../fill-pattern-icon/models";
import { ID_PREFIX } from "../../shared/id-prefix-injection-token.constant";
import { getMaskIdForFillPattern } from "../../fill-pattern-icon/functions";

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class ShapeBaseComponent {

    readonly fillPatternEnum = FillPattern;

    @Input()
    width = 24;

    @Input()
    height = this.width;

    @Input()
    fillColor: string;

    @Input()
    fillPattern: FillPattern;

    constructor(
        @Inject(ID_PREFIX)
        protected readonly idPrefix: string
    ) {
    }

    getMaskForFillPattern() {
        if (!this.fillPattern) return "";

        const maskId: string = getMaskIdForFillPattern(this.fillPattern);
        if (!maskId) return "";
        return "url(#" + this.idPrefix + "." + maskId + ")";
    }

}
