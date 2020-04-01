import { DgpModelEditorComponentBase } from "dgp-ng-app";

interface Model {
    readonly label: string;
    readonly description: string;
}

class TestModelEditorComponent extends DgpModelEditorComponentBase<Model> {
}

describe("DgpModelEditorComponentBase", () => {

    let editor: TestModelEditorComponent;

    beforeEach(() => {
        editor = new TestModelEditorComponent();
    });

    it(`initial model should be undefined.`, () => {

        expect(editor.model)
            .toBeUndefined();

    });

    it(`setModel should trigger modelChange with passed payload
    and set model.`, async () => {

        spyOn(editor.modelChange, "emit");

        const model: Model = {label: "", description: ""};

        editor.setModel(model);

        expect(editor.modelChange.emit)
            .toHaveBeenCalledWith(model);

        expect(editor.model).toBe(model);

    });

    it(`updateModel should trigger modelChange with passed payload
    and update set model.`, async () => {

        spyOn(editor.modelChange, "emit");

        let model: Model = {label: "", description: ""};

        editor.setModel(model);

        model = {label: " ", description: ""};

        editor.updateModel(model);

        expect(editor.modelChange.emit)
            .toHaveBeenCalledWith(model);

        expect(editor.model).toEqual(model);

    });

});
