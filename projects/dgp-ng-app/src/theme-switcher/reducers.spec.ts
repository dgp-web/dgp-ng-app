import { setIsDarkModeActive, toggleDarkMode } from "./actions";
import { initialThemeSwitcherState, themeSwitcherReducer } from "./reducers";

describe("themeSwitcherReducer", () => {

    it(`setIsDarkModeActive should set useDarkMode the action's payload`, () => {

        const action = setIsDarkModeActive({isDarkModeActive: true});

        const updatedState = themeSwitcherReducer(initialThemeSwitcherState, action);

        expect(updatedState.useDarkMode)
            .toBeTruthy();

    });

    it(`toggleDarkMode should invert the value of useDarkMode`, () => {

        const action = toggleDarkMode();

        const updatedState = themeSwitcherReducer(initialThemeSwitcherState, action);

        expect(updatedState.useDarkMode)
            .not
            .toBe(initialThemeSwitcherState.useDarkMode);

    });

});
