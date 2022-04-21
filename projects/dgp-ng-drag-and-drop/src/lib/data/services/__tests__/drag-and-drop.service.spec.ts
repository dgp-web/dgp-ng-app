import { TestBed } from "@angular/core/testing";
import { DgpDragAndDropService } from "../drag-and-drop.service";
import { DgpDragAndDropModule } from "../../drag-and-drop.module";
import { ModelDragInfo } from "../../../models/model-drag-info.model";
import { firstAsPromise } from "dgp-ng-app";

describe(DgpDragAndDropService.name, () => {

    const context: ModelDragInfo<{}> = {
        dragContext: "context",
        model: {}
    };

    let service: DgpDragAndDropService;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                DgpDragAndDropModule
            ]
        });

        service = TestBed.inject(DgpDragAndDropService);

    });

    it("should create.", () => {
        expect(service).toBeDefined();
    });

    it("registerDragStart should set the drag info", () => {
        service.registerDragStart(context);
        const result = service.isContextDragged(context);
        expect(result).toBeTruthy();
    });

    it("registerDragStart should set the drag info", () => {
        service.registerDragStart(context);
        const result = service.isContextDragged(context);
        expect(result).toBeTruthy();
    });

    it("registerDragEnd should clear the drag info", () => {
        service.registerDragEnd();
        const result = service.isContextDragged(context);
        expect(result).toBeFalsy();
    });

    it("isModelDragged$ should check whether the current model is dragged", async () => {
        service.registerDragStart(context);
        const result = await firstAsPromise(service.isModelDragged$(context));
        expect(result).toBeTruthy();
    });

});
