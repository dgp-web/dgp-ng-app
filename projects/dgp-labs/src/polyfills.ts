import "core-js";
import "reflect-metadata";

import "zone.js/dist/zone";
import { NgElement, WithProperties } from "@angular/elements";

declare global {
    interface HTMLElementTagNameMap {
        "dgpw-empty-state": NgElement & WithProperties<{matIconName: string; title: string;}>;
    }
}
