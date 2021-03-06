import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    SimpleChanges,
    ViewChild
} from "@angular/core";
import { timer } from "rxjs";
import hljs from "highlight.js";


@Component({
    selector: "dgp-docs-code-block",
    template: `
        <pre><code #codeHost
                   class="{{language}}">{{ code  }}</code></pre>
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

    @Input()
    language: "typescript" | "html" | "css" | "scss" = "typescript";

    @ViewChild("codeHost", {
        static: true
    }) codeHost: ElementRef;

    @Input()
    code: string;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["code" as keyof DocsCodeBlockComponent]) {
            if (this.code) {
                timer(0).subscribe(() => {
                    const el = this.codeHost.nativeElement;
                    hljs.highlightBlock(el);
                });
            } else {

            }
        }
    }


}
