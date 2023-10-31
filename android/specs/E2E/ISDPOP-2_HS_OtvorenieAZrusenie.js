const { ISDPOP_2, HKVVehicles_2 } = require("../../data/ISDPOP-2_HS_OtvorenieAZrusenie_data");
const { default: EvodMainScreen } = require("../../pageobjects/EvodMainScreen");
const { default: ExpectedFunctions } = require("../../pageobjects/ExpectedFunctions");
const { default: HomeScreen } = require("../../pageobjects/HomeScreen");
const { default: Svod } = require("../../pageobjects/Svod");
const { default: TrainLog } = require("../../pageobjects/TrainLog");
const { default: TrainNumberInsert } = require("../../pageobjects/TrainNumberInsert");
const { default: VehiclesAndDrivers } = require("../../pageobjects/VehiclesAndDrivers");

const testData = ISDPOP_2
const HKVVehicles_FIRST = HKVVehicles_2


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

    it('Zrušenie hlavného súpisu vlaku',async () => {
        await TrainLog.trainLogCancel()
        await ExpectedFunctions.EvodOpenButtonsDisabled()
    });
    
    it('Synchronizácia',async () => {
        await EvodMainScreen.mainEvodSyncClick()
        await ExpectedFunctions.EvodOpenButtonsDisabled()
    });

});