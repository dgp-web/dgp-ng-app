import { CdkDragDrop } from "@angular/cdk/drag-drop";
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
                                <div class="list-01"
                                     cdkDropListGroup>
                                    <div *ngFor="let item of itemsFromList01; let i=index;"
                                         cdkDropList
                                         cdkDropListOrientation="horizontal"
                                         class="item"
                                         [cdkDropListData]="{item:item,index:i}"
                                         (cdkDropListDropped)="drop($event)">
                                        <div cdkDrag
                                            class="item-content">
                                            <div class="item-content drag-placeholder" *cdkDragPlaceholder>Test</div>
                                            {{ item.title }}
                                        </div>
                                    </div>
                                </div>
                            </ng-template>
                        </dgp-split-panel-content>

                        <dgp-split-panel-content size="50">
                            <ng-template>
                                <div class="list-02"
                                     cdkDropListGroup>
                                    <div *ngFor="let item of itemsFromList02; let i=index;"
                                         cdkDropList
                                         cdkDropListOrientation="horizontal"
                                         class="item"
                                         [cdkDropListData]="{item:item,index:i}"
                                         (cdkDropListDropped)="drop($event)">
                                        <div cdkDrag
                                             class="item-content">
                                            <div class="item-content drag-placeholder" *cdkDragPlaceholder>Test</div>
                                            {{ item.title }}
                                        </div>
                                    </div>
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
            position:relative;
            overflow: hidden;
        }

        .item-content {
            width: 100%;
            height: 100%;
        }

        .list-01 {
            display: flex;
            flex-wrap: wrap;
            overflow: auto;
            height: 100%;
        }

        .list-02 {
            display: flex;
            flex-wrap: wrap;
            overflow: auto;
            height: 100%;
        }

        .drag-placeholder {
            background: #ccc;
            border: dotted 3px #999;
            min-height: 60px;
            transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
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

    drop(event: CdkDragDrop<{ item: { title: string; }; index: number; }>) {
        this.itemsFromList01[event.previousContainer.data.index] = event.container.data.item;
        this.itemsFromList01[event.container.data.index] = event.previousContainer.data.item;
        /* if (event.previousContainer === event.container) {
             moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
         } else {
             transferArrayItem(event.previousContainer.data,
                 event.container.data,
                 event.previousIndex,
                 event.currentIndex);
         }*/
    }
}
