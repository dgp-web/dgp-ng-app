import { TemplateRef } from "@angular/core";
import { Observable } from "rxjs";

export interface ComponentDefinition<T = any> {
    template(): TemplateRef<T>;
}

export interface ContainerDefinition {

    onOpen: Observable<void>;

    onDestroy: Observable<void>;

    onHide: Observable<void>;

    onShow: Observable<void>;

    getElement(): any;


}

