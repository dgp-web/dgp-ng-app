import { AfterViewInit, Directive, ElementRef, Inject, Renderer2 } from "@angular/core";
import { THEME_SWITCHER_CONFIG, ThemeSwitcherConfig } from "../models";
import { OverlayContainer } from "@angular/cdk/overlay";

@Directive({selector: "[dgpCompactThemeHost]"})
export class DgpCompactThemeHostDirective implements AfterViewInit {

    constructor(
        private readonly elRef: ElementRef,
        private readonly renderer: Renderer2,
        @Inject(THEME_SWITCHER_CONFIG)
        private readonly config: ThemeSwitcherConfig,
        private readonly overlayContainer: OverlayContainer
    ) {
    }

    ngAfterViewInit(): void {
        this.renderer.addClass(this.elRef.nativeElement, this.config.compactThemeClassName);
        this.overlayContainer.getContainerElement()
            .classList
            .add(this.config.compactThemeClassName);
    }
}
