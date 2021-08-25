import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { createGuid } from "dgp-ng-app";

export interface SampleItem {
    readonly sampleItemId: string;
    readonly label: string;
}

export interface DragItem<TPayload> {
    readonly index: number;
    readonly payload: TPayload;
}

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
                                         [id]="item.sampleItemId"
                                         [cdkDropListData]="{payload:item,index:i}"
                                         (cdkDropListDropped)="drop($event)">
                                        <div cdkDrag
                                             class="item-content">
                                            <div class="drag-placeholder" *cdkDragPlaceholder></div>
                                            <div class="drag-preview" *cdkDragPreview>
                                                {{ item.label }}
                                            </div>
                                            {{ item.label }}
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
                                         [id]="item.sampleItemId"
                                         [cdkDropListData]="{payload:item,index:i}"
                                         (cdkDropListDropped)="drop($event)">
                                        <div cdkDrag
                                             class="item-content">
                                            <div class="drag-placeholder" *cdkDragPlaceholder></div>
                                            <div class="drag-preview" *cdkDragPreview>
                                                {{ item.label }}
                                            </div>
                                            {{ item.label }}
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
            position: relative;
            overflow: hidden;
        }

        .item-content {
            border: 1px solid gray;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }

        .drag-preview {
            border: 1px solid gray;
            display: block;
            width: 100px;
            height: 100px;
            overflow: hidden;
            color: white;
            background: gray;
        }

        .drag-placeholder {
            background: lightgray;
            border: dashed 2px darkslategrey;
            opacity: 0.5;
            width: 100%;
            height: 100%;
            position: absolute;
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

    itemsFromList01: Array<SampleItem> = [
        {sampleItemId: createGuid(), label: "A"},
        {sampleItemId: createGuid(), label: "B"},
        {sampleItemId: createGuid(), label: "C"},
        {sampleItemId: createGuid(), label: "D"},
    ];

    itemsFromList02 = [
        {sampleItemId: createGuid(), label: "E"},
        {sampleItemId: createGuid(), label: "F"},
        {sampleItemId: createGuid(), label: "G"},
        {sampleItemId: createGuid(), label: "H"},
    ];

    drop(event: CdkDragDrop<DragItem<SampleItem>>) {
        console.log(event);
        this.itemsFromList01[event.previousContainer.data.index] = event.container.data.payload;
        this.itemsFromList01[event.container.data.index] = event.previousContainer.data.payload;
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
