import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DgpView } from "dgp-ng-app";
import { HTMLPageContent } from "../../engine/models";

@Component({
    selector: "dgp-paged-media-content-view",
    template: `
        @for (item of model.itemsOnPage; track item) {
          @switch (item.tagName) {
            @case ('P') {
              <p
                [innerHTML]="item.innerHTML | safe:'html'"
              [classList]="item.classList"></p>
            }
            @case ('TABLE') {
              <table
                [innerHTML]="item.innerHTML | safe:'html'"
              [classList]="item.classList"></table>
            }
            @case ('H1') {
              <h1
                [innerHTML]="item.innerHTML | safe:'html'"
              [classList]="item.classList"></h1>
            }
            @case ('H2') {
              <h2
                [innerHTML]="item.innerHTML | safe:'html'"
              [classList]="item.classList"></h2>
            }
            @case ('H3') {
              <h3
                [innerHTML]="item.innerHTML | safe:'html'"
              [classList]="item.classList"></h3>
            }
            @case ('H4') {
              <h4
                [innerHTML]="item.innerHTML | safe:'html'"
              [classList]="item.classList"></h4>
            }
            @case ('H5') {
              <h5
                [innerHTML]="item.innerHTML | safe:'html'"
              [classList]="item.classList"></h5>
            }
            @case ('H6') {
              <h6
                [innerHTML]="item.innerHTML | safe:'html'"
              [classList]="item.classList"></h6>
            }
            @case ('DIV') {
              <div
                [innerHTML]="item.innerHTML | safe:'html'"
              [classList]="item.classList"></div>
            }
          }
        }
        `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DgpPagedMediaContentViewComponent extends DgpView<HTMLPageContent> {

}
