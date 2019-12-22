import {
    Component,
    ChangeDetectionStrategy,
    Input,
    OnChanges,
    SimpleChanges,
    ViewChild,
    ElementRef
} from "@angular/core";

declare var hljs;

@Component({
    selector: "dgp-docs-code-block",
    template: `
        <pre><code #codeHost
                   [innerHTML]="code"
                   class="language-typescript"></code></pre>
    `,
    styles: [`
        :host {
            width: 100%;
            display: block;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsCodeBlockComponent implements OnChanges {

    @ViewChild("codeHost", {
        static: false
    }) codeHost: ElementRef;

    @Input()
    code: string;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["code" as keyof DocsCodeBlockComponent]) {
            if (this.code) {
                const el = this.codeHost.nativeElement;
                hljs.highlightBlock(el);
            } else {

            }
        }
    }


}
