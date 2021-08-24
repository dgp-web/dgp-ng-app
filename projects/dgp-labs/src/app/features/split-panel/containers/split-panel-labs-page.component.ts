import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "labs-split-panel-labs-page",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Split panel
        </dgp-page-header>

        <dgp-split-panel orientation="horizontal">
            <dgp-split-panel-content size="20">
                <ng-template>
                    <div class="panel-content">
                        A
                        <dgp-dark-mode-toggle></dgp-dark-mode-toggle>
                    </div>
                </ng-template>
            </dgp-split-panel-content>

            <dgp-split-panel-content size="30">
                <ng-template>
                    B
                </ng-template>
            </dgp-split-panel-content>

            <dgp-split-panel-content size="50">
                <ng-template>

                    <dgp-split-panel orientation="vertical">
                        <dgp-split-panel-content size="50">
                            <ng-template>
                                <div class="list-01 dgp-drag-list"
                                     cdkDropList
                                     cdkDropListOrientation="horizontal"
                                     id="sourceList"
                                     #sourceList="cdkDropList"
                                     [cdkDropListData]="itemsFromList01"
                                     [cdkDropListConnectedTo]="['targetList']"
                                     (cdkDropListDropped)="drop($event)">
                                    <div *ngFor="let item of itemsFromList01"
                                         cdkDrag
                                         class="item dgp-drag-item">{{ item.title }}</div>
                                </div>
                            </ng-template>
                        </dgp-split-panel-content>

                        <dgp-split-panel-content size="50">
                            <ng-template>
                                <div class="list-02 dgp-drag-list"
                                     cdkDropList
                                     cdkDropListOrientation="horizontal"
                                     #targetList="cdkDropList"
                                     id="targetList"
                                     [cdkDropListData]="itemsFromList02"
                                     [cdkDropListConnectedTo]="['sourceList']"
                                     (cdkDropListDropped)="drop($event)">
                                    <div *ngFor="let item of itemsFromList02"
                                         cdkDrag
                                         class="item dgp-drag-item">{{ item.title }}</div>
                                </div>
                            </ng-template>
                        </dgp-split-panel-content>
                    </dgp-split-panel>

                </ng-template>
            </dgp-split-panel-content>
        </dgp-split-panel>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            height: 100%;
            overflow: auto;
        }

        .panel-content {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            overflow: auto;
        }

        .item {
            width: 100px;
            height: 100px;
            margin: 8px;
            border: 1px solid gray;
            cursor: move;
        }

        .list-01 {
            display: flex;
            flex-wrap: wrap;
            overflow: auto;
        }

        .list-02 {
            display: flex;
            flex-wrap: wrap;
            overflow: auto;
        }


    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitPanelLabsPageComponent {

    itemsFromList01 = [
        {title: "A"},
        {title: "B"},
        {title: "C"},
        {title: "D"},
    ];

    itemsFromList02 = [
        {title: "E"},
        {title: "F"},
        {title: "G"},
        {title: "H"},
    ];

    drop(event: CdkDragDrop<{ title: string; }[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
        }
    }
}
