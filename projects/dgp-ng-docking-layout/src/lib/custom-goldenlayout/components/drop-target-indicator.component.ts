import { Area } from "../../docking-layout/models";
import { dockingLayoutViewMap } from "../../docking-layout/views";

export class DropTargetIndicator {

    private readonly element: JQuery;

    constructor() {
        this.element = $(dockingLayoutViewMap.dropTargetIndicator.render());

        $(document.body)
            .append(this.element);
    }

    destroy() {
        this.element.remove();
    }

    highlightArea(area: Area) {
        this.element.css({
            left: area.x1,
            top: area.y1,
            width: area.x2 - area.x1,
            height: area.y2 - area.y1
        })
            .show();
    }

    hide() {
        this.element.hide();
    }

}
