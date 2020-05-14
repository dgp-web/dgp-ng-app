import { TemplateRef } from "@angular/core";

export interface ComponentDefinition<T> {
    template(): TemplateRef<T>;
}

export interface ContainerDefinition {
    getElement(): any;
    on(eventName: "open" | "destroy", callback: () => void): void;
}

