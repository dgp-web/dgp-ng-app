import { Injectable } from "@angular/core";
import { ConfigurationError } from "../types";
import { ComponentDefinition, ContainerDefinition } from "../utilities/models";
import { KVS } from "entity-store";

export type ComponentConstructor = <T = any>(container: ContainerDefinition, component: ComponentDefinition<T>) => void;
export type ComponentKVS = KVS<ComponentConstructor>;

@Injectable()
export class ComponentRegistry {

    private components: ComponentKVS = {};

    hasComponent(componentKey: string): boolean {
        return this.components[componentKey] !== null && this.components[componentKey] !== undefined;
    }

    getComponentFactory(componentKey: string): ComponentConstructor {
        if (this.components[componentKey] === undefined) {
            throw new ConfigurationError("Unknown component '" + componentKey + "'");
        }

        return this.components[componentKey];
    }

    registerComponent(componentKey, constructor: ComponentConstructor) {
        if (typeof constructor !== "function") {
            throw new Error("Please register a constructor function");
        }

        if (this.components[componentKey] !== undefined) {
            throw new Error("Component " + componentKey + " is already registered");
        }

        this.components[componentKey] = constructor;
    }

}
