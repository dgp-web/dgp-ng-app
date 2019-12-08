import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { BroadcastState, getOwnBroadcastRoleSelector } from "../broadcast-store";
import { map } from "rxjs/operators";
import {BroadcastRole} from "../models";

@Injectable()
export class NoPeonGuard implements CanActivate {

    constructor(
        private readonly store: Store<BroadcastState>
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store.pipe(
            select(getOwnBroadcastRoleSelector),
            map((role: BroadcastRole) => {
                return role !== BroadcastRole.Peon;
            })
        );
    }

}
