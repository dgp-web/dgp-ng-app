import { dockingLayoutViewMap } from "../../docking-layout/views";

export class HeaderButtonComponent {
    private _header: any;
    private readonly element: any;
    private readonly _action: any;

    constructor(header, label, cssClass, action) {
        this._header = header;
        this.element = $(
            dockingLayoutViewMap.headerButton.render({
                label, cssClass
            })
        );
        this._header.on("destroy", this._$destroy, this);
        this._action = action;
        this.element.on("click touchstart", this._action);
        this._header.controlsContainer.append(this.element);
    }

    _$destroy() {
        this.element.off();
        this.element.remove();
    }
}
