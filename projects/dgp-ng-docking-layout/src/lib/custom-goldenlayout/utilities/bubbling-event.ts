export class BubblingEvent {

    isPropagationStopped = false;

    constructor(public name, public origin) {
    }

    stopPropagation() {
        this.isPropagationStopped = true;
    }

}
