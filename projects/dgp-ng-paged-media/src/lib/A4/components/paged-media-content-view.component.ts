import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DgpView } from "dgp-ng-app";
import { HTMLPageContent } from "../../engine/models";

@Component({
    selector: "dgp-paged-media-content-view",
    template: `
        <ng-container *ngFor="let item of model.itemsOnPage">
            <ng-container [ngSwitch]="item.tagName">
                <p *ngSwitchCase="'P'"
                   [innerHTML]="item.innerHTML | safe:'html'"></p>

                <table *ngSwitchCase="'TABLE'"
                       [innerHTML]="item.innerHTML | safe:'html'"
                       [classList]="item.classList"></table>

                <h1 *ngSwitchCase="'H1'"
                    [innerHTML]="item.innerHTML | safe:'html'"></h1>
                <h2 *ngSwitchCase="'H2'"
                    [innerHTML]="item.innerHTML | safe:'html'"></h2>
                <h3 *ngSwitchCase="'H3'"
                    [innerHTML]="item.innerHTML | safe:'html'"></h3>
                <h4 *ngSwitchCase="'H4'"
                    [innerHTML]="item.innerHTML | safe:'html'"></h4>
                <h5 *ngSwitchCase="'H5'"
                    [innerHTML]="item.innerHTML | safe:'html'"></h5>
                <h6 *ngSwitchCase="'H6'"
                    [innerHTML]="item.innerHTML | safe:'html'"></h6>
                <div *ngSwitchCase="'DIV'"
                     [innerHTML]="item.innerHTML | safe:'html'"></div>
            </ng-container>
        </ng-container>
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgpPagedMediaContentViewComponent extends DgpView<HTMLPageContent> {

}
