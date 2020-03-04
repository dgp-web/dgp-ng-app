import { initialThemeSwitcherState, themeSwitcherReducerImpl } from "dgp-ng-app/theme-switcher/reducers/theme-switcher.reducer";
import { setIsDarkModeActive, toggleDarkMode } from "dgp-ng-app";

describe("themeSwitcherReducer", () => {

    it(`setIsDarkModeActive should set useDarkMode the action's payload`, () => {

        const action = setIsDarkModeActive({isDarkModeActive: true});

        const updatedState = themeSwitcherReducerImpl(initialThemeSwitcherState, action);

        expect(updatedState.useDarkMode)
            .toBeTruthy();

    });

    it(`toggleDarkMode should invert the value of useDarkMode`, () => {

        const action = toggleDarkMode();

        const updatedState = themeSwitcherReducerImpl(initialThemeSwitcherState, action);

        expect(updatedState.useDarkMode)
            .not
            .toBe(initialThemeSwitcherState.useDarkMode);

    });

});
