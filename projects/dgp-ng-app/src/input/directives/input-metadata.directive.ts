import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { AttributeMetadata } from "data-modeling";
import { notNullOrUndefined } from "../../utils/null-checking.functions";

@Directive({selector: "[dgpInputMetadata]"})
export class DgpInputMetadataDirective implements OnChanges {

    @Input()
    metadata: AttributeMetadata<any>;

    constructor(private readonly elementRef: ElementRef<HTMLInputElement>,
                private readonly renderer: Renderer2) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.metadata) {

            if (notNullOrUndefined(this.metadata)) {

                if (this.metadata.type === "string") {

                    if (notNullOrUndefined(this.metadata.max)) {
                        this.renderer.setAttribute(
                            this.elementRef.nativeElement,
                            "maxLength",
                            this.metadata.max.toString()
                        );
                    }

                    if (notNullOrUndefined(this.metadata.min)) {
                        this.renderer.setAttribute(
                            this.elementRef.nativeElement,
                            "minLength",
                            this.metadata.min.toString()
                        );
                    }

                }

                if (this.metadata.type === "number") {
                    if (notNullOrUndefined(this.metadata.max)) {
                        this.renderer.setAttribute(
                            this.elementRef.nativeElement,
                            "max",
                            this.metadata.max.toString()
                        );
                    }

                    if (notNullOrUndefined(this.metadata.min)) {
                        this.renderer.setAttribute(
                            this.elementRef.nativeElement,
                            "min",
                            this.metadata.min.toString()
                        );
                    }

                    if (notNullOrUndefined(this.metadata.step)) {
                        this.renderer.setAttribute(
                            this.elementRef.nativeElement,
                            "step",
                            this.metadata.step.toString()
                        );
                    }

                    this.renderer.setAttribute(
                        this.elementRef.nativeElement,
                        "type",
                        "number"
                    );
                }

            }

        }

    }

}
