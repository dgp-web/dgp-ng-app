import {
    defaultShouldUpdateBrowserTabBroadcastRoleDisplayConfig,
    shouldUpdateBrowserTabBroadcastRoleDisplay,
    ShouldUpdateBrowserTabBroadcastRoleDisplayPayload
} from "../should-update-browser-tab-broadcast-role-display.function";
import { BroadcastRole } from "../../models";


describe("shouldUpdateBrowserTabBroadcastRoleDisplay", () => {

    const title = "data";

    it(`should indicate the leader in the tab title if the role changes to leader.`, () => {

        const payload: ShouldUpdateBrowserTabBroadcastRoleDisplayPayload = {
            currentBrowserTabTitle: title,
            currentBroadcastRole: BroadcastRole.Leader
        };

        const result = shouldUpdateBrowserTabBroadcastRoleDisplay(payload);

        expect(result.shouldUpdateRoleDisplay).toBeTruthy();
        expect(result.updatedBrowserTabTitle).toContain(
            defaultShouldUpdateBrowserTabBroadcastRoleDisplayConfig.leaderBrowserTabTitleSuffix
        );

    });

    it(`should indicate the peon in the tab title if the role changes to peon.`, () => {

        const payload: ShouldUpdateBrowserTabBroadcastRoleDisplayPayload = {
            currentBrowserTabTitle: title,
            currentBroadcastRole: BroadcastRole.Peon
        };

        const result = shouldUpdateBrowserTabBroadcastRoleDisplay(payload);

        expect(result.shouldUpdateRoleDisplay).toBeTruthy();
        expect(result.updatedBrowserTabTitle).toContain(
            defaultShouldUpdateBrowserTabBroadcastRoleDisplayConfig.peonBrowserTabTitleSuffix
        );

    });

    it(`should trim the leader role from the tab title if it changes to None.`, () => {

        const payload: ShouldUpdateBrowserTabBroadcastRoleDisplayPayload = {
            currentBrowserTabTitle: title + defaultShouldUpdateBrowserTabBroadcastRoleDisplayConfig.leaderBrowserTabTitleSuffix,
            currentBroadcastRole: BroadcastRole.None
        };

        const result = shouldUpdateBrowserTabBroadcastRoleDisplay(payload);

        expect(result.shouldUpdateRoleDisplay).toBeTruthy();
        expect(result.updatedBrowserTabTitle).not.toContain(defaultShouldUpdateBrowserTabBroadcastRoleDisplayConfig.peonBrowserTabTitleSuffix);

    });

    it(`should trim the peon role from the tab title if it changes to None.`, () => {

        const payload: ShouldUpdateBrowserTabBroadcastRoleDisplayPayload = {
            currentBrowserTabTitle: title + defaultShouldUpdateBrowserTabBroadcastRoleDisplayConfig.peonBrowserTabTitleSuffix,
            currentBroadcastRole: BroadcastRole.None
        };

        const result = shouldUpdateBrowserTabBroadcastRoleDisplay(payload);

        expect(result.shouldUpdateRoleDisplay).toBeTruthy();
        expect(result.updatedBrowserTabTitle).not.toContain(defaultShouldUpdateBrowserTabBroadcastRoleDisplayConfig.peonBrowserTabTitleSuffix);

    });

    it(`should not update the title if no role change occurs or the tab title is already fitting.`,
        () => {

            const payload: ShouldUpdateBrowserTabBroadcastRoleDisplayPayload = {
                currentBrowserTabTitle: title + defaultShouldUpdateBrowserTabBroadcastRoleDisplayConfig.peonBrowserTabTitleSuffix,
                currentBroadcastRole: BroadcastRole.Peon
            };

            const result = shouldUpdateBrowserTabBroadcastRoleDisplay(payload);

            expect(result.shouldUpdateRoleDisplay).toBeFalsy();
            expect(result.updatedBrowserTabTitle).toBeNull();

        });

});
