import { Subscription } from "rxjs";
import { Directive } from "@angular/core";

/**
 * A light-weight base class for component-oriented applications
 * that leverage reactivate extensions.
 */
@Directive()
// tslint:disable-next-line:directive-class-suffix
export class RxComponent {

    protected subscriptions: Subscription[] = [];

    unsubscribe(): void {
        this.subscriptions
            .filter(x => !x.closed)
            .forEach(x => x.unsubscribe());
    }

}
