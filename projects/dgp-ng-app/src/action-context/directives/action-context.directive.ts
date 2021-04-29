import {
    AfterViewInit,
    Directive,
    ElementRef,
    HostBinding,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    Renderer2,
    SimpleChanges
} from "@angular/core";
import { DgpContainer } from "../../utils/container.component-base";
import { selectActionContext } from "../actions/select-action-context.action";
import { deselectActionContext } from "../actions/deselect-action-context.action";
import { Store } from "@ngrx/store";
import { ActionContextState } from "../models/action-context-state.model";
import { BehaviorSubject, Subscription } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { isActionContextSelected } from "../selectors/is-action-context-selected.selector";
import { getHashCode } from "../../utils/get-hash-code.function";
import { isNullOrUndefined, notNullOrUndefined } from "../../utils/null-checking.functions";

@Directive({
    selector: "[dgpActionContext]"
})
export class DgpActionContextDirective extends DgpContainer<ActionContextState> implements AfterViewInit, OnChanges, OnDestroy {

    @HostBinding("tabindex")
    readonly tabindex = 0;

    readonly actionContextKey$ = new BehaviorSubject<string>(null);

    @Input()
    actionContextKey: string;

    @Input()
    actionContextValue: any;

    @Input()
    actionContextType: string;

    @Input()
    actionContextLabel: string;

    readonly subscription: Subscription;

    constructor(
        protected readonly store: Store<ActionContextState>,
        private readonly elementRef: ElementRef,
        private readonly renderer: Renderer2
    ) {
        super(store);

        this.subscription = this.actionContextKey$.pipe(
            switchMap(key => this.store.select(isActionContextSelected(key))),
            tap(isSelected => {
                if (isSelected) this.renderer.addClass(this.elementRef.nativeElement, "--selected");
                else this.renderer.removeClass(this.elementRef.nativeElement, "--selected");
            })
        ).subscribe();
    }

    @HostListener("focus")
    focus() {
        this.dispatch(selectActionContext({
            actionContext: {
                key: this.actionContextKey$.value,
                value: this.actionContextValue,
                type: this.actionContextType,
                label: this.actionContextLabel
            }
        }));
    }

    ngAfterViewInit(): void {
        this.renderer.addClass(
            this.elementRef.nativeElement,
            "dgp-action-context"
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.actionContextKey) this.actionContextKey$.next(this.actionContextKey);
        if (changes.actionContextValue) {
            if (isNullOrUndefined(this.actionContextValue)) {
                this.actionContextKey$.next(null);
            } else {
                this.actionContextKey$.next(getHashCode(this.actionContextValue).toString());
            }
        }
    }

    ngOnDestroy(): void {
        if (notNullOrUndefined(this.actionContextKey)) {
            this.dispatch(deselectActionContext({
                selectedActionContextKey: this.actionContextKey
            }));
        }

        if (notNullOrUndefined(this.actionContextValue)) {
            this.dispatch(deselectActionContext({
                selectedActionContextKey: getHashCode(this.actionContextValue).toString()
            }));
        }

        if (!this.subscription.closed) this.subscription?.unsubscribe();
    }

}
