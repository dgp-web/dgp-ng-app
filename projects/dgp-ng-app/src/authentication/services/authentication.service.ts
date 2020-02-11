import { empty, forkJoin, from } from "rxjs";
import { catchError, defaultIfEmpty, switchMap, tap } from "rxjs/operators";
import { ClassProvider, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { authenticateUser, registerAuthenticateError } from "../actions/authentication.actions";
import { AuthenticationApiClient } from "../api-clients/authentication.api-client";
import { PostAuthenticationTask } from "../models/post-authentication-task.model";
import { AuthenticationState } from "../models/authentication-result.model";

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
                    this.store.dispatch(authenticateUser({ user }));
                }),
                switchMap(user => {

                    const requests$ = this.postAuthenticationTasks.map(task => {
                        return from(task(user));
                    });

                    return forkJoin(requests$);
                }),
                catchError((error: any) => {
                    this.store.dispatch(registerAuthenticateError({ error }));
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
