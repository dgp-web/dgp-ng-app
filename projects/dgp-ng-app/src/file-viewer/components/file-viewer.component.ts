import {
    ChangeDetectionStrategy,
    Component,
    ComponentFactoryResolver,
    Inject,
    Input,
    OnChanges,
    SimpleChanges,
    ViewContainerRef
} from "@angular/core";
import { FILE_VIEWER_CONFIG, FileItem, FileViewerConfig } from "../models";
import { ViewerComponentBase } from "./file-viewer.component-base";

@Component({
    selector: "dgp-file-viewer",
    template: ``,
    styles: [`
        :host {
            display: flex;
            flex-grow: 1;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileViewerComponent implements OnChanges {

    @Input()
    fileItem: FileItem;

    constructor(
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly viewContainerRef: ViewContainerRef,
        @Inject(FILE_VIEWER_CONFIG)
        private readonly config: FileViewerConfig
    ) {
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
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
            this.config.fileTypeViewerMap[fileType] ? this.config.fileTypeViewerMap[fileType] : this.config.fileTypeViewerMap.default
        );
        this.viewContainerRef.clear();
        const componentRef = this.viewContainerRef.createComponent(componentFactory);
        const viewerComponent = componentRef.instance as ViewerComponentBase;
        viewerComponent.fileItem = this.fileItem;
    }

    private clear() {
        this.viewContainerRef.clear();
    }
}
