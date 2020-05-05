import { dockingLayoutViewMap } from "../../../docking-layout/views";

export class DropTargetIndicator {

    element;

    constructor() {
        this.element = $(dockingLayoutViewMap.dropTargetIndicator.render());
        $(document.body)
            .append(this.element);
    }

    destroy() {
        this.element.remove();
    }

    highlight(x1, y1, x2, y2) {
        this.highlightArea({x1, y1, x2, y2});
    }

    highlightArea(area) {
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
