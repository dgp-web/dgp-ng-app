import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionContextState, DgpContainer, getSelectedActionContext } from "dgp-ng-app";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";


@Component({
    selector: "dgp-action-context-labs-page",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Action-context
            <dgp-spacer></dgp-spacer>
            <dgp-page-header-context-actions>
                <button mat-icon-button>
                    <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button>
                    <mat-icon>save</mat-icon>
                </button>
            </dgp-page-header-context-actions>
        </dgp-page-header>

        <!--   <dgp-tile dgpActionContext
                     actionContextKey="My action context"
                     actionContextLabel="Key based"
                     label="Key based"
                     route="./"
                     description="String based context"
                     matIconName="edit"></dgp-tile>

           <dgp-tile dgpActionContext
                     [actionContextValue]="actionContextValue"
                     actionContextLabel="Value based"
                     label="Value based"
                     route="./"
                     description="Hash based context"
                     matIconName="edit"></dgp-tile>

           {{ selectedActionContext$ | async | json }}-->

        <cdk-virtual-scroll-viewport autosize
                                     #panel
                                     dgpResizeSensor
                                     (sizeChanged)="onSizeChanged(panel)"
                                     class="dgp-dynamic-virtual-scroll-viewport --with-flex-wrap-panel">
            <div *cdkVirtualFor="let item of items"
                 class="item">&nbsp;
            </div>
        </cdk-virtual-scroll-viewport>

    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            height: 100%;
            overflow: auto;
        }

        dgp-tile {
            display: block;
            width: 240px;
            height: 240px;
        }


        .item {
            width: 120px;
            height: 120px;
            background: gray;
            border: 1px solid cyan;
            margin: 4px;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionContextLabsPageComponent extends DgpContainer<ActionContextState> {
    readonly selectedActionContext$ = this.select(getSelectedActionContext);

    items = new Array(10000);

    actionContextValue = {
        label: "An object used as context",
        description: "Objects make for decent contexts as well"
    };

    onSizeChanged(panel: CdkVirtualScrollViewport) {
        console.log(panel);
        panel.checkViewportSize();
    }
}
