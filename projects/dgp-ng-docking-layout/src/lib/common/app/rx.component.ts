import { Subscription } from "rxjs";

/**
 * A light-weight base class for component-oriented applications
 * that leverage reactivate extensions.
 */
export class RxComponent {

    protected subscriptions = new Array<Subscription>();

    unsubscribe(): void {
        this.subscriptions
            .filter(x => !x.closed)
            .forEach(x => x.unsubscribe());
    }

}
