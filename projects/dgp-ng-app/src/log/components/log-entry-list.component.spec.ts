import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { LogEntryListComponent } from "./log-entry-list.component";
import { RouterTestingModule } from "@angular/router/testing";
import { Store, StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { DgpEmptyStateModule } from "../../empty-state/empty-state.module";
import { MatListModule } from "@angular/material/list";
import { CommonModule } from "@angular/common";
import { logStoreFeature } from "../models";
import { LOG_STORE_REDUCER, logStoreReducerProvider } from "../log.module";
import { logError } from "../actions";

describe(LogEntryListComponent.name, () => {

    let fixture: ComponentFixture<LogEntryListComponent>;
    let component: LogEntryListComponent;

    beforeEach(async(async () => {

        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                StoreModule.forRoot({
                    [logStoreFeature]: LOG_STORE_REDUCER
                } as any, {
                    runtimeChecks: {
                        strictActionImmutability: true,
                        strictActionSerializability: true,
                        strictStateImmutability: true,
                        strictStateSerializability: true
                    }
                }),
                EffectsModule.forRoot([]),
                DgpEmptyStateModule,
                MatListModule,
                CommonModule,
            ],
            declarations: [
                LogEntryListComponent
            ],
            providers: [
                logStoreReducerProvider
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(LogEntryListComponent);
        component = fixture.componentInstance;

        const store = TestBed.inject(Store);

        store.dispatch(logError({
            payload: {
                title: "title",
                error: {}
            }
        }));
    }));

    it("should create.", () => {
        expect(component)
            .toBeDefined();
    });

});
