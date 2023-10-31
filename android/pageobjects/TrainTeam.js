import BasicFunction from "./BasicFunction"
import EvodMainScreen from "./EvodMainScreen"
import ExpectedFunctions from "./ExpectedFunctions"
import Utils from "./Utils"
import VehiclesAndDrivers from "./VehiclesAndDrivers"

export const trainerName = "Andrezál065 Štefan"

class TrainTeam {
    get trainTeamItemSelecter() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/tv_item_trainteam_boss"]')
    }
    get addItemSelector() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/ll_addremove_selection_add"]')
    }
    get trainTeamNumberInput() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/et_evod_input"]')
    }
    get evodInputSave() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/btn_evod_input_save"]')
    }
    get windowUpConfirm() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/iv_confirm"]')
    }
    get trainerNumberField() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/tv_layout_edittext_title" and (@text="Osobné číslo")]//..//*[@resource-id="sk.prosoft.ptt.pop:id/tv_layout_edittext_text"]')
    }
    get trainerStationStartField() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/tv_layout_edittext_title" and (@text="Východisková ŽST")]//..//*[@resource-id="sk.prosoft.ptt.pop:id/tv_layout_edittext_text"]')
    }
    get trainerNameField() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/tv_layout_edittext_title" and (@text="Meno a priezvisko")]//..//*[@resource-id="sk.prosoft.ptt.pop:id/tv_layout_edittext_text"]')
    }


    async expectDataInTrainTeam(testData) {
        await expect(await $('//*[@resource-id="sk.prosoft.ptt.pop:id/tb_addremove_selection"]//*[@class="android.widget.TextView" and(@text="Sprevádzajúci personál")]')).toBeDisplayed()
        await expect($('//*[@class="android.widget.RelativeLayout"]//*[@class="android.widget.TextView"and contains(@text, "' + testData.trainNumber + '")]'))
        await expect(await this.addItemSelector).toBeDisplayed()
    }

    async addTrainTeamItem(TrainTeam, testData) {
        for (const TrainTeamItem of TrainTeam) {
            await this.addItemSelector.click()

            await expect(this.evodInputSave).toBeDisabled()
            await this.trainTeamNumberInput.setValue(TrainTeamItem.trainerNumber)
            await expect(this.evodInputSave).toBeEnabled()
            await this.evodInputSave.click()

            await expect(await this.trainerNumberField.getText()).toEqual(TrainTeamItem.trainerNumber)
            await expect(await this.trainerStationStartField.getText()).toEqual(testData.stationOfChange)
            await expect(await this.trainerNameField.getText()).toEqual(await Utils.revertStringBySpace(TrainTeamItem.trainerName))
            await BasicFunction.confirmButtonSelector.click()

            await expect(await $('//*[@resource-id="sk.prosoft.ptt.pop:id/tv_item_addremove_selection" and (@text="' + await Utils.revertStringBySpace(TrainTeamItem.trainerName) + '")]')).toBeDisplayed()
        }
        await BasicFunction.backBtnClick()
    }



}

export default new TrainTeam