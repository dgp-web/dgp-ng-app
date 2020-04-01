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
})
export class DynamicFileViewerComponent implements OnChanges {

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
            this.config.fileTypeViewerMap[fileType.toLowerCase()] ? this.config.fileTypeViewerMap[fileType.toLowerCase()] : this.config.fileTypeViewerMap.default
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
