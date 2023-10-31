const { hlavnySupis } = require("../../../selectors.config");
const { ISDPOP_4, HKVVehicles_4 } = require("../../data/ISDPOP-4_PS_OtvorenieAZrusenie_data");
const { default: EvodMainScreen } = require("../../pageobjects/EvodMainScreen");
const { default: ExpectedFunctions } = require("../../pageobjects/ExpectedFunctions");
const { default: HomeScreen } = require("../../pageobjects/HomeScreen");
const { default: Sob } = require("../../pageobjects/Sob");
const { default: Svod } = require("../../pageobjects/Svod");
const { default: TrainLog } = require("../../pageobjects/TrainLog");
const { default: TrainNumberInsert } = require("../../pageobjects/TrainNumberInsert");
const { default: VehiclesAndDrivers } = require("../../pageobjects/VehiclesAndDrivers");

const testData = ISDPOP_4
const HKVVehicles_FIRST = HKVVehicles_4


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

    it('Prepnutie sa do Hlavného súpisu',async () => {
        await TrainLog.changeToMainTrainlog()
        await ExpectedFunctions.EvodAndPSOpenButtonsDisabled()

    });

    it('Prepnutie sa Prípravného súpisu',async () => {
        await TrainLog.changeToPrepTrainlog()
        await ExpectedFunctions.PSvozidlaARusButtonsDisabled()
    });

    it('Zrušenie Prípravného súpisu',async () => {
        await TrainLog.prepatoryTrainlogCancel()
        await ExpectedFunctions.EvodOpenButtonsDisabled()
    });

});