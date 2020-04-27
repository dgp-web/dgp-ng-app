import { DragProxy } from "../drag-proxy/drag-proxy.component";
import { LayoutManagerUtilities } from "../../utilities";
import { RxComponent, Vector2 } from "@dgp/common";
import { DragListenerDirective } from "../drag-listener";

/**
 * Allows for any DOM item to create a component on drag
 * start tobe dragged into the Layout
 *
 * @param {jQuery element} element
 * @param {Object} itemConfig the configuration for the contentItem that will be created
 * @param {LayoutManager} layoutManager
 *
 * @constructor
 */
export class DragSourceComponent extends RxComponent {

    private dragListener = null;

    constructor(
        private readonly element,
        private readonly itemConfig,
        private readonly layoutManager
    ) {
        super();

        this.createDragListener();
    }

    /**
     * Called initially and after every drag
     *
     * @returns {void}
     */
    private createDragListener() {
        if ( this.dragListener !== null ) {
            this.dragListener.destroy();
        }

        this.dragListener = new DragListenerDirective( this.element );

        const dragStartSubscription = this.dragListener
            .dragStart$
            .subscribe(this.onDragStart);

        this.subscriptions.push(dragStartSubscription);

        const dragStopSubscription = this.dragListener
            .dragStop$
            .subscribe(() => this.createDragListener());

        this.subscriptions.push(dragStopSubscription);
    }

    /**
     * Callback for the DragListener's dragStart event
     *
     * @param   {int} x the x position of the mouse on dragStart
     * @param   {int} y the x position of the mouse on dragStart
     *
     * @returns {void}
     */
    private onDragStart = (coordinates: Vector2) => {
        let itemConfig = this.itemConfig;
        if ( new LayoutManagerUtilities().isFunction( itemConfig ) ) {
            itemConfig = itemConfig();
        }
        const contentItem = this.layoutManager._$normalizeContentItem( $.extend( true, {}, itemConfig ) ),
            dragProxy = new DragProxy( coordinates, this.dragListener, this.layoutManager, contentItem, null );

        this.layoutManager.transitionIndicator.transitionElements( this.element, dragProxy.$element );
    }
}