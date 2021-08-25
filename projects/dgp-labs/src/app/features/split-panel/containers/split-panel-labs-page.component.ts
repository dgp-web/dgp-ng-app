import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { ChangeDetectionStrategy, Component } from "@angular/core";

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
                    <div style="display: flex; flex-wrap: wrap;"
                         cdkDropListGroup>
                        <div *ngFor="let item of itemsFromList01; let index = index"
                             style="flex-grow: 1; width: 100px; height: 100px; max-width: 100px; max-height: 100px; flex-shrink: 0; display: flex;"
                             cdkDropList
                             cdkDropListOrientation="horizontal"
                             [cdkDropListData]="index"
                             (cdkDropListDropped)="drop0r1z3($event)">
                            <mat-card cdkDrag
                                      style="width: 100px; height: 100px; justify-content: center; flex-shrink: 0; align-items: center; cursor: pointer;">
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
                                <!-- <div class="list-01"
                                      cdkDropListGroup>
                                     <div *ngFor="let item of itemsFromList01; let i=index;"
                                          cdkDropList
                                          cdkDropListOrientation="horizontal"
                                          class="item"
                                          [id]="item.sampleItemId"
                                          [cdkDropListConnectedTo]="['target']"
                                          [cdkDropListData]="{payload:item,index:i}"
                                          (cdkDropListDropped)="dropOnList01($event)">
                                         <div cdkDrag
                                              class="item-content">
                                             <div class="drag-placeholder" *cdkDragPlaceholder></div>
                                             <div class="drag-preview" *cdkDragPreview>
                                                 {{ item.label }}
                                             </div>
                                             {{ item.label }}
                                         </div>
                                     </div>
                                 </div>-->
                            </ng-template>
                        </dgp-split-panel-content>

                        <dgp-split-panel-content size="50">
                            <ng-template>
                                <div class="panel-content">

                                    <!--<div class="drop-zone"
                                         cdkDropList
                                         id="target"
                                         [cdkDropListConnectedTo]="items01"
                                         [cdkDropListData]="doneItems"
                                         (cdkDropListDropped)="dropOnList03($event)">
                                        <div cdkDrag
                                             [cdkDragDisabled]="true"
                                             class="item-content">
                                            &nbsp;
                                            <div class="drag-placeholder" *cdkDragPlaceholder>Test placeholder</div>
                                        </div>
                                    </div>-->

                                    <!--  <div class="list-02"
                                           cdkDropListGroup>
                                          <ng-container *ngFor="let item of itemsFromList02; let i=index;">

                                              <div cdkDropList
                                                   cdkDropListOrientation="horizontal"
                                                   class="item"
                                                   [id]="item.sampleItemId"
                                                   [cdkDropListData]="{payload:item,index:i}"
                                                   (cdkDropListDropped)="dropOnList02($event)">
                                                  <div cdkDrag
                                                       class="item-content">
                                                      <div class="drag-placeholder" *cdkDragPlaceholder></div>
                                                      <div class="drag-preview" *cdkDragPreview>
                                                          {{ item.label }}
                                                      </div>
                                                      {{ item.label }}
                                                  </div>
                                              </div>

                                              <div cdkDropList
                                                   cdkDropListOrientation="horizontal"
                                                   class="item-ghost"
                                                   [id]="item.sampleItemId"
                                                   [cdkDropListData]="{payload:item,index:i}"
                                                   (cdkDropListDropped)="dropOnList02Placeholder($event)">
                                                  <div cdkDrag
                                                       class="item-content-ghost">
                                                      <div class="drag-placeholder" *cdkDragPlaceholder></div>

                                                  </div>
                                              </div>

                                          </ng-container>
                                      </div>-->
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
            position: relative;
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

    doneItems = [];

    items02 = this.itemsFromList02.map(x => x.sampleItemId);

    drop0r1z3(event: CdkDragDrop<number>): void {
        moveItemInArray(
            this.itemsFromList01,
            event.previousContainer.data,
            event.container.data
        );
    }

}
