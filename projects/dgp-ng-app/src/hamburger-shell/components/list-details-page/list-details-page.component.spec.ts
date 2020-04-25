import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ListDetailsPageComponent } from "./list-details-page.component";
import { DgpListDetailsPageModule } from "./list-details-page.module";
import { StoreModule } from "@ngrx/store";
import { hamburgerShellStoreFeature } from "../../models";
import { hamburgerShellReducer } from "../../reducers";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe(ListDetailsPageComponent.name, () => {

    let fixture: ComponentFixture<ListDetailsPageComponent>;
    let component: ListDetailsPageComponent;


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

        fixture = TestBed.createComponent(ListDetailsPageComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component)
            .toBeDefined();
    });

});
