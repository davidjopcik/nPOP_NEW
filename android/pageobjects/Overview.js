import BasicFunction from "./BasicFunction.js"
import EvodMainScreen from "./EvodMainScreen"
import Svod from "./Svod"
import Utils from "./Utils"

class Overview {
    get trainChangesBtnSelector() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/trainChanges"]')
    }
    get trainChangesItemSelector() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/rv_item_trainchanges_item"]')
    }
    get trainChangesGroupSelector() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/rv_item_trainchanges_group"]')
    }
    get defectsOnWagonsSelector() {
        return $('//*[@text="Závady na vozňoch"]')
    }
    get trainChangesDeleteGroupSelector() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/rv_item_trainchanges_group"]//*[@resource-id="sk.prosoft.ptt.pop:id/iv_evod_trainchanges_group_delete"]')
    }
    get trainChangesDeleteSelector() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/rv_item_trainchanges_item"]//*[@resource-id="sk.prosoft.ptt.pop:id/iv_evod_trainchanges_item_delete"]')
    }

    async rollBarItem(itemText) {
        return await $('//*[@resource-id="sk.prosoft.ptt.pop:id/tv_item_trainchanges_group" and (@text = "' + itemText + '")]')
    }

    async assertTrainNumberInHeadTrainChanges(testData) {
        await expect(await $('//*[@resource-id="sk.prosoft.ptt.pop:id/inc_activity_evod_trainchanges_header"]//*[@class="android.widget.RelativeLayout"]//*[@class="android.widget.TextView" and contains (@text, "' + testData + '")]')).toBeDisplayed()
    }
    async assertTrainNumberInHeadOverview(testData) {
        await expect(await $('//*[@resource-id="sk.prosoft.ptt.pop:id/in_activity_evod_changes_overview"]//*[@class="android.widget.RelativeLayout"]//*[@class="android.widget.TextView" and contains (@text, "' + testData + '")]')).toBeDisplayed()
    }


    /* Methods */

    async checkTrainTeam(testData, TrainTeamData) {

        await this.assertTrainNumberInHeadOverview(testData.trainNumber)
        await this.trainChangesBtnSelector.click()
        await EvodMainScreen.expectScreenHeadName("Zmeny vo vlaku")
        await this.assertTrainNumberInHeadTrainChanges(testData.trainNumber)
        for (const Trainer of TrainTeamData) {
            await expect(await $('//*[@resource-id="sk.prosoft.ptt.pop:id/rv_item_trainchanges_item"]//*[@resource-id="sk.prosoft.ptt.pop:id/tv_evod_trainchanges_item_title"]//*[@class="android.widget.TextView" and (@text, "Zaradenie sprievodcu")]')).toBeDisplayed()
            await expect(await $('//*[@resource-id="sk.prosoft.ptt.pop:id/rv_item_trainchanges_item"]//*[@resource-id="sk.prosoft.ptt.pop:id/tv_evod_trainchanges_item_text1" and (@text= "' + Trainer.trainerName + '")]')).toBeDisplayed()
            await expect(await $('//*[@resource-id="sk.prosoft.ptt.pop:id/rv_item_trainchanges_item"]//*[@class="android.widget.TextView" and contains(@text, "' + Trainer.trainerNumber + '")]')).toBeDisplayed()

            await $('//*[@resource-id="sk.prosoft.ptt.pop:id/rv_item_trainchanges_item"]//*[@resource-id="sk.prosoft.ptt.pop:id/tv_evod_trainchanges_item_text1" and (@text= "' + Trainer.trainerName + '")]').click()
            await EvodMainScreen.expectScreenHeadName("Zmena - detail")
            await this.expectTableDataFunction("Osobné číslo", Trainer.trainerNumber)
            await this.containTableDataFunction("Vých. ŽST", testData.stationOfChange)
            await this.expectTableDataFunction("Priezvisko", Trainer.trainerName.split(' ')[0])
            await this.expectTableDataFunction("Meno", Trainer.trainerName.split(' ')[1])
            await BasicFunction.backBtnClick()
        }
        await BasicFunction.backBtnClick()
    }

    async checkZKVVehicleAdd(testData, ZKVVehicles) {
        for (const ZKVVehicle of ZKVVehicles) {
            const vehicleNumberConverted = await Utils.convertVehicleNumber(ZKVVehicle.vehicleNumber)
            await expect(await $('//*[@resource-id="sk.prosoft.ptt.pop:id/rv_item_trainchanges_item"]//*[@resource-id="sk.prosoft.ptt.pop:id/tv_evod_trainchanges_item_title"]//*[@class="android.widget.TextView" and (@text, "Zaradenie vozidla")]')).toBeDisplayed()
            await expect(await $('//*[@resource-id="sk.prosoft.ptt.pop:id/rv_item_trainchanges_item"]//*[@resource-id="sk.prosoft.ptt.pop:id/tv_evod_trainchanges_item_text1" and (@text= "' + vehicleNumberConverted + '")]')).toBeDisplayed()

            await $('//*[@resource-id="sk.prosoft.ptt.pop:id/rv_item_trainchanges_item"]//*[@resource-id="sk.prosoft.ptt.pop:id/tv_evod_trainchanges_item_text1" and (@text= "' + vehicleNumberConverted + '")]').click()
            await EvodMainScreen.expectScreenHeadName("Zmena - detail")
            await this.expectTableDataFunction("Číslo vozidla", vehicleNumberConverted)
            await this.containTableDataFunction("Vých. ŽST", testData.stationOfChange)
            await this.containTableDataFunction("Cieľová ŽST", testData.trainLogEndStation)
            await BasicFunction.backBtnClick()
        }
    }

    async checkAllVehiclesAdd(testData, HKVVehicles_INSIDE, HKVVehicles_LAST, ZKVVehicles) {
        await this.checkDataInChangesInTrain(testData)
        await this.checkHKVVehicleAdd(testData, HKVVehicles_INSIDE, HKVVehicles_LAST)
        await this.checkZKVVehicleAdd(testData, ZKVVehicles)
        await BasicFunction.backBtnClick()
        await BasicFunction.backBtnClick()
    }

    async checkHKVVehicleAdd(testData, HKVVehicles_INSIDE, HKVVehicles_LAST) {
        const HKVVehicleALL = [HKVVehicles_INSIDE.concat(HKVVehicles_LAST)]
        for (const HKVVehicleCurrent of HKVVehicleALL) {
            for (const HKVVehicle of HKVVehicleCurrent) {
                const HKVVehicleNumberConverted = await Utils.convertHKVVehicleNumber(HKVVehicle.HKVVehicleNumber)
                const itemChanged = await $('//*[@resource-id="sk.prosoft.ptt.pop:id/rv_item_trainchanges_item"]//*[@resource-id="sk.prosoft.ptt.pop:id/tv_evod_trainchanges_item_text1" and (@text= "' + HKVVehicleNumberConverted + '")]')
                if ((await this.rollBarItem("Zmena vozidiel a rušňovodičov")) && (!await itemChanged.isDisplayed())) {
                    (await this.rollBarItem("Zmena vozidiel a rušňovodičov")).click()
                }
                await expect(await $('//*[@resource-id="sk.prosoft.ptt.pop:id/rv_item_trainchanges_item"]//*[@resource-id="sk.prosoft.ptt.pop:id/tv_evod_trainchanges_item_title"]//*[@class="android.widget.TextView" and (@text, "Zaradenie vozidla")]')).toBeDisplayed()
                await expect(await $('//*[@resource-id="sk.prosoft.ptt.pop:id/rv_item_trainchanges_item"]//*[@resource-id="sk.prosoft.ptt.pop:id/tv_evod_trainchanges_item_text1" and (@text= "' + HKVVehicleNumberConverted + '")]')).toBeDisplayed()
                await itemChanged.click()
                await EvodMainScreen.expectScreenHeadName("Zmena - detail")
                await this.expectTableDataFunction("Číslo vozidla", HKVVehicleNumberConverted)
                await this.containTableDataFunction("Vých. ŽST", testData.stationOfChange)
                await this.containTableDataFunction("Cieľová ŽST", testData.trainLogEndStation)
                await this.expectTableDataFunction("Použitie HKV", HKVVehicle.HKVType.split(' ')[0])

                //rušňovodič je až v ďalšej tabuľke Zaradenie rušňovodiča    

                await BasicFunction.backBtnClick()
            }
        }

    }

    async checkDefectsOnWagons(ZKVVehicle, testData) {
        await this.checkDefectsOnWagonsInTrainChanges(ZKVVehicle, testData)
        await this.checkPrintInDefectsOnWagons(testData)
    }

    async checkWayDiversion(testData) {
        await this.assertTrainNumberInHeadOverview(testData.trainNumber)
        await this.trainChangesBtnSelector.click()
        await EvodMainScreen.expectScreenHeadName("Zmeny vo vlaku")
        await this.assertTrainNumberInHeadTrainChanges(testData.trainNumber)

        await expect(await $('//*[@resource-id="sk.prosoft.ptt.pop:id/tv_evod_trainchanges_item_title"]//*[@class="android.widget.TextView" and (@text= "Odklon trasy")]')).toBeDisplayed()
        await expect(await $('//*[@resource-id="sk.prosoft.ptt.pop:id/tv_evod_trainchanges_item_title"]//*[@resource-id="sk.prosoft.ptt.pop:id/tv_item_trainchanges_item_subtitle" and (@text= "' + testData.stationOfChange + '")]')).toBeDisplayed()
        await expect(await $('//*[@resource-id="sk.prosoft.ptt.pop:id/tv_evod_trainchanges_item_text1" and (@text="Zo stanice: ' + testData.stationOfChange + '")]')).toBeDisplayed()
        await expect(await $('//*[@resource-id="sk.prosoft.ptt.pop:id/rv_item_trainchanges_item"]//*[@class="android.widget.TextView" and (@text="Do stanice: ' + testData.wayDiversionStationTo + '")]')).toBeDisplayed()

        await $('//*[@resource-id="sk.prosoft.ptt.pop:id/rv_item_trainchanges_item"]//*[@class="android.widget.TextView" and (@text="Do stanice: ' + testData.wayDiversionStationTo + '")]').click()

        await EvodMainScreen.expectScreenHeadName("Zmena - detail")
        await expect(await $('//*[@resource-id="sk.prosoft.ptt.pop:id/tv_evod_change_detail_title" and (@text="Odklon trasy")]')).toBeDisplayed()

        await expect(await $('//*[@class="android.widget.TextView" and (@text="Zo stanice")]//..//*[@resource-id="sk.prosoft.ptt.pop:id/tv_item_textinfo_text" and (@text,"' + testData.stationOfChange + '")]')).toBeDisplayed()
        await expect(await $('//*[@class="android.widget.TextView" and (@text="Do stanice")]//..//*[@resource-id="sk.prosoft.ptt.pop:id/tv_item_textinfo_text" and (@text,"' + testData.wayDiversionStationTo + '")]')).toBeDisplayed()

        await BasicFunction.backBtnClick()
        await BasicFunction.backBtnClick()
        await BasicFunction.backBtnClick()
    }

    async deleteLastItem(ZKVVehicle) {
        await this.trainChangesBtnSelector.click()

        if (ZKVVehicle.zmenaUdajovVozidla) {
            await this.trainChangesGroupSelector.click()
        }
        if (ZKVVehicle.zmenaUdajovVozidla) {
            await this.trainChangesDeleteGroupSelector.click()
        }
        else {
            await this.trainChangesDeleteSelector.click()
        }
        await BasicFunction.yesBtnSelector.click()
        await expect($('//*[@text="' + ZKVVehicle.vehicleNumber + '"]')).not.toBeDisplayed()
        await BasicFunction.backBtnClick()
        await BasicFunction.backBtnClick()

    }


    /* Vnútorné funkcie metód */

    async checkDataInChangesInTrain(testData) {
        await EvodMainScreen.overviewBtnClick()
        await this.assertTrainNumberInHeadOverview(testData.trainNumber)
        await this.trainChangesBtnSelector.click()
        await EvodMainScreen.expectScreenHeadName("Zmeny vo vlaku")
        await this.assertTrainNumberInHeadTrainChanges(testData.trainNumber)
    }

    async checkDefectsOnWagonsInTrainChanges(ZKVVehicle, testData) {
        await this.checkDataInChangesInTrain(testData)

        /* Všetky zmeny */
        /* Ak je dopad na vozidlo so zmenou údajov, tak zrolovatelny item */
        if (ZKVVehicle.zmenaUdajovVozidla) {
            await this.trainChangesGroupSelector.click()
        }

        await this.expectInCheckDefectsOnWagons(ZKVVehicle, testData)

        await $('//*[@text="' + await Utils.convertVehicleNumber(ZKVVehicle.vehicleNumber) + '"]//..//*[@text="Závada na vozni"]').click()
        await this.expectInChangeDetail(ZKVVehicle)


        /* Len závady */
        await $('~LEN ZÁVADY').click()
        if (ZKVVehicle.zmenaUdajovVozidla) {
            await this.trainChangesGroupSelector.click()
        }

        await this.expectInCheckDefectsOnWagons(ZKVVehicle, testData)
        await $('//*[@text="' + await Utils.convertVehicleNumber(ZKVVehicle.vehicleNumber) + '"]//..//*[@text="Závada na vozni"]').click()
        await this.expectInChangeDetail(ZKVVehicle)
        await BasicFunction.backBtnClick()
    }

    async expectInCheckDefectsOnWagons(ZKVVehicle, testData) {
        await browser.pause(1000)
        /* Kopntrola Stanice závady + delete ikonka */
        if (ZKVVehicle.zmenaUdajovVozidla) {
            await expect(await $('//*[@resource-id="sk.prosoft.ptt.pop:id/rv_item_trainchanges_group"]//*[@resource-id="sk.prosoft.ptt.pop:id/tv_item_trainchanges_group_subtitle" and contains(@text, "' + testData.stationOfChange + '")]')).toBeDisplayed()
            await expect(await this.trainChangesDeleteGroupSelector).toBeDisplayed()
        }
        else {
            await expect(await $('//*[@resource-id="sk.prosoft.ptt.pop:id/rv_item_trainchanges_item"]//*[@resource-id="sk.prosoft.ptt.pop:id/tv_item_trainchanges_item_subtitle" and contains(@text, "' + testData.stationOfChange + '")]')).toBeDisplayed()
            await expect(await this.trainChangesDeleteSelector).toBeDisplayed()
        }

        const convertedVehicleNumber = await Utils.convertVehicleNumber(ZKVVehicle.vehicleNumber);
        const convertDefectToDescipt = " - " + ZKVVehicle.druhZavady
        await expect(await $('//*[@resource-id="sk.prosoft.ptt.pop:id/rv_item_trainchanges_item"]//*[@resource-id="sk.prosoft.ptt.pop:id/tv_evod_trainchanges_item_title"]//*[@class="android.widget.TextView" and (@text, "Závada na vozni")]')).toBeDisplayed()
        await expect(await $('//*[@resource-id="sk.prosoft.ptt.pop:id/rv_item_trainchanges_item"]//*[@resource-id="sk.prosoft.ptt.pop:id/tv_evod_trainchanges_item_text1" and (@text= "' + convertedVehicleNumber + '")]')).toBeDisplayed()
        await expect(await $('//*[@resource-id="sk.prosoft.ptt.pop:id/rv_item_trainchanges_item"]//*[@class="android.widget.TextView" and contains(@text, "' + convertDefectToDescipt + '")]')).toBeDisplayed()
    }

    async expectInChangeDetail(ZKVVehicle) {
        await EvodMainScreen.expectScreenHeadName("Zmena - detail")
        await this.expectTableDataFunction("Vozidlo", await Utils.convertVehicleNumber(ZKVVehicle.vehicleNumber))
        await this.containTableDataFunction("Konštrukčný celok ŽKV", await ZKVVehicle.konstrukcnyCelok)
        await this.expectTableDataFunction("Druh závady", await ZKVVehicle.druhZavady)
        await this.expectTableDataFunction("ŽST vzniku závady", await ZKVVehicle.stationOfDefect)
        await this.expectTableDataFunction("Stav vozňa", await ZKVVehicle.stavVozna)
        await this.expectTableDataFunction("Popis závady", await ZKVVehicle.detailnyPopisZavady)
        //odkomentovat pri verzii s foto-zavad
        //await this.expectTableDataFunction("Počet fotografií", await ZKVVehicle.fotografie)


        await BasicFunction.backBtnClick()

    }

    async checkPrintInDefectsOnWagons(testData) {
        await this.defectsOnWagonsSelector.click()
        await BasicFunction.waitForProgressBar()
        await Svod.printPrintButtonExpect()
        await expect(await $('//*[@text="EVOD - Závady - tlač"]')).toBeDisplayed()
        await expect(await $('//*[contains(@text, "' + testData.trainNumber + '")]')).toBeDisplayed()
        await BasicFunction.backBtnClick()
        await BasicFunction.backBtnClick()

    }

    async expectTableDataFunction(text, data) {
        await expect(await $('//*[@text="' + text + '"]//..//*[@resource-id="sk.prosoft.ptt.pop:id/tv_item_textinfo_text"]').getText()).toEqual(data)
    }

    async containTableDataFunction(text, data) {
        const str = await $('//*[@text="' + text + '"]//..//*[@resource-id="sk.prosoft.ptt.pop:id/tv_item_textinfo_text"]').getText()
        const removeLastChar = str.substring(0, str.length - 1)
        await expect(data).toContain(removeLastChar)
    }

}

export default new Overview