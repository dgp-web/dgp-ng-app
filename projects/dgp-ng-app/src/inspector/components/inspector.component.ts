import { ChangeDetectionStrategy, Component, Injectable, Input } from "@angular/core";
import { observeAttribute$ } from "../../utils/observe-input";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class InspectorService {

    readonly responsive$ = new BehaviorSubject<boolean>(null);

}

@Component({
    selector: "dgp-inspector",
    template: `
        <mat-list>
            <ng-content></ng-content>
        </mat-list>
    `,
    styles: [`
        :host {
            padding: 0;
            overflow: auto;
        }

        mat-list {
            padding: 0;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        InspectorService
    ]
})
export class InspectorComponent {

    @Input()
    responsive: boolean;

    private readonly responsive$ = observeAttribute$(this as InspectorComponent, "responsive");

    constructor(
        private readonly service: InspectorService
    ) {
        this.responsive$.subscribe(responsive => {
            this.service.responsive$.next(responsive);
        });
    }

}
