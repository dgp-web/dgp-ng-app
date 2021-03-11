import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { TileComponent } from "./tile.component";
import { DgpTileModule } from "./tile.module";
import { RouterTestingModule } from "@angular/router/testing";

describe(TileComponent.name, () => {

    let fixture: ComponentFixture<TileComponent>;
    let component: TileComponent;

    beforeEach(waitForAsync(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                DgpTileModule,
                RouterTestingModule
            ]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(TileComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component)
            .toBeDefined();
    });

});
