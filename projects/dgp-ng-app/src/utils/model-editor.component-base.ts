import { EventEmitter, Input, Output } from "@angular/core";
import * as _ from "lodash";

/**
 * Base class for classes for manipulating a model
 */
export abstract class DgpModelEditorComponentBase<TModel> {

    protected modelValue: TModel;

    @Input()
    get model(): TModel {
        return this.modelValue;
    }

    set model(value: TModel) {

        if (_.isEqual(value, this.modelValue)) { return; }

        this.modelValue = value;

    }

    @Output()
    readonly modelChange = new EventEmitter<TModel>();

    setModel(value: TModel) {
        this.model = value;
        this.modelChange.emit(this.model);
    }

    updateModel(value: Partial<TModel>) {

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
