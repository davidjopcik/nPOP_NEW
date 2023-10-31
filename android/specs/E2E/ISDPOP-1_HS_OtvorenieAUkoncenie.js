import { HKVVehicles_1, ISDPOP_1 } from "../../data/ISDPOP-1_HS_OtvorenieAUkoncenie_data";
import { default as EvodMainScreen } from "../../pageobjects/EvodMainScreen";
import { default as ExpectedFunctions } from "../../pageobjects/ExpectedFunctions";
import { default as HomeScreen } from "../../pageobjects/HomeScreen";
import Sob from "../../pageobjects/Sob";
import Svod from "../../pageobjects/Svod";
import TrainDeparture from "../../pageobjects/TrainDeparture";
import { default as TrainLog } from "../../pageobjects/TrainLog";
import { default as TrainNumberInsert } from "../../pageobjects/TrainNumberInsert";
import { default as VehiclesAndDrivers } from "../../pageobjects/VehiclesAndDrivers";

const testData = ISDPOP_1
const HKVVehicles_FIRST = HKVVehicles_1

describe('Hlavný súpis - Otvorenie, sync a ukončenie', () => {

    it('Otvorenie aplikácie nPOP a prihlásenie',async () => {
        await HomeScreen.OpenAndLogin(testData.userName, testData.password, testData.role)
    });

    it('Kmeňové číslo vlaku a násled',async () => {
        await TrainNumberInsert.trainAndDateSelect(testData.trainNumber) 
    });

    it('Otvorenie modulu EVOD',async () => {
        await EvodMainScreen.evodOpen()
        await ExpectedFunctions.EvodOpenButtonsDisabled()
    });

    it('Hlavný súpis vlaku - otvorenie ',async () => {
        await TrainLog.trainLogOpen(testData.trainCheifContact)
        await ExpectedFunctions.supisVlakuButtonsDisabled()
    });

    it('Vozidlá a rušňovodiči - zaradenie vozidiel a rušňovodiča',async () => {
        await VehiclesAndDrivers.addHKVVehiclesAndDrivers(HKVVehicles_FIRST)
        await ExpectedFunctions.vozidlaARusButtonsDisabled()
    });

    it('SVOD',async () => {
        await Svod.svod(testData.vehicleWagonorderBreakpercentage, testData.trainBreakingMode)
        await ExpectedFunctions.svodButtonsDisabled()
    });

    it('SOB',async () => {
        await Sob.sob()
        await ExpectedFunctions.sobButtonsDisabled()
    });

    it('Odchod vlaku',async () => {
        await TrainDeparture.trainDeparture()
        await ExpectedFunctions.odchodVlakuButtonsDisabled()
    });

    it('Synchronizácia',async () => {
        await EvodMainScreen.mainEvodSyncClick()
        await ExpectedFunctions.syncButtonsDisabled()
    });

    it('Ukončenie Hlavného súpisu',async () => {
        await TrainLog.trainLogClose(testData.trainLogEndStation)
        await ExpectedFunctions.EvodOpenButtonsDisabled()
    });

});