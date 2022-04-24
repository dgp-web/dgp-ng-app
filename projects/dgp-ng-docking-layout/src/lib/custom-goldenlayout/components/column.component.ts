import { ChangeDetectionStrategy, Component, Inject, Optional } from "@angular/core";
import { AbstractContentItemComponent } from "./abstract-content-item.component";
import { RowOrColumnComponentBase } from "./row-or-column.component";
import { ITEM_CONFIG, ItemConfiguration } from "../types";
import { DockingLayoutService } from "../docking-layout.service";

@Component({
    selector: "dgp-column",
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnComponent extends RowOrColumnComponentBase {

    constructor(
        public layoutManager: DockingLayoutService,
        @Inject(ITEM_CONFIG) config: ItemConfiguration,
        @Optional() parent: AbstractContentItemComponent
    ) {
        super(true, layoutManager, config, parent);
    }

}
