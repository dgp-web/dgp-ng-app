import { hmrReducer } from "./hmr.reducer";

describe("hmrReducer should decorate a reducer that", () => {

    const baseReducer = (state: "initialState") => {
        return state;
    };

    const dummy = {
        baseReducer
    };

    let decoratedReducer;

    beforeEach(() => {
        spyOn(dummy, "baseReducer")
            .and
            .callThrough();


        decoratedReducer = hmrReducer(dummy.baseReducer);

    });


    it(`passes calls through to the baseReducer.`, () => {

        decoratedReducer("test", {type: "dummyAction"});

        expect(dummy.baseReducer)
            .toHaveBeenCalled();

    });

    xit(`reacts to hotReload and set its payload as new state.`, () => {

    });

});
