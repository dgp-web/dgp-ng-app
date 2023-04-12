import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { RowOrColumnComponentBase } from "./row-or-column.component";
import { ColumnConfiguration, ITEM_CONFIG, PARENT_ITEM_COMPONENT } from "../../types";
import { DockingLayoutService } from "../../docking-layout.service";
import { ColumnParentComponent, RowOrColumnParentComponent } from "../../models/row-parent-component.model";

@Component({
    selector: "dgp-column",
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnComponent extends RowOrColumnComponentBase {

    constructor(
        public dockingLayoutService: DockingLayoutService,
        @Inject(ITEM_CONFIG)
            config: ColumnConfiguration,
        @Inject(PARENT_ITEM_COMPONENT)
            parent: ColumnParentComponent
    ) {
        super(true, dockingLayoutService, config, parent as RowOrColumnParentComponent);
    }

}
