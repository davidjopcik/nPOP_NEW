import BasicFunction from "./BasicFunction.js"
import EvodMainScreen from "./EvodMainScreen"
import Swipe from "./Swipe"

export let trainBreakingModeSelect

class Svod {

    get vehicleWagonorderBreakpercentageSelector() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/et_evod_vehicle_wagonorder_breakpercentage"]')
    }
    get vehicleWagonorderBreakpercentageInput() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/textinput_placeholder"]')
    }
    get trainBreakingModeSelector() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/tv_item_spinner_text" and contains(@text, "Režim brzdenia vlaku")]')
    }
    get trainBreakingModeSelectorText() {
        return $('//*[@text = "Režim brzdenia vlaku"]')
    }
    get trainBreakingModeInput() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/tv_item_spinner_text"]')
    }
    get confirmVehicleSvod() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/b_evod_vehicle_wagonorder_confirm"]')
    }
    get alertBrakingPercentagesInsufficient() {
        return $('//*[@resource-id="android:id/message" and contains(@text, "Brzdiace percentá sú nedostatočné. Je potrebné znížiť rýchlosť vlaku.")]')
    }
    get enrollCardButton() {
        return $('//*[@text="ZÁPIS NA KARTU"]')
    }
    get PrintButton() {
        return $('//*[@text="TLAČIŤ"]')
    }




    async svod(vehicleWagonorderBreakpercentage, trainBreakingMode, isPrepatoryTrainlog) {

        await EvodMainScreen.svodOpenClick()

        //POTVRDIŤ Disable
        if (!await this.confirmVehicleSvod.isDisplayed()) {
            await Swipe.swipeUpAllScreen()
        }
        await this.confirmVehicleSvod.waitForDisplayed()

        //POTVRDIŤ Disabled
        if ((await this.vehicleWagonorderBreakpercentageSelector.getText() == "") || (await this.trainBreakingModeSelector.isDisplayed())) {
            await expect(this.confirmVehicleSvod).toBeDisabled()

            //Zadanie percent a režim brzdenia
            await this.vehicleWagonorderBreakpercentageSelector.setValue(vehicleWagonorderBreakpercentage)
            await this.trainBreakingModeSelectorText.click()
            trainBreakingModeSelect = await $('//*[@resource-id="android:id/text1" and contains(@text, "' + trainBreakingMode + '")]')
            await trainBreakingModeSelect.click()
        }

        //POTVRDIŤ Enable
        if (!await this.confirmVehicleSvod.isDisplayed()) {
            await Swipe.swipeUpAllScreen()
        }
        await expect(this.confirmVehicleSvod).toBeEnabled()

        //Brzdiace percentá sú nedostatočné
        await this.confirmVehicleSvod.click()

        if (await this.alertBrakingPercentagesInsufficient.isDisplayed()) {
            await $('//*[@text="POTVRDIŤ"]').click()
        }

        await BasicFunction.waitForProgressBar()

        //Kontrola tlačidiel "ZÁPIS NA KARTU" a "TLAČIŤ"
        if (isPrepatoryTrainlog) {
            await this.printEnrollPrintButtonsExpect()
        }
        else {
            await this.printPrintButtonExpect()
        }
        await this.printClose()
    }

    //------------------ partial functions ----------------------

    async printClose() {
        await BasicFunction.closeBtn()
    }

    async printEnrollPrintButtonsExpect() {
        await expect(await this.enrollCardButton).toBeDisplayed()
        await expect(await this.PrintButton).toBeDisplayed()
    }

    async printPrintButtonExpect() {
        await expect(await this.enrollCardButton).not.toBeDisplayed()
        await expect(await this.PrintButton).toBeDisplayed()
    }

}

export default new Svod()