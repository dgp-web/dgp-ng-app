import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    OnChanges,
    SimpleChanges,
    ViewContainerRef
} from "@angular/core";
import { FILE_VIEWER_CONFIG, FileItem, FileViewerConfig } from "../models";
import { FileViewerComponentBase } from "./file-viewer.component-base";

@Component({
    selector: "dgp-dynamic-file-viewer",
    template: ``,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            width: 100%;
            height: 100%;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DynamicFileViewerComponent extends FileViewerComponentBase implements OnChanges {

    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        @Inject(FILE_VIEWER_CONFIG)
        private readonly config: FileViewerConfig
    ) {
        super();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.fileItem) {
            if (this.fileItem) {
                this.loadComponent(this.fileItem);
            } else {
                this.clear();
            }
        }
    }

    private loadComponent(fileItem: FileItem) {
        const fileType = fileItem.extension;
        const componentFactory = this.config.fileTypeViewerMap[fileType.toLowerCase()] ? this.config.fileTypeViewerMap[fileType.toLowerCase()] : this.config.fileTypeViewerMap.default;
        this.viewContainerRef.clear();
        const componentRef = this.viewContainerRef.createComponent(componentFactory as any);
        const viewerComponent = componentRef.instance as FileViewerComponentBase;
        viewerComponent.fileItem = this.fileItem;
    }

    private clear() {
        this.viewContainerRef.clear();
    }

}
