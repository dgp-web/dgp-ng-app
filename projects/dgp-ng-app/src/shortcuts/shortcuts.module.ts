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
export class DgpShortcutsModule {

    static forRoot(config: ShortcutConfig = defaultShortcutConfig): ModuleWithProviders<DgpShortcutsModule> {
        return {
            ngModule: DgpShortcutsModule,
            providers: [provideShortcutConfig(config)]
        };
    }

}
