import BasicFunction from "./BasicFunction.js"
import EvodMainScreen from "./EvodMainScreen"
import Swipe from "./Swipe"
import Utils from "./Utils"
export let licenceEIN

class VehiclesAndDrivers {

    get addVehicle() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/ll_addremove_selection_add"]')
    }
    get vehicleNumberInsert() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/et_layout_edittext_vehicle"]')
    }
    get HKVType() {
        return $('//*[@text="Typ použitia HKV"]')
    }
    get isDriverInVehicle() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/sc_fragment_evod_vehicle_change_driver"]')
    }
    get trainDriverInput() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/tv_layout_edittext_text" and contains(@text, "Rušňovodič")]')
    }
    get trainDriverNumberSelector() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/tv_layout_edittext_text" and contains(@text, "Osobné číslo")]')
    }
    get trainDriverNumberInput() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/et_evod_input"]')
    }
    get evodInputSave() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/btn_evod_input_save"]')
    }
    get windowUpConfirm() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/iv_confirm"]')
    }
    get licenceEINSelector() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/et_evod_vehicle_driver_ein"]')
    }
    get vehicleChangeConfirm() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/b_vehicle_change_confirm"]')
    }
    get vehiclesAndDriversConfirmBtn() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/iv_addremove_selection_confirm"]')
    }
    get vehiclesAndDriversFilterSettings() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/iv_evod_vehicles_filter_settings"]')
    }

    async addVehiclesObratVlaku(HKVVehicleNumberFirst, HKVVehicleNumberLast) {
        await EvodMainScreen.vehiclesAndDriversOpenClick()
        await this.vehiclesAndDriversFilterSettings.click()
        await $('//*[@text="Obrat vlaku"]').click()

        const numberOfVehicles = await $$('//*[@resource-id="sk.prosoft.ptt.pop:id/rl_item_addremove_selection"]').length
        const firstVehicle = await $('//*[@resource-id="sk.prosoft.ptt.pop:id/rl_item_addremove_selection"][1]//*[@resource-id="sk.prosoft.ptt.pop:id/rl_item_vehicles_addremove_selection"]//*[@resource-id="sk.prosoft.ptt.pop:id/tv_item_vehicles_addremove_selection"]')
        const lastVehicle = await $('//*[@resource-id="sk.prosoft.ptt.pop:id/rl_item_addremove_selection"][' + numberOfVehicles + ']//*[@resource-id="sk.prosoft.ptt.pop:id/rl_item_vehicles_addremove_selection"]//*[@resource-id="sk.prosoft.ptt.pop:id/tv_item_vehicles_addremove_selection"]')
        expect(await firstVehicle.getText()).toEqual(await Utils.convertHKVVehicleNumber(HKVVehicleNumberLast.HKVVehicleNumber))
        expect(await lastVehicle.getText()).toEqual(await Utils.convertHKVVehicleNumber(HKVVehicleNumberFirst.HKVVehicleNumber))

        await firstVehicle.click()
        await this.fillHKVInputs(HKVVehicleNumberFirst)

        await lastVehicle.click()
        await $('//*[@text="Typ použitia HKV"]').click()
        await $('//*[@text="' + HKVVehicleNumberLast.HKVType + '"]').click()
        await this.fillHKVInputs(HKVVehicleNumberLast)
        // Potvrdiť Vozidlá a rušňovodiči
        await this.vehiclesAndDriversConfirmBtn.click()
    }


    async addHKVVehiclesAndDrivers(HKVVehicles) {
        await EvodMainScreen.vehiclesAndDriversOpenClick()

        for (const HKVVehicle of HKVVehicles) {
            await this.addVehicleFunction(HKVVehicle.HKVVehicleNumber)
            await this.fillHKVInputs(HKVVehicle)
            // Potvrdiť Vozidlá a rušňovodiči
        }
        await this.vehiclesAndDriversConfirmBtn.click()
    }

    async fillHKVInputs(HKVVehicle) {
        //Typ použitia HKV

        await this.HKVType.click()
        let selectHKVType = await $('//*[@text="' + HKVVehicle.HKVType + '"]')
        await selectHKVType.click()

        //Rušňovodič
        if (await HKVVehicle.trainDriverNumber !== (undefined || "")) {
            if (!await this.isDriverInVehicle.isEnabled()) {
                await this.isDriverInVehicle.click()
            }
            await expect(this.isDriverInVehicle).toBeEnabled()
            await Swipe.swipeUpAllScreen()
            await this.trainDriverInput.waitForDisplayed()
            await this.trainDriverInput.click()

            //Osobné číslo rušňovodiča
            await expect(this.windowUpConfirm).toBeDisabled()
            await this.trainDriverNumberSelector.click()
            await expect(this.evodInputSave).toBeDisabled()
            await this.trainDriverNumberInput.setValue(HKVVehicle.trainDriverNumber)
            await expect(this.evodInputSave).toBeEnabled()
            await this.evodInputSave.click()

            //Kontrola EIN licencie
            licenceEIN = await this.licenceEINSelector.getText()
            await expect(this.windowUpConfirm).toBeEnabled()
            await this.windowUpConfirm.click()

            //Zaradenie rušňovodiča - HKV, POTVRDIŤ
            await expect($('android=new UiSelector().className("android.widget.LinearLayout").childSelector(new UiSelector().resourceId("sk.prosoft.ptt.pop:id/tv_layout_edittext_text").textContains("' + licenceEIN + '"))')).toBeDisplayed()
        }
        else {
            if (await this.isDriverInVehicle.isEnabled()) {
                await this.isDriverInVehicle.click()
            }
        }
        while (!await this.vehicleChangeConfirm.isDisplayed()) {
            await Swipe.swipeUpAllScreen()
        }
        await this.vehicleChangeConfirm.click()
        await expect(this.vehiclesAndDriversConfirmBtn).toBeEnabled()

    }

    async addZKVVehicles(ZKVVehicles) {
        await EvodMainScreen.vehiclesAndDriversOpenClick()
        for (const item of ZKVVehicles) {
            await this.addVehicleFunction(item.vehicleNumber)
            while (!await this.vehicleChangeConfirm.isDisplayed()) {
                await Swipe.swipeUpAllScreen()
            }
            await this.vehicleChangeConfirm.click()
            await expect(this.vehiclesAndDriversConfirmBtn).toBeEnabled()
        }
        await this.vehiclesAndDriversConfirmBtn.click()

    }

    async addVehicleFunction(HKVVehicles) {
        //Zaradiť vozidlo
        if (!(await $('//*[@resource-id="sk.prosoft.ptt.pop:id/rl_item_addremove_selection"]').isDisplayed())) {
            await expect(this.vehiclesAndDriversConfirmBtn).toBeDisabled()
        }
        await this.addVehicle.click()
        await this.vehicleNumberInsert.setValue(HKVVehicles)
        browser.touchPerform([{
            action: 'tap',
            options: {
                x: 640,
                y: 1115
            }
        }]);
    }

}

export default new VehiclesAndDrivers