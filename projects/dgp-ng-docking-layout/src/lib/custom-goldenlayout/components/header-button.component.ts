import { dockingLayoutViewMap } from "../../docking-layout/views";
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "dgp-header-button",
    template: `
        /*<li class="${model.cssClass}" title="${model.label}"></li>*/
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderButtonComponent {
    private _header: any;
    private readonly element: any;
    private readonly rawElement: any;
    private readonly _action: any;

    constructor(header, label, cssClass, action) {
        this._header = header;
        this.element = $(
            dockingLayoutViewMap.headerButton.render({
                label, cssClass
            })
        );
        this.rawElement = this.element[0];
        this._header.on("destroy", this._$destroy, this);
        this._action = action;
        this.rawElement.addEventListener("click", this._action, {
            passive: true
        });
        this.rawElement.addEventListener("touchstart", this._action, {
            passive: true
        });
        this._header.controlsContainer.append(this.element);
    }

    _$destroy() {
        this.element.off();
        this.element.remove();
    }
}
