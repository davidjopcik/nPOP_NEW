import { ISDPOP_6 } from "../../data/ISDPOP-6_ZaradenieVozidiel";
import { HKVVehicles_18_INSIDE, HKVVehicles_18_LAST, HKVVehicles_6_FIRST, HKVVehicles_6_INSIDE, HKVVehicles_6_LAST, ZKVVehicles_18_2, ZKVVehicles_6_1, ZKVVehicles_6_2 } from "../../data/ISDPOP-6_ZaradenieVozidiel";
import { default as EvodMainScreen } from "../../pageobjects/EvodMainScreen";
import { default as ExpectedFunctions } from "../../pageobjects/ExpectedFunctions";
import { default as HomeScreen } from "../../pageobjects/HomeScreen";
import Overview from "../../pageobjects/Overview";
import Sob from "../../pageobjects/Sob";
import Svod from "../../pageobjects/Svod";
import TrainDeparture from "../../pageobjects/TrainDeparture";
import { default as TrainLog } from "../../pageobjects/TrainLog";
import { default as TrainNumberInsert } from "../../pageobjects/TrainNumberInsert";
import { default as VehiclesAndDrivers } from "../../pageobjects/VehiclesAndDrivers";

const testData = ISDPOP_6
const HKVVehicles_FIRST = HKVVehicles_6_FIRST
const HKVVehicles_INSIDE = HKVVehicles_6_INSIDE
const HKVVehicles_LAST = HKVVehicles_6_LAST
const ZKVVehicles_1 = ZKVVehicles_6_1
const ZKVVehicles_2 = ZKVVehicles_6_2


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

    it('Vozidlá a rušňovodiči - zaradenie prvého HKV vozidla a rušňovodiča', async () => {
        await VehiclesAndDrivers.addHKVVehiclesAndDrivers(HKVVehicles_FIRST)
        await ExpectedFunctions.vozidlaARusButtonsDisabled()
    });

    it('Vozidlá a rušňovodiči - zaradenie ZKV vozidiel', async () => {
        await VehiclesAndDrivers.addZKVVehicles(ZKVVehicles_1)
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

describe('Zaradenie vozidiel', () => {
    it('Zadanie stanice zmeny', async () => {
        await EvodMainScreen.enrollStation(testData.stationOfChange)
    });
    it('Vozidlá a rušňovodiči - zaradenie HKV vozidla a rušňovodiča - INSIDE', async () => {
        await VehiclesAndDrivers.addHKVVehiclesAndDrivers(HKVVehicles_INSIDE)
        await ExpectedFunctions.vozidlaARusAfteChancgeButtonsDisabled()
    });

    it('Vozidlá a rušňovodiči - zaradenie ZKV vozidiel - 2', async () => {
        await VehiclesAndDrivers.addZKVVehicles(ZKVVehicles_2)
        await ExpectedFunctions.vozidlaARusAfteChancgeButtonsDisabled()
    });

    it('Vozidlá a rušňovodiči - zaradenie HKV vozidla a rušňovodiča - LAST', async () => {
        await VehiclesAndDrivers.addHKVVehiclesAndDrivers(HKVVehicles_LAST)
        await ExpectedFunctions.vozidlaARusAfteChancgeButtonsDisabled()
    });
});

describe('SVOD, SOB,', () => {
    it('SVOD', async () => {
        await Svod.svod(testData.vehicleWagonorderBreakpercentage, testData.trainBreakingMode)
        await ExpectedFunctions.svodAfterChangeButtonsDisabled()
    });

    it('SOB', async () => {
        await Sob.sob()
        await ExpectedFunctions.sobAfterChangeButtonsDisabled()
    });
});

describe('Prehľad zmien', () => {
    it('Prehľad zmien - kontrola', async () => {
        await Overview.checkAllVehiclesAdd(testData, HKVVehicles_INSIDE, HKVVehicles_LAST, ZKVVehicles_2)
    });
});

describe('Sync, Ukončenie', () => {
    it('Synchronizácia', async () => {
        await EvodMainScreen.mainEvodSyncClick()
        await ExpectedFunctions.syncButtonsDisabled()
    });

    it('Ukončenie Hlavného súpisu', async () => {
        await TrainLog.trainLogClose(testData.trainLogEndStation)
        await ExpectedFunctions.EvodOpenButtonsDisabled()
    });
});





