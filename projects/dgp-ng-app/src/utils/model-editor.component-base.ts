import { Directive, EventEmitter, Output } from "@angular/core";
import { DgpViewComponentBase } from "./view.component-base";

/**
 * Base class for classes for manipulating a model
 */
@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class DgpModelEditorComponentBase<TModel> extends DgpViewComponentBase<TModel> {

    @Output()
    readonly modelChange = new EventEmitter<TModel>();

    setModel(value: TModel) {
        this.model = value;
        this.modelChange.emit(this.model);
    }

    updateModel(value: Partial<TModel> | TModel) {

        if ((value !== null && typeof value === "object") || (this.model !== null && typeof this.model === "object")) {
            this.model = {
                ...this.model as any,
                ...value as any
            };
        } else {
            this.model = value as TModel;
        }

        this.modelChange.emit(this.model);

    }

}
