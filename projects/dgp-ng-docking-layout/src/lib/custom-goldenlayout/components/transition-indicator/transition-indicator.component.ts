import * as template from "./transition-indicator.component.html";
import { LayoutManagerUtilities } from "../../utilities";

declare var $: any;

export class TransitionIndicatorComponent {
    private _element: any;
    private _toElement: null;
    private _fromDimensions: null;
    private _totalAnimationDuration: number;
    private _animationStartTime: null;

    constructor() {
        this._element = $(template);
        $(document.body)
            .append(this._element);

        this._toElement = null;
        this._fromDimensions = null;
        this._totalAnimationDuration = 200;
        this._animationStartTime = null;
    }

    destroy() {
        this._element.remove();
    }

    transitionElements(fromElement, toElement) {
        /**
         * TODO - This is not quite as cool as expected. Review.
         */
        return;
        this._toElement = toElement;
        this._animationStartTime = new Date();
        this._fromDimensions = this._measure(fromElement);
        this._fromDimensions.opacity = 0.8;
        this._element.show()
            .css(this._fromDimensions);
        new LayoutManagerUtilities().animFrame(() => this._nextAnimationFrame());
    }

    _nextAnimationFrame() {
        let toDimensions = this._measure(this._toElement),
            animationProgress = (new Date() - this._animationStartTime) / this._totalAnimationDuration,
            currentFrameStyles = {},
            cssProperty;

        if (animationProgress >= 1) {
            this._element.hide();
            return;
        }

        toDimensions.opacity = 0;

        for (cssProperty in this._fromDimensions) {
            currentFrameStyles[cssProperty] = this._fromDimensions[cssProperty] +
                (toDimensions[cssProperty] - this._fromDimensions[cssProperty]) *
                animationProgress;
        }

        this._element.css(currentFrameStyles);
        new LayoutManagerUtilities().animFrame(() => this._nextAnimationFrame());
    }

    _measure(element) {
        const offset = element.offset();

        return {
            left: offset.left,
            top: offset.top,
            width: element.outerWidth(),
            height: element.outerHeight()
        };
    }
}
