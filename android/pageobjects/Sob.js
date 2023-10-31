import BasicFunction from "./BasicFunction.js"
import EvodMainScreen from "./EvodMainScreen"
import Svod from "./Svod"
import Swipe from "./Swipe"
import Utils from "./Utils"

class Sob {
    
    get sobVehiclesSelector() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/tv_fragment_evod_sob_report_title2" and contains(@text, "Vozidlá s vyskúšanou ručnou brzdou")]')
    } 
    get selectAll() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/ll_addremove_selection_extra"]')
    } 
    get confirmVehiclesSob() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/iv_addremove_selection_confirm"]')
    }
    get confirmSob() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/btn_vcd_ticket_payment_confirm" and contains(@text, "POTVRDIŤ")]')
    } 



    async sob(){
        await EvodMainScreen.sobOpenClick()
        await this.sobVehiclesSelector.click()
        await this.selectAll.click()
        await this.confirmVehiclesSob.click()

        if(!await this.confirmSob.isDisplayed()) {
            await Swipe.swipeIntoView(await this.confirmSob)
        }
        
        await this.confirmSob.click()
        await BasicFunction.waitForProgressBar()
        await Svod.printPrintButtonExpect()
        await Svod.printClose()
    }
    
}

export default new Sob()