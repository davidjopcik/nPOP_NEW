import Swipe from "./Swipe"

class EvodMainScreen {
    get mainEvodSelector() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/cv_main_evod"]')
    }
    get trainLogOpenBtn() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/ll_evod_trainlog"]')
    }
    get vehiclesAndDriversOpenBtn() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/ll_evod_vehicles_and_drivers"]')
    }
    get svodOpenBtn() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/ll_evod_svod"]')
    }
    get sobOpenBtn() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/ll_evod_sob"]')
    }
    get trainDepartureSelector() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/ll_evod_departure"]')
    }
    get VehicleDefectsSelector() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/ll_evod_wagon_defects"]')
    }
    get SprevPersonalSelector() {
        return $('//*[@text="Sprevádzajúci personál"]')
    }
    get EmergenciesBtn() {
        return $('//*[@text="Mimoriadnosti"]')
    }
    get overviewBtn() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/evodOverview"]')
    }
    get mainEvodSyncSelector() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/cv_evod_sync"]')
    }
    get enrollmentStation() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/tv_layout_edittext_title"]')
    }
    get trainStationSearch() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/eet_layout_trainstation_search"]')
    }

    async expectScreenHeadName(headerName) {
        await expect(await $('//*[@resource-id="sk.prosoft.ptt.pop:id/action_bar"]//*[@class="android.widget.TextView" and(@text="'+headerName+'")]')).toBeDisplayed()
    }

    async evodOpen() {
        await this.mainEvodSelector.click()
    }

    async trainLogOpenClick() {
        await (await this.trainLogOpenBtn).click()
    }

    async vehiclesAndDriversOpenClick() {
        await this.vehiclesAndDriversOpenBtn.click()
    }

    async svodOpenClick() {
        await this.svodOpenBtn.click()
    }

    async sobOpenClick() {
        await this.sobOpenBtn.click()
    }

    async trainDepartureClick() {
        await this.trainDepartureSelector.click()
    }

    async sprevPersonalClick() {
        await this.SprevPersonalSelector.click()
    }

    async mainEvodSyncClick() {
        await this.mainEvodSyncSelector.click()
        if ((await $('//*[@text="Naozaj si prajete spustiť synchronizáciu EVOD?"]')).isDisplayed()) {
            await $('//*[@text="SPUSTIŤ SYNCHRONIZÁCIU"]').click()
        }
        await this.trainLogOpenBtn.waitForDisplayed({ timeout: 60000 })
    }
    async VehicleDefectsClick() {
        await this.VehicleDefectsSelector.click()
    }

    async overviewBtnClick() {
        await this.overviewBtn.click()
        await this.expectScreenHeadName("Prehľad záznamov")
    }

    async emergenciesBtnClick() {
        await this.EmergenciesBtn.click()
        await expect(await $('//*[@resource-id="sk.prosoft.ptt.pop:id/inc_layout_toolbar"]//*[@class="android.widget.TextView" and(@text="Mimoriadnosti")]')).toBeDisplayed()
    }

    async enrollStation(enrollStation) {
        await this.enrollmentStation.waitForDisplayed()
        await this.enrollmentStation.click()
        await this.trainStationSearch.waitForDisplayed()
        await Swipe.swipeIntoView(await $('//*[@text="' + enrollStation + '"]'))
        await $('//*[@text="' + enrollStation + '"]').click()
    }



}
export default new EvodMainScreen