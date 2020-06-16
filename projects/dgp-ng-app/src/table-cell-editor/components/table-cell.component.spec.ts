import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ChangeDetectionStrategy } from "@angular/core";
import { DgpTableCellModule } from "../table-cell.module";
import { DgpTableCellComponent } from "./table-cell.component";

describe(DgpTableCellComponent.name, () => {

    let fixture: ComponentFixture<DgpTableCellComponent>;
    let component: DgpTableCellComponent;


    beforeEach(async(async () => {

        await TestBed.configureTestingModule({
            imports: [
                DgpTableCellModule
            ]
        })
            .compileComponents();

        TestBed.overrideComponent(DgpTableCellComponent, {
            set: {
                changeDetection: ChangeDetectionStrategy.Default
            }
        });

        fixture = TestBed.createComponent(DgpTableCellComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component).toBeDefined();
    });

});
