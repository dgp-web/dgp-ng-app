import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DgpContainer } from "./container.component-base";

export abstract class DgpResolverBase<TState> extends DgpContainer<TState> implements Resolve<void> {

    abstract resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void>;

}
