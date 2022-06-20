import { BehaviorSubject } from "rxjs";
import { debounceTime } from "rxjs/operators";

export async function waitForStableDOM$(htmlNode: Node, config = {
    stableTime: 250
}): Promise<void> {

    return new Promise((resolve, reject) => {

        const subject = new BehaviorSubject<void>(null);

        const init: MutationObserverInit = {attributes: true, childList: true, subtree: true};

        const callback: MutationCallback = (mutationsList, observer) => {
            for (const mutation of mutationsList) {
                subject.next();
            }
        };
        const obs = new MutationObserver(callback);

        subject.pipe(
            debounceTime(config.stableTime)
        ).subscribe(() => {
            obs.disconnect();
            resolve();
        });

        obs.observe(htmlNode, init);

    });

}
