import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AbstractContentItemComponent } from "./abstract-content-item.component";

@Component({
    selector: "dgp-row",
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowComponent extends AbstractContentItemComponent {
}
