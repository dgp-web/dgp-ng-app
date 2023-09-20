import { ModuleWithProviders, NgModule } from "@angular/core";
import { directives } from "./directives/directives";
import { defaultShortcutConfig, provideShortcutConfig, ShortcutConfig } from "./models";

@NgModule({
    declarations: [
        ...directives
    ],
    exports: [
        ...directives
    ]
})
export class DgpShortcutModule {

    static forRoot(config: ShortcutConfig = defaultShortcutConfig): ModuleWithProviders<DgpShortcutModule> {
        return {
            ngModule: DgpShortcutModule,
            providers: [provideShortcutConfig(config)]
        };
    }

}
