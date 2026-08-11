import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, SimpleChanges } from "@angular/core";
import { Platform } from "@angular/cdk/platform";
import { FileViewerComponentBase } from "./file-viewer.component-base";

@Component({
    selector: "dgp-pdf-viewer",
    template: `

@if (platform.FIREFOX || platform.BLINK || platform.EDGE) {
  @if (platform.FIREFOX || platform.BLINK) {
    <object [attr.data]="fileItem.url | safe:'resourceUrl'"
      type="application/pdf"
      width="100%"
      height="100%">
      <dgp-fallback-file-viewer [fileItem]="fileItem"></dgp-fallback-file-viewer>
    </object>
  }
  @if (platform.EDGE) {
    <div [innerHTML]="edgeHTML | safe:'html'"
    class="edge-helper"></div>
  }
} @else {
  <dgp-fallback-file-viewer [fileItem]="fileItem"></dgp-fallback-file-viewer>
}


`,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            width: 100%;
            height: 100%;
        }

        .edge-helper {
            flex-grow: 1;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class PdfViewerComponent extends FileViewerComponentBase implements OnChanges {

    edgeHTML: any;

    constructor(
        public readonly platform: Platform,
        private readonly cd: ChangeDetectorRef
    ) {
        super();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.fileItem && this.platform.EDGE) {
            this.edgeHTML = `
                <embed src="${this.fileItem.url}"
                       type="application/pdf"
                       width="100%"
                       height="100%">
            `;
            this.cd.markForCheck();
        }
    }

}
