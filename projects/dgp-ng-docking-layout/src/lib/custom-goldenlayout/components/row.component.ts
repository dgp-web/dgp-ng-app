import { ChangeDetectionStrategy, Component, Inject, Optional } from "@angular/core";
import { AbstractContentItemComponent } from "./abstract-content-item.component";
import { RowOrColumnComponentBase } from "./row-or-column.component";
import { DockingLayoutService } from "../docking-layout.service";
import { ITEM_CONFIG, ItemConfiguration } from "../types";

@Component({
    selector: "dgp-row",
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowComponent extends RowOrColumnComponentBase {

    constructor(
        public layoutManager: DockingLayoutService,
        @Inject(ITEM_CONFIG) config: ItemConfiguration,
        @Optional() parent: AbstractContentItemComponent
    ) {
        super(false, layoutManager, config, parent);
    }

}
