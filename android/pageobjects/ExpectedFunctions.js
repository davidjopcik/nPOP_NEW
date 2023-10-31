import { evodHlavneMenu, evodPSHlavneMenu, mimoriadnosti, odchodVlaku, otvorenieHlSupisu, otvoreniePripSUpisu, prehladZaznamov, pripravnySupis, sob, sprevPersonal, supisVlakuMenu, svod, synchronizacia, ukoncenieHlSupisu, ukonceniePripSupisu, vozidlaARus, zavadyMimoSupis, zavadyNaVoznoch, zrusenieHlSupisu, zruseniePripSupisu } from "../../selectors.config"

class ExpectedFunctions {

    async EvodOpenButtonsDisabled() {
        let disabledbuttons = [vozidlaARus, svod, sprevPersonal, sob, mimoriadnosti, odchodVlaku, pripravnySupis]
        let expectedSelector = evodHlavneMenu
        await this.expectBtn(disabledbuttons, expectedSelector)
    }

    async supisVlakuButtonsDisabled() {
        let disabledbuttons = [svod, sob, zavadyNaVoznoch, synchronizacia, odchodVlaku, pripravnySupis]
        let expectedSelector = evodHlavneMenu
        await this.expectBtn(disabledbuttons, expectedSelector)
    }

    async vozidlaARusButtonsDisabled() {
        let disabledbuttons = [sprevPersonal, sob, zavadyNaVoznoch, synchronizacia, mimoriadnosti, odchodVlaku, pripravnySupis]
        let expectedSelector = evodHlavneMenu
        await this.expectBtn(disabledbuttons, expectedSelector)
    }

    async vozidlaARusAfteChancgeButtonsDisabled() {
        let disabledbuttons = [sob, synchronizacia,odchodVlaku, pripravnySupis]
        let expectedSelector = evodHlavneMenu
        await this.expectBtn(disabledbuttons, expectedSelector)
    }

    async svodButtonsDisabled() {
        let disabledbuttons = [sprevPersonal, zavadyNaVoznoch, synchronizacia, mimoriadnosti, odchodVlaku, pripravnySupis]
        let expectedSelector = evodHlavneMenu
        await this.expectBtn(disabledbuttons, expectedSelector)
    }

    async svodAfterChangeButtonsDisabled() {
        let disabledbuttons = [synchronizacia, odchodVlaku, pripravnySupis]
        let expectedSelector = evodHlavneMenu
        await this.expectBtn(disabledbuttons, expectedSelector)
    }

    async sobButtonsDisabled() {
        let disabledbuttons = [sprevPersonal, zavadyNaVoznoch, mimoriadnosti, pripravnySupis]
        let expectedSelector = evodHlavneMenu
        await this.expectBtn(disabledbuttons, expectedSelector)
    }

    async sobAfterChangeButtonsDisabled() {
        let disabledbuttons = [pripravnySupis, vozidlaARus, sprevPersonal, mimoriadnosti, odchodVlaku, pripravnySupis]
        let expectedSelector = evodHlavneMenu
        await this.expectBtn(disabledbuttons, expectedSelector)
    }

    async odchodVlakuButtonsDisabled() {
        let disabledbuttons = [vozidlaARus, sprevPersonal, zavadyNaVoznoch, mimoriadnosti, odchodVlaku, pripravnySupis]
        let expectedSelector = evodHlavneMenu
        await this.expectBtn(disabledbuttons, expectedSelector)
    }

    async syncButtonsDisabled() {
        let disabledbuttons = [vozidlaARus, sprevPersonal, zavadyNaVoznoch, mimoriadnosti, odchodVlaku, pripravnySupis]
        let expectedSelector = evodHlavneMenu
        await this.expectBtn(disabledbuttons, expectedSelector)
    }

    async syncAfterChangeButtonsDisabled() {
        let disabledbuttons = [odchodVlaku, pripravnySupis]
        let expectedSelector = evodHlavneMenu
        await this.expectBtn(disabledbuttons, expectedSelector)
    }

    async stanicaZapisuButtonsDisabled() {
        let disabledbuttons = [zavadyNaVoznoch, odchodVlaku, pripravnySupis]
        let expectedSelector = evodHlavneMenu
        await this.expectBtn(disabledbuttons, expectedSelector)
    }

    async stanicaZapisuAfteChangeButtonsDisabled() {
        let disabledbuttons = [odchodVlaku, pripravnySupis]
        let expectedSelector = evodHlavneMenu
        await this.expectBtn(disabledbuttons, expectedSelector)
    }

    async ziadnySupisButtonsDisabled() {
        let disabledbuttons = [zrusenieHlSupisu, ukoncenieHlSupisu]
        let expectedSelector = supisVlakuMenu
        await this.expectBtn(disabledbuttons, expectedSelector)
    }

    async ukoncHlavSupisButtonsDisabled() {
        let disabledbuttons = [otvorenieHlSupisu, zrusenieHlSupisu]
        let expectedSelector = supisVlakuMenu
        await this.expectBtn(disabledbuttons, expectedSelector)
    }

    async zrusHlavSupisButtonsDisabled() {
        let disabledbuttons = [otvorenieHlSupisu, ukoncenieHlSupisu]
        let expectedSelector = supisVlakuMenu
        await this.expectBtn(disabledbuttons, expectedSelector)
    }

    // ---- Prepatory trainlog expected functions ----

    async PSVlakuButtonsDiabled() {
        let disabledbuttons = [svod, sob, synchronizacia]
        let notDisplayedButtons = [zavadyNaVoznoch, odchodVlaku, zavadyMimoSupis, sprevPersonal, mimoriadnosti, pripravnySupis]
        let expectedSelector = evodPSHlavneMenu
        await this.expectBtn(disabledbuttons, expectedSelector, notDisplayedButtons,)
    }

    async PSvozidlaARusButtonsDisabled() {
        let disabledbuttons = [sob, synchronizacia]
        let notDisplayedButtons = [zavadyNaVoznoch, odchodVlaku, zavadyMimoSupis, sprevPersonal, mimoriadnosti, pripravnySupis]
        let expectedSelector = evodPSHlavneMenu
        await this.expectBtn(disabledbuttons, expectedSelector, notDisplayedButtons)
    }

    async PSsvodButtonsDisabled() {
        let disabledbuttons = [synchronizacia]
        let expectedSelector = evodPSHlavneMenu
        let notDisplayedButtons = [zavadyNaVoznoch, odchodVlaku, zavadyMimoSupis, sprevPersonal, mimoriadnosti, pripravnySupis]
        await this.expectBtn(disabledbuttons, expectedSelector, notDisplayedButtons)
    }

    async PSsobButtonsDisabled() {
        let disabledbuttons = []
        let notDisplayedButtons = [zavadyNaVoznoch, odchodVlaku, zavadyMimoSupis, sprevPersonal, mimoriadnosti, pripravnySupis]
        let expectedSelector = evodPSHlavneMenu
        await this.expectBtn(disabledbuttons, expectedSelector, notDisplayedButtons)
    }

    async ukoncPripSupisButtonsDisabled() {
        let disabledbuttons = [otvoreniePripSUpisu, zruseniePripSupisu]
        let expectedSelector = supisVlakuMenu
        await this.expectBtn(disabledbuttons, expectedSelector)
    }

    async zrusPripSupisButtonsDisabled(){
        let disabledbuttons = [otvoreniePripSUpisu, ukonceniePripSupisu]
        let expectedSelector = supisVlakuMenu
        await this.expectBtn(disabledbuttons, expectedSelector)
    }

    // ---- Change to main Trainlog fro prepatory ----

    async EvodAndPSOpenButtonsDisabled() {
        let disabledbuttons = [vozidlaARus, svod, sprevPersonal, sob, mimoriadnosti, odchodVlaku]
        let expectedSelector = evodHlavneMenu
        await this.expectBtn(disabledbuttons, expectedSelector)
    }
    

    // ----------- partial functions -----------

    async expectBtn(disabledButtons, expectedSelector, notDisplayedButtons) {
        if (notDisplayedButtons) {
            for (const element of notDisplayedButtons) {
                await expect(await $('//*[@text="' + element + '"]')).not.toBeDisplayed()
            }
        }

        for (const element of disabledButtons) {
            await $('//*[@text="' + element + '"]').click()
            await expect(await $('//*[@text="' + expectedSelector + '"]')).toBeDisplayed()
        }
    }


}
export default new ExpectedFunctions