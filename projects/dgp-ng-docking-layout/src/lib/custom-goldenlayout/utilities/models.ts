import { TemplateRef } from "@angular/core";
import { Observable } from "rxjs";

export interface ComponentDefinition<T = any> {
    template(): TemplateRef<T>;
}

export interface ContainerDefinition {

    onHide: Observable<void>;
    
    onDestroy: Observable<void>;

    onShow: Observable<void>;

    getElement(): any;

    on(eventName: "open" | "destroy" | "hide" | "show", callback: () => void): void;

}

