import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { LogEntryListComponent } from "./log-entry-list.component";
import { RouterTestingModule } from "@angular/router/testing";
import { Store, StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { DgpEmptyStateModule } from "../../empty-state/empty-state.module";
import { MatLegacyListModule as MatListModule } from "@angular/material/legacy-list";
import { CommonModule } from "@angular/common";
import { logStoreFeature } from "../models";
import { LOG_STORE_REDUCER, logStoreReducerProvider } from "../log.module";
import { logError } from "../actions";
import { MatIconModule } from "@angular/material/icon";

describe(LogEntryListComponent.name, () => {

    let fixture: ComponentFixture<LogEntryListComponent>;
    let component: LogEntryListComponent;

    beforeEach(waitForAsync(async () => {

        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                StoreModule.forRoot({
                    [logStoreFeature]: LOG_STORE_REDUCER
                } as any),
                EffectsModule.forRoot([]),
                DgpEmptyStateModule,
                MatListModule,
                CommonModule,
                MatIconModule
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
