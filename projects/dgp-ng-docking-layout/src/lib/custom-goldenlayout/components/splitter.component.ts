import { dockingLayoutViewMap } from "../../docking-layout/views";
import { DragListenerDirective } from "./drag-listener.directive";
import { verticalClassName } from "../constants/class-names/vertical-class-name.constant";
import { horizontalClassName } from "../constants/class-names/horizontal-class-name.constant";
import { DockingLayoutService } from "../docking-layout.service";

export class SplitterComponent {

    readonly dragListener: DragListenerDirective;
    private readonly grabSize: number;
    readonly element: JQuery;

    constructor(
        private readonly dockingLayoutService: DockingLayoutService,
        private readonly isVertical: boolean,
        private readonly size: number,
        grabSize: number
    ) {
        this.grabSize = grabSize < size ? size : grabSize;

        this.element = this.createElement();

        this.dragListener = new DragListenerDirective();
        this.dragListener.initProgrammatically(this.element);
    }

    destroy() {
        this.element.remove();
    }

    private createElement() {
        const dragHandle = $(
            dockingLayoutViewMap.dragHandle.render()
        );
        const element = $(
            dockingLayoutViewMap.splitter.render()
        );
        element.append(dragHandle);

        const handleExcessSize = this.grabSize - this.size;
        const handleExcessPos = handleExcessSize / 2;

        if (this.isVertical) {
            dragHandle.css("top", -handleExcessPos);
            dragHandle.css("height", this.size + handleExcessSize);
            element.addClass(verticalClassName);
            element.height(this.size);
        } else {
            dragHandle.css("left", -handleExcessPos);
            dragHandle.css("width", this.size + handleExcessSize);
            element.addClass(horizontalClassName);
            element.width(this.size);
        }

        return element;
    }
}
