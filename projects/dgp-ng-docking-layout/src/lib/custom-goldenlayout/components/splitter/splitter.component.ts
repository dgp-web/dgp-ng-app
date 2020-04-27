import * as splitterTemplate from "./splitter.component.html";
import * as dragHandleTemplate from "../drag-handle/drag-handle.component.html";
import { DragListenerDirective } from "../drag-listener";

export class SplitterComponent {

    private isVertical: boolean;
    private grabSize: number;
    private element: any;
    _dragListener: DragListenerDirective;

    constructor(
        private readonly isVertical: boolean,
        private readonly size: number,
        grabSize: number
    ) {
        this.grabSize = grabSize < size ? size : grabSize;

        this.element = this.createElement();
        this._dragListener = new DragListenerDirective( this.element );
    }

    on( event, callback, context ) {
        this._dragListener.on( event, callback, context );
    }

    _$destroy() {
        this.element.remove();
    }

    private createElement() {
        const dragHandle = $( dragHandleTemplate );
        const element    = $( splitterTemplate );
        element.append(dragHandle);

        const handleExcessSize = this.grabSize - this.size;
        const handleExcessPos  = handleExcessSize / 2;

        if ( this.isVertical ) {
            dragHandle.css( "top", -handleExcessPos );
            dragHandle.css( "height", this.size + handleExcessSize );
            element.addClass( "lm_vertical" );
            element[ "height" ]( this.size );
        } else {
            dragHandle.css( "left", -handleExcessPos );
            dragHandle.css( "width", this.size + handleExcessSize );
            element.addClass( "lm_horizontal" );
            element[ "width" ]( this.size );
        }

        return element;
    }
}