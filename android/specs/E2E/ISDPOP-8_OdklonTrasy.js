import { ISDPOP_8, HKVVehicles_8, ZKVVehicles_8 } from "../../data/ISDPOP-8_OdklonTrasy_data";
import Emergencies from "../../pageobjects/Emergencies";
import EvodMainScreen from "../../pageobjects/EvodMainScreen";
import ExpectedFunctions from "../../pageobjects/ExpectedFunctions";
import HomeScreen from "../../pageobjects/HomeScreen";
import Overview from "../../pageobjects/Overview";
import Sob from "../../pageobjects/Sob";
import Svod from "../../pageobjects/Svod";
import TrainDeparture from "../../pageobjects/TrainDeparture";
import TrainLog from "../../pageobjects/TrainLog";
import TrainNumberInsert from "../../pageobjects/TrainNumberInsert";
import VehiclesAndDrivers from "../../pageobjects/VehiclesAndDrivers";

const testData = ISDPOP_8
const HKVVehicles_FIRST = HKVVehicles_8
const ZKVVehicles = ZKVVehicles_8

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

    it('Zadanie stanice zmeny', async () => {
        await EvodMainScreen.enrollStation(testData.stationOfChange)
    });
});

describe('Mimoriadnosti - Odklon trasy', () => {
    it('Odklon trasy', async () => {
        await EvodMainScreen.emergenciesBtnClick()
        await Emergencies.wayDiversion(testData)
    });
    it('Kontrola v prehľade zmien',async () => {
        await EvodMainScreen.overviewBtnClick()
        await Overview.checkWayDiversion(testData)        
    });
});

describe('Synchronizácia + Ukončenie Hl. súpisu', () => {
    it('Synchronizácia',async () => {
        await EvodMainScreen.mainEvodSyncClick()
        await ExpectedFunctions.syncAfterChangeButtonsDisabled()
    });
    it('Ukončenie Hl. súpisu',async () => {
        await TrainLog.trainLogClose(testData.trainLogEndStation)
        await ExpectedFunctions.EvodOpenButtonsDisabled()
    });
});





