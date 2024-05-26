import { Directive, ElementRef, Inject, Renderer2 } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { OverlayContainer } from "@angular/cdk/overlay";
import { THEME_SWITCHER_CONFIG, ThemeSwitcherConfig, ThemeSwitcherState } from "../models";
import { isCompactThemeActive, isDarkModeActiveSelector } from "../selectors";

@Directive({
    selector: "[dgpThemeHost]",
})
export class ThemeHostDirective {

    constructor(
        private readonly elRef: ElementRef,
        private readonly renderer: Renderer2,
        private readonly store: Store<ThemeSwitcherState>,
        @Inject(THEME_SWITCHER_CONFIG)
        private readonly config: ThemeSwitcherConfig,
        private readonly overlayContainer: OverlayContainer
    ) {
        this.overlayContainer.getContainerElement().setAttribute("dgpThemeHost", "");

        this.store.pipe(
            select(isDarkModeActiveSelector)
        )
            .subscribe(isDarkModeActive => {

                if (isDarkModeActive) {
                    this.renderer.addClass(elRef.nativeElement, this.config.darkThemeClassName);
                    this.overlayContainer.getContainerElement()
                        .classList
                        .add(this.config.darkThemeClassName);
                } else {
                    this.renderer.removeClass(elRef.nativeElement, this.config.darkThemeClassName);
                    this.overlayContainer.getContainerElement()
                        .classList
                        .remove(this.config.darkThemeClassName);
                }

            });

        this.store.pipe(
            select(isCompactThemeActive)
        )
            .subscribe(useCompactTheme => {

                if (useCompactTheme) {
                    this.renderer.addClass(elRef.nativeElement, this.config.compactThemeClassName);
                    this.overlayContainer.getContainerElement()
                        .classList
                        .add(this.config.compactThemeClassName);
                } else {
                    this.renderer.removeClass(elRef.nativeElement, this.config.compactThemeClassName);
                    this.overlayContainer.getContainerElement()
                        .classList
                        .remove(this.config.compactThemeClassName);
                }

            });


    }

}
