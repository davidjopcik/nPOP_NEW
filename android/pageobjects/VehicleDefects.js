import BasicFunction from "./BasicFunction.js";
import EvodMainScreen from "./EvodMainScreen"
import Swipe from "./Swipe";
import Utils from "./Utils";

class VehicleDefects {
    get konstrukcnyCelokSelector() {
        return $('//*[(@text = "Konštrukčný celok")]')
    }
    get detailnyPopisZavadySelector() {
        return $('//*[(@text = "Detailný popis závady")]')
    }
    get druhZavadySelector() {
        return $('//*[(@text = "Druh závady")]')
    }
    get ZSTVznikuZavadySelector() {
        return $('//*[(@text = "ŽST vzniku závady")]')
    }

    async SelectVehicleToAddDefect(vehicleNumber) {
        await $('//*[@resource-id="sk.prosoft.ptt.pop:id/tv_item_vehicles_addremove_selection" and contains(@text, "' + vehicleNumber + '")]').click()
    }
    

    /* Hlavné funkcie */

    async AddVehicleDefects(ZKVVehicle) {
                console.log(ZKVVehicle);
                const convertedVehicleNumber = await Utils.convertVehicleNumber(ZKVVehicle.vehicleNumber);
                console.log(convertedVehicleNumber); // Vypíše "61 56 88-70 017-3"
                await this.SelectVehicleToAddDefect(convertedVehicleNumber)
                await this.FillDefectInfo(ZKVVehicle)
                await BasicFunction.backSelector.click()
    }


    /* Vnútorné funkcie */

    async FillDefectInfo(ZKVVehicle) {
        await browser.pause(1000)
        await this.konstrukcnyCelokSelector.click()
        await BasicFunction.clickOnSelector(ZKVVehicle.konstrukcnyCelok)
        await this.druhZavadySelector.click()
        await BasicFunction.clickOnSelector(ZKVVehicle.druhZavady)
        await this.detailnyPopisZavadySelector.setValue(ZKVVehicle.detailnyPopisZavady)
        await this.ZSTVznikuZavadySelector.click()
        await BasicFunction.clickOnSelector(ZKVVehicle.stationOfDefect)
        await Swipe.swipeIntoView(BasicFunction.confirmBtnSelector)
        await BasicFunction.clickOnSelector(ZKVVehicle.dopadNaVozen)
        await BasicFunction.confirmBtnClick()
    }



}
export default new VehicleDefects