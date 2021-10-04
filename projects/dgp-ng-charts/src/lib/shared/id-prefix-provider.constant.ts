import { FactoryProvider } from "@angular/core";
import { ID_PREFIX } from "./id-prefix-injection-token.constant";
import { createIdPrefix } from "./create-id-prefix.function";

export const idPrefixProvider: FactoryProvider = {
    provide: ID_PREFIX,
    useFactory: createIdPrefix
};
