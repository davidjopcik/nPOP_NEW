import BasicFunction from "./BasicFunction.js"
import EvodMainScreen from "./EvodMainScreen"
import HelpFunctions from "./HelpFunctions"

export let alertMsgTrainTimeDeparture
export let trainDepartureTime

class TrainDeparture {

    get departureTimeSelector() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/tv_layout_edittext_title" and contains(@text, "Čas odchodu")]')
    }
    get departureTimeNowSelector() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/iv_activity_evod_train_log_close_time"]')
    }
    get dialogTimePickerInput() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/tv_dialog_timepicker_timeinput"]')
    }
    get dialogTimePickerCancel() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/tv_dialog_timepicker_cancel"]')
    }
    get dialogTimePickerCurrent() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/iv_dialog_timepicker_current"]')
    }

    async trainDeparture() {
        await EvodMainScreen.trainDepartureClick()

        await expect(BasicFunction.confirmBtnSelector).toBeDisabled()
        await this.departureTimeNowSelector.click()

        await expect(BasicFunction.confirmBtnSelector).toBeEnabled()
        await BasicFunction.confirmBtnClick()

        // Nacitanie datumu z dialogu a nastavenie cez time picker
        if (await $('//*[@resource-id="android:id/message" and contains(@text, "Zadaný dátum a čas odchodu vlaku nesmie byť menší ako plánovaný dátum a čas odchodu z vých. DB")]').isDisplayed()) {

            alertMsgTrainTimeDeparture = await $('//*[@resource-id="android:id/message" and contains(@text, "Zadaný dátum a čas odchodu vlaku nesmie byť menší ako plánovaný dátum a čas odchodu z vých. DB")]').getText()
            console.log(alertMsgTrainTimeDeparture);

            trainDepartureTime = await HelpFunctions.timeDepartureFromAlert(alertMsgTrainTimeDeparture)
            console.log(trainDepartureTime);

            await $('//*[@text="ZAVRIEŤ"]').click()

            await this.departureTimeSelector.click()
            await this.dialogTimePickerCancel.click()

            await $('//*[@text="' + trainDepartureTime[0] + '"]').click()
            await $('//*[@text="' + trainDepartureTime[1] + '"]').click()
            await $('//*[@text="' + trainDepartureTime[3] + '"]').click()
            await $('//*[@text="' + trainDepartureTime[4] + '"]').click()

            await $('//*[@text="OK"]').click()

            await expect(BasicFunction.confirmBtnSelector).toBeEnabled()
            await BasicFunction.confirmBtnClick()
        }
    }

}
export default new TrainDeparture()