import { hamburgerShellReducer, initialHamburgerShellState } from "./reducers";
import { closeHamburgerMenu, closeListDetailsMenu, setHamburgerMenuState, setListDetailsPageState, toggleHamburgerMenu, toggleListDetailsPageMenu } from "./actions";
import { HamburgerShellState } from "./models";

describe("hamburgerShellReducer", () => {

    it(`setHamburgerMenuState should set hamburgerMenuMode and isHamburgerMenuOpen`, () => {

        const action = setHamburgerMenuState({
            hamburgerMenuMode: "side",
            isHamburgerMenuOpen: true
        });

        const state = hamburgerShellReducer(initialHamburgerShellState, action);

        const expectedState: HamburgerShellState = {
            ...initialHamburgerShellState,
            hamburgerMenuMode: action.hamburgerMenuMode,
            isHamburgerMenuOpen: action.isHamburgerMenuOpen
        };

        expect(state)
            .toEqual(expectedState);

    });

    it(`toggleHamburgerState should toggle isHamburgerMenuOpen`, () => {


        const state = hamburgerShellReducer(initialHamburgerShellState, toggleHamburgerMenu());

        const expectedState: HamburgerShellState = {
            ...initialHamburgerShellState,
            isHamburgerMenuOpen: !initialHamburgerShellState.isPageMenuOpen
        };

        expect(state)
            .toEqual(expectedState);

    });

    it(`closeHamburgerMenu should set isHamburgerMenuOpen to false`, () => {


        const state = hamburgerShellReducer(initialHamburgerShellState, closeHamburgerMenu());

        const expectedState: HamburgerShellState = {
            ...initialHamburgerShellState,
            isHamburgerMenuOpen: false
        };

        expect(state)
            .toEqual(expectedState);

    });

    it(`setListDetailsPageState should set pageMenuMode and isPageMenuOpen`, () => {

        const action = setListDetailsPageState({
            pageMenuMode: "side",
            isPageMenuOpen: true
        });

        const state = hamburgerShellReducer(initialHamburgerShellState, action);

        const expectedState: HamburgerShellState = {
            ...initialHamburgerShellState,
            pageMenuMode: action.pageMenuMode,
            isPageMenuOpen: action.isPageMenuOpen
        };

        expect(state)
            .toEqual(expectedState);

    });

    it(`toggleListDetailsPageMenu should toggle isPageMenuOpen`, () => {


        const state = hamburgerShellReducer(initialHamburgerShellState, toggleListDetailsPageMenu());

        const expectedState: HamburgerShellState = {
            ...initialHamburgerShellState,
            isPageMenuOpen: !initialHamburgerShellState.isPageMenuOpen
        };

        expect(state)
            .toEqual(expectedState);

    });

    it(`closeHamburgerMenu should set isHamburgerMenuOpen to false`, () => {


        const state = hamburgerShellReducer(initialHamburgerShellState, closeListDetailsMenu());

        const expectedState: HamburgerShellState = {
            ...initialHamburgerShellState,
            isPageMenuOpen: false
        };

        expect(state)
            .toEqual(expectedState);

    });

});
