import { ClassProvider, Injectable } from "@angular/core";
import { InitializationService } from "dgp-ng-app";
import { AuthenticationResult } from "../../models";

@Injectable()
export class InitializationServiceImpl implements InitializationService {

    runPostAuthenticationTask$(user: AuthenticationResult): Promise<void> {
        console.log("Run tasks");
        return Promise.resolve();
    }

}

export const initializationServiceProvider: ClassProvider = {
    provide: InitializationService,
    useClass: InitializationServiceImpl
};
