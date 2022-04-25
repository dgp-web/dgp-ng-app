import { ChangeDetectionStrategy, Component, Inject, InjectionToken } from "@angular/core";
import { dockingLayoutViewMap } from "../../docking-layout/views";

/*<li class="${model.cssClass}" title="${model.label}"></li>*/

export const HEADER_BUTTON_HEADER_REF = new InjectionToken("headerButtonHeaderRef");
export const HEADER_BUTTON_LABEL_REF = new InjectionToken("headerButtonLabelRef");
export const HEADER_BUTTON_CSS_CLASS_REF = new InjectionToken("headerButtonCssClassRef");
export const HEADER_BUTTON_ACTION_REF = new InjectionToken("headerButtonActionRef");

@Component({
    selector: "dgp-header-button",
    template: `

    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderButtonComponent {
    private _header: any;
    private readonly element: any;
    private readonly rawElement: any;
    private readonly _action: any;

    constructor(
        @Inject(HEADER_BUTTON_HEADER_REF)
            header,
        @Inject(HEADER_BUTTON_LABEL_REF)
            label,
        @Inject(HEADER_BUTTON_CSS_CLASS_REF)
            cssClass,
        @Inject(HEADER_BUTTON_ACTION_REF)
            action) {
        this._header = header;
        this.element = $(
            dockingLayoutViewMap.headerButton.render({
                label, cssClass
            })
        );
        this.rawElement = this.element[0];
        this._header.on("destroy", this.destroy, this);
        this._action = action;
        this.rawElement.addEventListener("click", this._action, {
            passive: true
        });
        this.rawElement.addEventListener("touchstart", this._action, {
            passive: true
        });
        this._header.controlsContainer.append(this.element);
    }

    destroy() {
        this.element.off();
        this.element.remove();
    }
}
