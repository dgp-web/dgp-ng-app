import { Directive, ElementRef, Inject, Renderer2 } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { OverlayContainer } from "@angular/cdk/overlay";
import { ThemeSwitcherState, THEME_SWITCHER_CONFIG, ThemeSwitcherConfig } from "../models";
import { isDarkModeActiveSelector } from "../selectors";

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


    }

}
