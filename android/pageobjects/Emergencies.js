import BasicFunction from "./BasicFunction"
import Swipe from "./Swipe"

class Emergencies {
    get wayDiversionBtn() {
        return $('//*[@text="Odklon trasy"]')
    }
    get wayDiversionStationTo() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/inc_fragment_evod_way_diversion_to"]')
    }
    get confirmBtnWayDiversion() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/iv_addremove_selection_confirm"]')
    }
    get wayChangeTrainStationBtn() {
        return $('//*[@text="Zmena zastávky na trase"]')
    }
    get wayChangeTrainStationCheckBox() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/cb_item_addremove_selection"]')
    }

    async assertTrainNumberInHeadEmergencies(testData) {
        await expect(await $('//*[@resource-id="sk.prosoft.ptt.pop:id/sw_fragment_evod_main_incident"]//*[@class="android.widget.LinearLayout"]//*[@class="android.widget.LinearLayout"]//*[@class="android.widget.LinearLayout"]//*[@class="android.widget.RelativeLayout"]//*[@class="android.widget.TextView" and contains(@text, "' + testData.trainNumber + '")]')).toBeDisplayed()
        await expect(await $('//*[@class="android.widget.TextView" and(@text="Stanica zápisu")]//..//..//*[@class="android.widget.LinearLayout"][1]//*[@class="android.widget.TextView" and(@text="' + testData.stationOfChange + '")]'))
    }

    async assertTrainNumberInHeadWayDiversion(testData) {
        await expect(await $('//*[@resource-id="sk.prosoft.ptt.pop:id/inc_evod_simple"]//*[@class="android.widget.RelativeLayout"]//*[@class="android.widget.TextView" and contains (@text, "' + testData.trainNumber + '")]')).toBeDisplayed()
    }

    async assertScreenHeadNameInWayChangeTrainStation() {
        await expect(await $('//*[@resource-id="sk.prosoft.ptt.pop:id/tb_addremove_selection"]//*[@class="android.widget.TextView" and (@text="Zmena zastávky na trase")]')).toBeDisplayed()
    }

    async assertTrainNumberInHeadWayChangeTrainStation(testData) {
        await expect(await $('//*[@resource-id="sk.prosoft.ptt.pop:id/ll_addremove_selection_extra"]//*[@class="android.widget.LinearLayout"]//*[@class="android.widget.RelativeLayout"]//*[@class="android.widget.TextView" and contains (@text, "' + testData.trainNumber + '")]')).toBeDisplayed()
    }


    async wayDiversion(testData) {
        await this.assertTrainNumberInHeadEmergencies(testData)
        await this.wayDiversionBtn.click()
        await this.assertTrainNumberInHeadWayDiversion(testData)
        await this.wayDiversionStationTo.click()

        await $('//*[@resource-id="sk.prosoft.ptt.pop:id/eet_layout_trainstation_search"]').setValue(testData.wayDiversionStationTo)
        await $('//*[@resource-id="sk.prosoft.ptt.pop:id/rl_item_trainstation_r_search"]//*[@class="android.widget.TextView" and (@text="'+testData.wayDiversionStationTo+'")]').click()
        
        await BasicFunction.confirmBtnClick()
        await this.wayDiversionRemoveStation(testData)
        await BasicFunction.backBtnClick()
    }

    async wayDiversionRemoveStation(testData) {
        await $('//*[@resource-id="sk.prosoft.ptt.pop:id/tv_item_addremove_selection" and(@text="' + testData.stationToRemove + '")]//..//*[@resource-id="sk.prosoft.ptt.pop:id/cb_item_addremove_selection"]').click()
        await $('//*[@resource-id="sk.prosoft.ptt.pop:id/iv_addremove_selection_remove"]').click()
        await expect(await $('//*[@resource-id="android:id/message" and contains (@text, "' + testData.stationToRemove + '")]')).toBeDisplayed()
        await $('//*[@text="VYRADIŤ STANICU"]').click()
        await expect(await $('//*[@resource-id="sk.prosoft.ptt.pop:id/tv_item_addremove_selection" and(@text="' + testData.stationToRemove + '")]')).not.toBeDisplayed()
        await this.confirmBtnWayDiversion.click()
    }

    async wayChangeTrainStation(testData) {
        await this.assertTrainNumberInHeadEmergencies(testData)
        await this.wayChangeTrainStationBtn.click()

        await this.assertScreenHeadNameInWayChangeTrainStation()
        await this.assertTrainNumberInHeadWayChangeTrainStation(testData)


    }



}

export default new Emergencies()