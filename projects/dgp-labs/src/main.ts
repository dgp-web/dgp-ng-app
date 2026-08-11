import "./polyfills";

import { environment } from "./environments/environment";
import { enableProdMode, provideZoneChangeDetection } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";
import { bootloader, hmrModule } from "@angularclass/hmr";

if (environment.production) {
    enableProdMode();
}

export function main() {
    return platformBrowserDynamic()
        .bootstrapModule(AppModule, { applicationProviders: [provideZoneChangeDetection()], })
        .then((ngModuleRef: any) => {
            return hmrModule(ngModuleRef, module);
        })
        .catch(err => console.error(err));
}

bootloader(main);
