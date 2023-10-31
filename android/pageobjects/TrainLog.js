import BasicFunction from "./BasicFunction.js"
import EvodMainScreen from "./EvodMainScreen"
import ExpectedFunctions from "./ExpectedFunctions"
import Svod from "./Svod"
import Swipe from "./Swipe"
import TrainDeparture from "./TrainDeparture"
import TrainNumberInsert from "./TrainNumberInsert"
import Utils from "./Utils.js"
export let trainDataCurrent 
export let StationFrom
export let StationTo

class TrainLog {

    get openMainTrainlogSelector(){
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/main_train_log"]')
    }
    get cancelMainTrainlogSelector(){
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/ll_main_train_log_cancel"]')
    }
    get cancelPrepatoryTrainlogSelector(){
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/ll_preparatory_train_log_cancel"]')
    }
    get closeMainTrainlogSelector(){
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/ll_main_train_log_close"]')
    }
    get openPrepatoryTrainlogSelector(){
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/preparatory_train_log"]')
    }
    get closePrepatoryTrainlogSelector(){
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/ll_preparatory_train_log_close"]')
    }
    get trainChiefContact(){
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/et_fragment_evod_train_chief_contact"]')
    }
    get trainLogOpenConfirm(){
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/btn_evod_train_log_open_confirm"]')
    }
    get trainLogCloseTime(){
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/inc_activity_evod_train_log_close_time"]')
    }
    get cancelMainTrainlogDialog(){
        return $('//*[@resource-id="android:id/message" and contains(@text, "Naozaj si prajete zrušiť súpis vlaku?")]')
    }


    // Main Trainlog

    async trainLogOpen(trainCheifContact){
        await EvodMainScreen.trainLogOpenClick()
        await this.openMainTrainlogSelector.waitForDisplayed()
        await this.openMainTrainlogSelector.click()
        await this.trainChiefContact.waitForDisplayed()
        await this.trainChiefContact.setValue(trainCheifContact)
        await Swipe.swipeUpAllScreen()

        // ---- TO DO Push to array FromStation and To Station ---- 

        trainDataCurrent = {}
        let StationFromSelector = await $('android=new UiSelector().resourceId("sk.prosoft.ptt.pop:id/ll_item_textinfo_text").index(0).childSelector(new UiSelector().resourceId("sk.prosoft.ptt.pop:id/tv_item_textinfo_text"))') 
        StationFrom = await StationFromSelector.getText()

        let StationToSelector = await $('android=new UiSelector().resourceId("sk.prosoft.ptt.pop:id/ll_item_textinfo_text").index(3).childSelector(new UiSelector().resourceId("sk.prosoft.ptt.pop:id/tv_item_textinfo_text"))')
        StationTo = await StationToSelector.getText()

        trainDataCurrent.StationFrom = StationFrom
        trainDataCurrent.StationTo = StationTo

        console.log(await trainDataCurrent);

        await expect(this.trainLogOpenConfirm).toBeEnabled()
        await this.trainLogOpenConfirm.click()
    }

    async trainLogClose(enrollStation){
        await EvodMainScreen.enrollStation(enrollStation)
        await EvodMainScreen.trainLogOpenClick()    
        await ExpectedFunctions.ukoncHlavSupisButtonsDisabled()
        await this.closeMainTrainlogSelector.click()
        
        //Ukončenie súpisu vlaku
        await this.trainLogCloseTime.click()
        await TrainDeparture.dialogTimePickerCurrent.click()
        await BasicFunction.OkButtonSelector.click()
        await BasicFunction.confirmBtnSelector.click()
        if(await BasicFunction.zapisatSelector.isDisplayed()){
            await BasicFunction.zapisatSelector.click()
        }

        //SVOD tlač
        await BasicFunction.waitForProgressBar()
        await Svod.printEnrollPrintButtonsExpect()
        await Svod.printClose()
        await ExpectedFunctions.ziadnySupisButtonsDisabled()
        await BasicFunction.closeBtn()
    }

    async trainLogCancel(){
        await EvodMainScreen.trainLogOpenClick() 
        await ExpectedFunctions.zrusHlavSupisButtonsDisabled()
        await this.cancelMainTrainlogSelector.click()   
        await expect(this.cancelMainTrainlogDialog).toBeDisplayed()
        await BasicFunction.zrusitSelector.click()
        await ExpectedFunctions.ziadnySupisButtonsDisabled()
        await BasicFunction.closeBtn()
    }

    // Prepatory Trainlog

    async prepatoryTrainLogOpen(prepatoryTrainNumber, prepatoryTrainDate){
        await EvodMainScreen.trainLogOpenClick()
        await this.openPrepatoryTrainlogSelector.waitForDisplayed()
        await this.openPrepatoryTrainlogSelector.click()
        await TrainNumberInsert.trainAndDateSelect(prepatoryTrainNumber, prepatoryTrainDate)
        await BasicFunction.confirmBtnClick()
    }

    async prepatoryTrainlogClose(){
        await EvodMainScreen.trainLogOpenClick()
        await ExpectedFunctions.ukoncPripSupisButtonsDisabled()
        await this.closePrepatoryTrainlogSelector.click()
        if(await BasicFunction.zapisatSelector.isDisplayed()){
            await BasicFunction.zapisatSelector.click()
        }
        await BasicFunction.waitForProgressBar()
        await Svod.printClose()
    }

    async prepatoryTrainlogCancel(){
        await EvodMainScreen.trainLogOpenClick()
        await ExpectedFunctions.zrusPripSupisButtonsDisabled()
        await this.cancelPrepatoryTrainlogSelector.click()
        if(await BasicFunction.zrusitSelector.isDisplayed()){
            await BasicFunction.zrusitSelector.click()
        }
        await ExpectedFunctions.ziadnySupisButtonsDisabled()
        await BasicFunction.closeBtn()
    }

    // ---- Change trainlog prepatory to main
    async changeToMainTrainlog(){
        await $('//*[@text="Hlavný súpis"]').click()
        await expect((await $('//*[@text="Prípravný súpis"]')).isDisplayed())
    }

    async changeToPrepTrainlog(){
        await $('//*[@text="Prípravný súpis"]').click()
        await expect((await $('//*[@text="Hlavný súpis"]')).isDisplayed())
    }

}

export default new TrainLog