import { Injectable } from "@angular/core";
import { ConfigurationError } from "../types";
import { ComponentKVS } from "../models/component-kvs.model";
import { ComponentConstructor } from "../models/component-constructor.model";

@Injectable()
export class ComponentRegistry {

    private components: ComponentKVS = {};

    hasComponent(componentKey: string): boolean {
        return this.components[componentKey] !== null && this.components[componentKey] !== undefined;
    }

    getComponent(componentKey: string): ComponentConstructor {
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
