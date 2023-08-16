import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { DgpContainer } from "./container.component-base";
import { Directive } from "@angular/core";

@Directive()
export abstract class DgpResolverBase<TState> extends DgpContainer<TState>  {

    abstract resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void>;

}
