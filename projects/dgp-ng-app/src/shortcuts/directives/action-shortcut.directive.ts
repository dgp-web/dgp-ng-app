import { Directive, ElementRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Optional, Output } from "@angular/core";
import { DgpDisabledBase } from "../../utils/dgp-disabled-base.directive";
import { ActionShortcutConfig, defaultShortcutConfig, SHORTCUT_CONFIG, ShortcutConfig, TriggerEvent } from "../models";
import { MatTooltip } from "@angular/material/tooltip";

@Directive({selector: "[dgpActionShortcut]"})
export class DgpActionShortcutDirective extends DgpDisabledBase implements OnInit, OnDestroy, ActionShortcutConfig {

    /**
     * The regular disabled input can be used as proxy
     * for disabled inputs
     *
     * Only disabling the shortcut is  available via
     * this input
     */
    @Input()
    isShortcutDisabled = false;

    @Input()
    shortcutKey: string;

    @Input()
    requireAlt: boolean;

    @Input()
    requireCtrl: boolean;

    @Input()
    requireShift: boolean;

    @Input()
    triggerEvent: TriggerEvent;

    @Output()
    readonly shortcutTriggered = new EventEmitter();

    constructor(
        private readonly elRef: ElementRef<HTMLElement>,
        @Inject(SHORTCUT_CONFIG) @Optional()
        private readonly config: ShortcutConfig,
        @Optional()
        private readonly matTooltip: MatTooltip
    ) {
        super();

        if (!this.config) this.config = defaultShortcutConfig;

        this.requireAlt = this.config.action.requireAlt;
        this.requireCtrl = this.config.action.requireCtrl;
        this.requireShift = this.config.action.requireShift;
        this.triggerEvent = this.config.action.triggerEvent;
    }

    ngOnInit(): void {
        window.addEventListener("keydown", this.onKeyDown);

        if (this.matTooltip && this.matTooltip.message) {
            let result = " (";
            if (this.requireAlt) result += "ALT+";
            if (this.requireCtrl) result += "CTRL+";
            if (this.requireShift) result += "SHIFT+";
            if (this.shortcutKey) result += this.shortcutKey;
            result += ")";

            this.matTooltip.message += result;
        }
    }

    ngOnDestroy(): void {
        window.removeEventListener("keydown", this.onKeyDown);
    }

    private onKeyDown = (event: KeyboardEvent) => {
        if (this.disabled || this.isShortcutDisabled) return;
        if (!this.shortcutKey) return;

        if (this.requireAlt && !event.altKey) return;
        if (this.requireCtrl && !event.ctrlKey) return;
        if (this.requireShift && !event.shiftKey) return;

        if (event.key.toLowerCase() !== this.shortcutKey.toLowerCase()) return;

        if (this.triggerEvent === "click") {
            this.elRef.nativeElement.click();
        }
        this.shortcutTriggered.emit();
    };

}
