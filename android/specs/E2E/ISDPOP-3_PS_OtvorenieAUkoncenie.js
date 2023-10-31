import { HKVVehicles_3, ISDPOP_3 } from "../../data/ISDPOP-3_PS_OtvorenieAUkoncenie_data";
import EvodMainScreen from "../../pageobjects/EvodMainScreen";
import ExpectedFunctions from "../../pageobjects/ExpectedFunctions";
import HomeScreen from "../../pageobjects/HomeScreen";
import Sob from "../../pageobjects/Sob";
import Svod from "../../pageobjects/Svod";
import TrainLog from "../../pageobjects/TrainLog";
import TrainNumberInsert from "../../pageobjects/TrainNumberInsert";
import VehiclesAndDrivers from "../../pageobjects/VehiclesAndDrivers";

const testData = ISDPOP_3
const HKVVehicles_FIRST = HKVVehicles_3


describe('PRÍPRAVNÝ SÚPIS - Otvorenie, sync a ukončenie', () => {

    it('Otvorenie aplikácie nPOP a prihlásenie',async () => {
        await HomeScreen.OpenAndLogin(testData.userName, testData.password, testData.role)
    });

    it('Kmeňové číslo vlaku a násled',async () => {
        await TrainNumberInsert.trainAndDateSelect(testData.trainNumber, testData.trainDate) 
    });

    it('Otvorenie modulu EVOD',async () => {
        await EvodMainScreen.evodOpen()
        await ExpectedFunctions.EvodOpenButtonsDisabled()
    });

    it('Prípravný súpis vlaku - otvorenie ',async () => {
        await TrainLog.prepatoryTrainLogOpen(testData.prepatoryTrainNumber, testData.prepatoryTrainDate)
        await ExpectedFunctions.PSVlakuButtonsDiabled()
    });

    it('Vozidlá a rušňovodiči - zaradenie vozidiel a rušňovodiča',async () => {
        await VehiclesAndDrivers.addHKVVehiclesAndDrivers(HKVVehicles_FIRST)
        await ExpectedFunctions.PSvozidlaARusButtonsDisabled()
    });

    it('SVOD',async () => {
        const isPrepatoryTrainlog = true
        await Svod.svod(testData.vehicleWagonorderBreakpercentage, testData.trainBreakingMode, isPrepatoryTrainlog)
        await ExpectedFunctions.PSsvodButtonsDisabled()
    });

    it('SOB',async () => {
        await Sob.sob()
        await ExpectedFunctions.PSsobButtonsDisabled()
    });
    
    it('Synchronizácia',async () => {
        await EvodMainScreen.mainEvodSyncClick()
        await ExpectedFunctions.PSsobButtonsDisabled()
    });

    it('Ukončenie Prípravného súpisu',async () => {
        await TrainLog.prepatoryTrainlogClose()
        await ExpectedFunctions.EvodOpenButtonsDisabled()
    });
    
});