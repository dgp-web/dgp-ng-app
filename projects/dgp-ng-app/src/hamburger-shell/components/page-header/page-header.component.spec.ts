import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { PageHeaderComponent } from "./page-header.component";
import { DgpPageHeaderModule } from "./page-header.module";
import { StoreModule } from "@ngrx/store";
import { requestStoreFeature } from "../../../request-store/models";
import { requestStoreReducer } from "../../../request-store/reducers";

describe(PageHeaderComponent.name, () => {

    let fixture: ComponentFixture<PageHeaderComponent>;
    let component: PageHeaderComponent;

    beforeEach(async(async () => {

        await TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    [requestStoreFeature]: requestStoreReducer
                } as any),
                DgpPageHeaderModule
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(PageHeaderComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component)
            .toBeDefined();
    });

});
