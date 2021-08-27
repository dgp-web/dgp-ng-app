import { CdkDragDrop, transferArrayItem } from "@angular/cdk/drag-drop";
import { ChangeDetectionStrategy, Component } from "@angular/core";

export interface SampleItem {
    readonly sampleItemId: string;
    readonly label: string;
}

export interface DragItem<TPayload> {
    readonly index: number;
    readonly item: TPayload;
    readonly position?: "before" | "after";
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

                    <div class="dgp-drop-list"
                         cdkDropListGroup>
                        <div *ngFor="let item of itemsFromList01; let i = index"
                             class="dgp-drag"
                             cdkDropList
                             cdkDropListOrientation="horizontal"
                             [id]="item.sampleItemId"
                             [cdkDropListData]="{item: item, index: i}"
                             [cdkDropListConnectedTo]="items02"
                             (cdkDropListDropped)="onDrop($event)">
                            <mat-card cdkDrag
                                      class="dgp-drag-content">
                                <mat-card-title>{{ item.label }}</mat-card-title>
                            </mat-card>
                        </div>
                    </div>

                </ng-template>
            </dgp-split-panel-content>

            <dgp-split-panel-content size="50">
                <ng-template>

                    <dgp-split-panel orientation="vertical">
                        <dgp-split-panel-content size="50">
                            <ng-template>
                                <div class="dgp-drop-list"
                                     cdkDropListGroup>
                                    <ng-container *ngFor="let item of itemsFromList02; let i = index">

                                        <div class="dgp-drag"
                                             cdkDropList
                                             cdkDropListOrientation="horizontal"
                                             [id]="item.sampleItemId"
                                             [cdkDropListData]="{item: item, index: i}"
                                             [cdkDropListConnectedTo]="items01"
                                             (cdkDropListDropped)="onDrop($event)">
                                            <mat-card cdkDrag
                                                      class="dgp-drag-content">
                                                <div *cdkDragPlaceholder></div>
                                                <mat-card-title>{{ item.label }}</mat-card-title>
                                            </mat-card>
                                        </div>
                                    </ng-container>
                                </div>
                            </ng-template>
                        </dgp-split-panel-content>

                        <dgp-split-panel-content size="50">
                            <ng-template>
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
            position: relative;
        }

        .dgp-drop-list {
            display: flex;
            flex-wrap: wrap;
        }

        .dgp-drag {
            flex-grow: 1;
            width: 100px;
            height: 100px;
            max-width: 100px;
            max-height: 100px;
            flex-shrink: 0;
            display: flex;
        }

        .dgp-drag-content {
            width: 100px;
            height: 100px;
            justify-content: center;
            flex-shrink: 0;
            align-items: center;
            cursor: pointer;
        }

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitPanelLabsPageComponent {


    itemsFromList01: Array<SampleItem> = [
        {sampleItemId: "A", label: "A"},
        {sampleItemId: "B", label: "B"},
        {sampleItemId: "C", label: "C"},
        {sampleItemId: "D", label: "D"},
    ];

    items01 = this.itemsFromList01.map(x => x.sampleItemId);

    itemsFromList02 = [
        {sampleItemId: "E", label: "E"},
        {sampleItemId: "F", label: "F"},
        {sampleItemId: "G", label: "G"},
        {sampleItemId: "H", label: "H"},
    ];

    items02 = this.itemsFromList02.map(x => x.sampleItemId);

    onDrop(event: CdkDragDrop<DragItem<SampleItem>>): void {

        const collections = [this.itemsFromList01, this.itemsFromList02];

        /**
         * Determine the groups
         */
        const sourceArray = collections.find(x => x.includes(event.previousContainer.data.item));
        const targetArray = collections.find(x => x.includes(event.container.data.item));

        transferArrayItem(
            sourceArray, targetArray, event.previousContainer.data.index, event.container.data.index
        );

        /**
         * Recalculate keys
         */
        this.items01 = this.itemsFromList01.map(x => x.sampleItemId);
        this.items02 = this.itemsFromList02.map(x => x.sampleItemId);

    }

}
