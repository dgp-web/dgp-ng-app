import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { StoreModule } from "@ngrx/store";
import { hamburgerShellStoreFeature } from "../../models";
import { hamburgerShellReducer } from "../../reducers";
import { DgpListDetailsPageModule } from "./list-details-page.module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ListDetailsPageContentComponent } from "./list-details-page-content.component";

describe(ListDetailsPageContentComponent.name, () => {

    let fixture: ComponentFixture<ListDetailsPageContentComponent>;
    let component: ListDetailsPageContentComponent;


    beforeEach(async(async () => {

        await TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    [hamburgerShellStoreFeature]: hamburgerShellReducer
                }),
                DgpListDetailsPageModule,
                NoopAnimationsModule
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ListDetailsPageContentComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component)
            .toBeDefined();
    });

});
