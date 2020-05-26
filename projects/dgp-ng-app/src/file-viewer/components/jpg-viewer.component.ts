import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FileViewerComponentBase } from "./file-viewer.component-base";
import { Platform } from "@angular/cdk/platform";

@Component({
    selector: "dgp-jpg-viewer",
    template: `
        <img *ngIf="!isTrident; else fallback"
             [src]="fileItem.url | safe:'url'"
             class="image"
             alt="{{ fileItem.fileName }}">
        <ng-template #fallback>
            <div class="trident-container">
                <img [src]="fileItem.url | safe:'url'"
                     class="trident-image"
                     alt="{{ fileItem.fileName }}">
            </div>
        </ng-template>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            width: 100%;
            height: 100%;
        }

        .image {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }

        .trident-container {
            display: flex;
            overflow: auto;
            flex-shrink: 0;
        }

        .trident-image {
            margin: auto;
            flex-shrink: 0;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JpgViewerComponent extends FileViewerComponentBase {

    readonly isTrident = this.platform.TRIDENT;

    constructor(
        private readonly platform: Platform
    ) {
        super();
    }

}
