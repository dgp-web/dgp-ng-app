import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { timer } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class RoutingOverlayResolver  {

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
        return await timer(2000).pipe(map(() => null))
            .toPromise();
    }

}
