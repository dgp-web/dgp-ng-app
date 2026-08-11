import { ChangeDetectionStrategy, Component, Inject, OnChanges, SimpleChanges } from "@angular/core";
import { FILE_VIEWER_CONFIG, FileViewerConfig } from "../models";
import { FileViewerComponentBase } from "./file-viewer.component-base";

@Component({
    selector: "dgp-file-viewer",
    template: `

@if (isKnownFileType) {
  @switch (fileItem.extension) {
    @case ('jpg') {
      <dgp-jpg-viewer
      [fileItem]="fileItem"></dgp-jpg-viewer>
    }
    @case ('pdf') {
      <dgp-pdf-viewer
      [fileItem]="fileItem"></dgp-pdf-viewer>
    }
    @case ('png') {
      <dgp-png-viewer
      [fileItem]="fileItem"></dgp-png-viewer>
    }
    @case ('svg') {
      <dgp-svg-viewer
      [fileItem]="fileItem"></dgp-svg-viewer>
    }
    @default {
      <dgp-fallback-file-viewer
      [fileItem]="fileItem"></dgp-fallback-file-viewer>
    }
  }
} @else {
  <dgp-dynamic-file-viewer [fileItem]="fileItem"></dgp-dynamic-file-viewer>
}


`,
    styles: [`
        :host {
            display: flex;
            flex-grow: 1;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class FileViewerComponent extends FileViewerComponentBase implements OnChanges {

    isKnownFileType: boolean;

    constructor(
        @Inject(FILE_VIEWER_CONFIG)
        private readonly config: FileViewerConfig
    ) {
        super();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.fileItem) {
            if (this.fileItem) {
                this.isKnownFileType = this.config.fileTypeViewerMap[this.fileItem.extension] === null
                    || this.config.fileTypeViewerMap[this.fileItem.extension] === undefined;
            }
        }
    }

}
