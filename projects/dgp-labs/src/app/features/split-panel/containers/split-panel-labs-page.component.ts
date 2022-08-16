import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AttributeMetadata } from "data-modeling";

export interface SampleItem {
    readonly sampleItemId: string;
    readonly label: string;
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

                        <dgp-input-field [model]="stringInputModel"
                                         [metadata]="stringInputMetadata">

                            <input [ngModel]="stringInputModel"
                                   (ngModelChange)="stringInputModel = $event"
                                   dgpInputMetadata
                                   [metadata]="stringInputMetadata">

                        </dgp-input-field>

                        <dgp-input-field [model]="numberInputModel"
                                         [metadata]="numberInputMetadata">

                            <input [ngModel]="numberInputModel"
                                   (ngModelChange)="numberInputModel = $event"
                                   dgpInputMetadata
                                   [metadata]="numberInputMetadata">

                        </dgp-input-field>

                    </div>
                </ng-template>
            </dgp-split-panel-content>

            <dgp-split-panel-content size="30">
                <ng-template>

                    <div class="list">
                        <div *ngFor="let item of items01"
                             class="item"
                             dgpDraggable
                             dragContext="default"
                             [model]="item"
                             dgpDropzone
                             (modelDropped)="onModelDropped($event)">
                            {{ item.label }}
                        </div>
                    </div>

                </ng-template>
            </dgp-split-panel-content>

            <dgp-split-panel-content size="50">
                <ng-template>

                    <dgp-split-panel orientation="vertical">
                        <dgp-split-panel-content size="50">
                            <ng-template>

                                <div class="list">
                                    <div *ngFor="let item of items02"
                                         class="item"
                                         dgpDraggable
                                         dragContext="default"
                                         [model]="item"
                                         dgpDropzone
                                         (modelDropped)="onModelDropped($event)">
                                        {{ item.label }}
                                    </div>
                                    <dgp-dropzone dragContext="default"
                                                  (modelDropped)="onModelDropped($event)">
                                        <ng-container dgp-drop-indicator>
                                            Drop me here!!!
                                        </ng-container>
                                    </dgp-dropzone>
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

        .list {
        }

        .item {
            width: 100px;
            height: 100px;
            border: 1px solid mediumpurple;
            text-align: center;
            vertical-align: middle;
        }

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitPanelLabsPageComponent {

    stringInputModel: string;
    stringInputMetadata: AttributeMetadata<string> = {
        type: "string",
        min: 4,
        max: 64,
        icon: "label",
        label: "Title",
        placeholder: "No title set",
        description: "The name of this item in a very long description. This needs to break correctly.",
        isRequired: true
    };

    numberInputModel: number;
    numberInputMetadata: AttributeMetadata<number> = {
        type: "number",
        min: -10,
        max: 17,
        icon: "list",
        label: "Value",
        description: "A demo for a numeric input"
    };


    booleanInputModel: number;
    booleanInputMetadata: AttributeMetadata<boolean> = {
        type: "boolean",
        label: "On?",
        icon: "info"
    };

    items01: Array<SampleItem> = [
        {sampleItemId: "A", label: "A"},
        {sampleItemId: "B", label: "B"},
        {sampleItemId: "C", label: "C"},
        {sampleItemId: "D", label: "D"},
    ];

    items02 = [
        {sampleItemId: "E", label: "E"},
        {sampleItemId: "F", label: "F"},
        {sampleItemId: "G", label: "G"},
        {sampleItemId: "H", label: "H"},
    ];

    onModelDropped(item: SampleItem) {
        console.log(item);
    }
}
