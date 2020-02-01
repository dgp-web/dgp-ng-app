import { first } from "rxjs/operators";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { cacheInitialUrl } from "../actions/authentication.actions";
import { getIsAuthenticatedSelector, hasCachedInitialUrlSelector } from "../selectors/authentication.selectors";
import { AuthenticationState } from "../models/authentication-result.model";

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(
        private readonly store: Store<AuthenticationState>,
        private readonly router: Router
    ) {
    }

    async canActivate(route: ActivatedRouteSnapshot,
                      state: RouterStateSnapshot): Promise<boolean> {

        const hasInitialUrl = await this.store.pipe(
            select(hasCachedInitialUrlSelector),
            first()
        )
            .toPromise();

        if (!hasInitialUrl) {
            this.store.dispatch(cacheInitialUrl({ initialUrl: state.url }));
        }

        return this.store.pipe(
            select(getIsAuthenticatedSelector),
            first()
        )
            .toPromise();

    }

}
