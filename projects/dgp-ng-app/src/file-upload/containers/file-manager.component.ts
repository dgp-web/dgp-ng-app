import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, } from "@angular/core";

@Component({
    selector: "dgp-file-manager",
    template: `

    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex-grow: 1;
            width: 100%;
            height: 100%;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileManagerComponent implements AfterViewInit, OnDestroy {

    readonly dragOverHandler = (e) => {
        console.log("File(s) in drop zone");
        console.log(e);
        // Prevent default behavior (Prevent file from being opened)
        e.preventDefault();
    };

    readonly dropHandler = (e) => {
        console.log("File(s) dropped");
        console.log(e);
        // Prevent default behavior (Prevent file from being opened)
        e.preventDefault();
    };

    constructor(
        private readonly elementRef: ElementRef
    ) {
    }


    ngAfterViewInit(): void {
        document.querySelector(".cdk-overlay-backdrop").addEventListener("dragover", this.dragOverHandler);
        document.querySelector(".cdk-overlay-backdrop").addEventListener("drop", this.dropHandler);
    }

    ngOnDestroy(): void {
        document.querySelector(".cdk-overlay-backdrop").removeEventListener("dragover", this.dragOverHandler);
        document.querySelector(".cdk-overlay-backdrop").removeEventListener("drop", this.dropHandler);
    }

}
