import "./polyfills";

import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";
import { bootloader, hmrModule } from "@angularclass/hmr";

if (environment.production) {
    enableProdMode();
}

export function main() {
    return platformBrowserDynamic()
        .bootstrapModule(AppModule)
        .then((ngModuleRef: any) => {
            const newHost = document.createElement("app-root");
            const body = document.querySelector("body");

            body.insertAdjacentElement("afterbegin", newHost);

            return hmrModule(ngModuleRef, module);
        })
        .catch(err => console.error(err));
}

bootloader(main);
