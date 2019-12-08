import { empty, forkJoin, from } from "rxjs";
import { catchError, defaultIfEmpty, switchMap, tap } from "rxjs/operators";
import { ClassProvider, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthenticateUserAction, RegisterAuthenticateErrorAction } from "../actions";
import { AuthenticationState, PostAuthenticationTask } from "../models";
import { AuthenticationApiClient } from "../api-clients";

export abstract class AuthenticationService<TUser> {

    abstract authenticate$(): Promise<void>;

    abstract registerPostAuthenticationTask(task: PostAuthenticationTask<TUser>): void;

}

@Injectable()
export class AuthenticationServiceImpl<TUser> implements AuthenticationService<TUser> {

    private readonly postAuthenticationTasks: PostAuthenticationTask<TUser>[] = [];

    constructor(private readonly store: Store<AuthenticationState>,
                private readonly authenticationApiClient: AuthenticationApiClient) {
    }

    authenticate$(): Promise<void> {

        return from(
            this.authenticationApiClient.authenticate$()
        )
            .pipe(
                tap(user => {
                    this.store.dispatch(new AuthenticateUserAction(user));
                }),
                switchMap(user => {

                    const requests$ = this.postAuthenticationTasks.map(task => {
                        return from(task(user));
                    });

                    return forkJoin(requests$);
                }),
                catchError((error: any) => {
                    this.store.dispatch(new RegisterAuthenticateErrorAction(error));
                    return empty();
                }),
                defaultIfEmpty(null)
            )
            .toPromise();
    }

    registerPostAuthenticationTask(task: PostAuthenticationTask<TUser>): void {
        this.postAuthenticationTasks.push(task);
    }

}

export const authenticationServiceProvider: ClassProvider = {
    provide: AuthenticationService,
    useClass: AuthenticationServiceImpl
};
