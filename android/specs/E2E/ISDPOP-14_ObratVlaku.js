import { HKVVehicles_14_1, HKVVehicles_14_2, ISDPOP_14, ISDPOP_14_change, ZKVVehicles_14 } from "../../data/ISDPOP-14_ObratVlaku";
import BasicFunction from "../../pageobjects/BasicFunction.js";
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

const testData = ISDPOP_14
const testData_change = ISDPOP_14_change
const HKVVehicles_FIRST = HKVVehicles_14_1
const ZKVVehicles = ZKVVehicles_14
const HKVVehicles = HKVVehicles_14_2

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
        await VehiclesAndDrivers.addZKVVehicles(ZKVVehicles)
        await ExpectedFunctions.vozidlaARusAfteChancgeButtonsDisabled()
    });

    it('Vozidlá a rušňovodiči - zaradenie posledného HKV vozidla a rušňovodiča', async () => {
        await VehiclesAndDrivers.addHKVVehiclesAndDrivers(HKVVehicles)
        await ExpectedFunctions.vozidlaARusAfteChancgeButtonsDisabled()
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

describe('Sync a Ukončenie', () => {
    it('Synchronizácia', async () => {
        await EvodMainScreen.mainEvodSyncClick()
        await ExpectedFunctions.syncAfterChangeButtonsDisabled()
    });

    it('Ukončenie Hlavného súpisu', async () => {
        await TrainLog.trainLogClose(testData.trainLogEndStation_first)
        await ExpectedFunctions.EvodOpenButtonsDisabled()
    });
});

describe('Zmena čísla vlaku', () => {
    it('Zmena čísla vlaku', async () => {
        await BasicFunction.backBtnClick()
        await HomeScreen.changeTrainNumber(testData.trainNumber,testData_change.trainNumber)
    });

    it('Otvorenie modulu EVOD', async () => {
        await EvodMainScreen.evodOpen()
        await ExpectedFunctions.EvodOpenButtonsDisabled()
    });

});

describe('Hlavný súpis - Obrat vlaku', () => {
    
    it('Hlavný súpis vlaku - otvorenie ', async () => {
        await TrainLog.trainLogOpen(testData.trainCheifContact)
        await ExpectedFunctions.supisVlakuButtonsDisabled()
    });

    it('Vozidlá a rušňovodiči - zaradenie HKV vozidiel a rušňovodiča', async () => {
        await VehiclesAndDrivers.addVehiclesObratVlaku(HKVVehicles_FIRST[0], HKVVehicles[0])
    });
});

describe('SVOD, SOB,', () => {
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

describe('Sync, Ukončenie', () => {
    it('Synchronizácia', async () => {
        await EvodMainScreen.mainEvodSyncClick()
        await ExpectedFunctions.syncButtonsDisabled()
    });

    it('Ukončenie Hlavného súpisu', async () => {
        await TrainLog.trainLogClose(testData.trainLogEndStation_last)
        await ExpectedFunctions.EvodOpenButtonsDisabled()
    });
});





