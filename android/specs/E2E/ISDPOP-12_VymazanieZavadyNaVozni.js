import { HKVVehicles_12, ISDPOP_12,  ZKVVehicles_12 } from "../../data/ISDPOP-12_VymazanieZavadyNaVozni_data";
import { default as EvodMainScreen } from "../../pageobjects/EvodMainScreen";
import { default as ExpectedFunctions } from "../../pageobjects/ExpectedFunctions";
import { default as HomeScreen } from "../../pageobjects/HomeScreen";
import Overview from "../../pageobjects/Overview";
import Sob from "../../pageobjects/Sob";
import Svod from "../../pageobjects/Svod";
import TrainDeparture from "../../pageobjects/TrainDeparture";
import { default as TrainLog } from "../../pageobjects/TrainLog";
import { default as TrainNumberInsert } from "../../pageobjects/TrainNumberInsert";
import VehicleDefects from "../../pageobjects/VehicleDefects";
import { default as VehiclesAndDrivers } from "../../pageobjects/VehiclesAndDrivers";

const testData = ISDPOP_12
const HKVVehicles_FIRST = HKVVehicles_12
const ZKVVehicles = ZKVVehicles_12

describe('Hlavný súpis - Otvorenie', () => {

    it('Otvorenie aplikácie nPOP a prihlásenie', async () => {
        await HomeScreen.OpenAndLogin(testData.userName, testData.password, testData.role)
    });

    it('Kmeňové číslo vlaku a násled', async () => {
        await TrainNumberInsert.trainAndDateSelect(testData.trainNumber)
    });

    it('Otvorenie modulu EVOD', async () => {
        await EvodMainScreen.evodOpen()
        await ExpectedFunctions.EvodOpenButtonsDisabled()
    });

    it('Hlavný súpis vlaku - otvorenie ', async () => {
        await TrainLog.trainLogOpen(testData.trainCheifContact)
        await ExpectedFunctions.supisVlakuButtonsDisabled()
    });

    it('Vozidlá a rušňovodiči - zaradenie HKV vozidiel a rušňovodiča', async () => {
        await VehiclesAndDrivers.addHKVVehiclesAndDrivers(HKVVehicles_FIRST)
        await ExpectedFunctions.vozidlaARusButtonsDisabled()
    });

    it('Vozidlá a rušňovodiči - zaradenie ZKV vozidiel', async () => {
        await VehiclesAndDrivers.addZKVVehicles(ZKVVehicles)
        await ExpectedFunctions.vozidlaARusButtonsDisabled()
    });

    it('SVOD', async () => {
        await Svod.svod(testData.vehicleWagonorderBreakpercentage, testData.trainBreakingMode)
        await ExpectedFunctions.svodButtonsDisabled()
    });

    it('SOB', async () => {
        await Sob.sob()
        await ExpectedFunctions.sobButtonsDisabled()
    });

    it('Odchod vlaku', async () => {
        await TrainDeparture.trainDeparture()
        await ExpectedFunctions.odchodVlakuButtonsDisabled()
    });
});

describe('Závady na vozňoch', () => {
    it('Zadanie stanice zmeny', async () => {
        await EvodMainScreen.enrollStation(testData.stationOfChange)
    });

    it('Zadanie závady na vozni a kontrola v prehľade záznamov', async () => {

        for (const ZKVVehicle of ZKVVehicles) {
            if (ZKVVehicle.isDefect) {
                await EvodMainScreen.VehicleDefectsClick()
                await VehicleDefects.AddVehicleDefects(ZKVVehicle)
                await Overview.checkDefectsOnWagons(ZKVVehicle, testData)
            }
        }
    });

    it('SVOD', async () => {
        await Svod.svod(testData.vehicleWagonorderBreakpercentage, testData.trainBreakingMode)
        await ExpectedFunctions.svodAfterChangeButtonsDisabled()
    });

    it('SOB', async () => {
        await Sob.sob()
        await ExpectedFunctions.sobAfterChangeButtonsDisabled()
    });
});

describe('Vymazanie poslednej závady, sync a Ukončenie', () => {
    it('Vymazanie posledného záznamu - závady', async () => {
        await EvodMainScreen.overviewBtnClick()
        await Overview.deleteLastItem(ZKVVehicles[ZKVVehicles.length - 1])

    });

    it('Synchronizácia', async () => {
        await EvodMainScreen.mainEvodSyncClick()
        await ExpectedFunctions.syncButtonsDisabled()
    });

    it('Ukončenie Hlavného súpisu', async () => {
        await TrainLog.trainLogClose(testData.trainLogEndStation)
        await ExpectedFunctions.EvodOpenButtonsDisabled()
    });
});



