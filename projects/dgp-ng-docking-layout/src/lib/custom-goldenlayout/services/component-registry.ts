import { Injectable } from "@angular/core";
import { ConfigurationError } from "../types";
import { ComponentDefinition, ContainerDefinition } from "../utilities/models";

@Injectable()
export class ComponentRegistry {

    private components = {};

    getComponent(name) {
        if (this.components[name] === undefined) {
            throw new ConfigurationError("Unknown component '" + name + "'");
        }

        return this.components[name];
    }

    registerComponent(name, constructor: (container: ContainerDefinition, component: ComponentDefinition<any>) => void) {
        if (typeof constructor !== "function") {
            throw new Error("Please register a constructor function");
        }

        if (this.components[name] !== undefined) {
            throw new Error("Component " + name + " is already registered");
        }

        this.components[name] = constructor;
    }

}
