import { hmrReducer } from "./hmr.reducer";
import { hotReload } from "dgp-ng-app";

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

        const action = {type: ""};
        const state = "";

        decoratedReducer(state, action);

        expect(dummy.baseReducer)
            .toHaveBeenCalledWith(state, action);

    });

    it(`reacts to hotReload and set its payload as new state.`, () => {

        const payload = {};
        const state = "";

        const action = hotReload({payload});

        const updateState = decoratedReducer(state, action);

        expect(updateState)
            .toBe(payload);

    });

});
