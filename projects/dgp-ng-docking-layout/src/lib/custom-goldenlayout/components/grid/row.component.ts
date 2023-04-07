import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { RowOrColumnComponentBase } from "./row-or-column.component";
import { DockingLayoutService } from "../../docking-layout.service";
import { ITEM_CONFIG, PARENT_ITEM_COMPONENT, RowConfiguration } from "../../types";
import { RowOrColumnParentComponent, RowParentComponent } from "../../models/row-parent-component.model";

@Component({
    selector: "dgp-row",
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowComponent extends RowOrColumnComponentBase {

    constructor(
        public dockingLayoutService: DockingLayoutService,
        @Inject(ITEM_CONFIG)
            config: RowConfiguration,
        @Inject(PARENT_ITEM_COMPONENT)
            parent: RowParentComponent
    ) {
        super(false, dockingLayoutService, config, parent as RowOrColumnParentComponent);
    }

}
