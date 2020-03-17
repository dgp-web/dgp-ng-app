import { composeEntityActions, EntityTypeMap } from "entity-store";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";

export interface SelectEntityViaRouteResolverConfig<TEntityTypeMap extends EntityTypeMap> {
    readonly getNewEntitySurrogateKeyFromRoute: (route: ActivatedRouteSnapshot) => Promise<string>;
    readonly getOldEntitySurrogateKeyFromStore: () => Promise<string>;
    readonly entityName: keyof TEntityTypeMap;
}

export abstract class DgpSelectEntityViaRouteResolver<TEntityTypeMap extends EntityTypeMap> implements Resolve<void> {

    protected constructor(
        protected readonly store: Store<any>,
        private readonly config: SelectEntityViaRouteResolverConfig<TEntityTypeMap>
    ) {
    }

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {

        const newSelectionIdFromRoute = await this.config.getNewEntitySurrogateKeyFromRoute(route);
        const oldSelectionIdFromStore = await this.config.getOldEntitySurrogateKeyFromStore();

        if (!oldSelectionIdFromStore && !newSelectionIdFromRoute) {
            return;
        }

        if (oldSelectionIdFromStore === newSelectionIdFromRoute) {
            return;
        }

        this.store.dispatch(
            composeEntityActions({
                select: {
                    [this.config.entityName]: [newSelectionIdFromRoute]
                }
            })
        );

    }

}

