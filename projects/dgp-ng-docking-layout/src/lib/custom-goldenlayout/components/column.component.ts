import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AbstractContentItemComponent } from "./abstract-content-item.component";

@Component({
    selector: "dgp-column",
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnComponent extends AbstractContentItemComponent {
}
