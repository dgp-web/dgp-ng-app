import { Injectable } from "@angular/core";
import { ComponentKVS } from "../models/component-kvs.model";
import { ComponentConstructor } from "../models/component-constructor.model";
import { notNullOrUndefined } from "dgp-ng-app";

@Injectable()
export class ComponentRegistry {

    private components: ComponentKVS = {};

    hasComponent(componentKey: string): boolean {
        return notNullOrUndefined(this.components[componentKey]);
    }

    getComponent(componentKey: string): ComponentConstructor {
        return this.components[componentKey];
    }

    registerComponent(componentKey: string | string[], constructor: ComponentConstructor) {
        this.components[componentKey as string] = constructor;
    }

}
