import { TemplateRef } from "@angular/core";

export interface ComponentDefinition<T = any> {
    componentName?: string;

    template(): TemplateRef<T>;
}

export interface ContainerDefinition {
    getElement(): any;

    on(eventName: "open" | "destroy" | "hide" | "show", callback: () => void): void;
}

