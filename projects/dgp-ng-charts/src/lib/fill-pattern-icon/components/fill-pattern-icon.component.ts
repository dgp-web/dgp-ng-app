import { ChangeDetectionStrategy, Component, Inject, Input } from "@angular/core";
import { DgpView } from "dgp-ng-app";
import { FillPattern } from "../models";
import { getMaskIdForFillPattern } from "../functions";
import { idPrefixProvider } from "../../shared/id-prefix-provider.constant";
import { ID_PREFIX } from "../../shared/id-prefix-injection-token.constant";

@Component({
    selector: "dgp-fill-pattern-icon",
    template: `
        <svg>
            <defs dgpPatternAndMaskDefs></defs>
            <rect x="0"
                  y="0"
                  [attr.mask]="getMaskForFillPattern()"
                  [style.fill]="colorHex"
                  stroke-width="2"/>
        </svg>
    `,
    styles: [`
        :host {
            display: inline-block;
            width: 24px;
            height: 24px;
            margin-right: 8px;
        }

        svg {
            width: 100%;
            height: 100%;
        }

        rect {
            width: 100%;
            height: 100%;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        idPrefixProvider
    ]
})
export class DgpFillPatternIconComponent extends DgpView<FillPattern> {
    readonly fillPatternEnum = FillPattern;

    @Input()
    colorHex = "#666666";

    constructor(
        @Inject(ID_PREFIX)
        protected readonly idPrefix: string
    ) {
        super();
    }

    getMaskForFillPattern() {
        const maskId: string = getMaskIdForFillPattern(this.model);
        if (!maskId) return "";
        return "url(#" + this.idPrefix + "." + maskId + ")";
    }

}
