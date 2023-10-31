import { evodHlavneMenu, mimoriadnosti, odchodVlaku, pripravnySupis, sob, sprevPersonal, supisVLaku, svod, synchronizacia, vozidlaARus, zavadyMimoSupis } from "../../selectors.config";
import BasicFunction from "../pageobjects/BasicFunction.js";
import EvodMainScreen from "../pageobjects/EvodMainScreen";
import ExpectedFunctions from "../pageobjects/ExpectedFunctions";
import HomeScreen from "../pageobjects/HomeScreen";
import OpenApp from "../pageobjects/OpenApp";
import Sob from "../pageobjects/Sob";
import Svod from "../pageobjects/Svod";
import TrainDeparture from "../pageobjects/TrainDeparture";
import TrainLog from "../pageobjects/TrainLog";
import TrainNumberInsert from "../pageobjects/TrainNumberInsert";
import VehiclesAndDrivers from "../pageobjects/VehiclesAndDrivers";

export let testData = {
    userName: "89",
    password: "Aa1234567",
    role: "Sprievodca POP vo Vlaku",
    trainCheifContact: "+421123456789",
    trainNumber: "600",
    vehicles: "955678120028",
    HKVType: "V - vlakové",
    trainDriverNumber: "1714",
    vehicleWagonorderBreakpercentage: "85",
    trainBreakingMode: "R+Mg",
    trainLogEndStation: "Bratislava hl.",
}


describe('TEST"', () => {

    it('Otvorenie app', async () => {
        await OpenApp.restarteApp()
    });

    it('Login',async () => {
        await HomeScreen.Login(testData.userName, testData.password, testData.role)
    });

    it('Kmeňové č. vlaku a násled',async () => {
        await TrainNumberInsert.trainAndDateSelect(testData.trainNumber)
    });

    it('Evod otvorenie',async () => {
        await EvodMainScreen.evodOpen()
        await ExpectedFunctions.EvodOpenButtonsDisabled()
    });

    it('Súpis vlaku',async () => {
        await TrainLog.trainLogOpen(testData.trainCheifContact)
        await ExpectedFunctions.supisVlakuButtonsDisabled()
    });

    it('Vozidlá a rušňovodiči',async () => {
        await VehiclesAndDrivers.addVehiclesAndDrivers(testData.vehicles, testData.HKVType, testData.trainDriverNumber)
        await ExpectedFunctions.vozidlaARusButtonsDisabled()
    });

    it('SVOD',async () => {
        await Svod.svod(testData.vehicleWagonorderBreakpercentage, testData.trainBreakingMode)
        await ExpectedFunctions.svodButtonsDisabled()
    });

    xit('Zrušenie Hl. súpisu',async () => {
        await TrainLog.trainLogCancel()
    });

    it('SOB',async () => {
        await Sob.sob()
        await ExpectedFunctions.sobButtonsDisabled()
    });

    it('Odchod vlaku',async () => {
        await TrainDeparture.trainDeparture()
        await ExpectedFunctions.odchodVlakuButtonsDisabled()
    });

    it('Sync',async () => {
        await EvodMainScreen.mainEvodSyncClick()
        await ExpectedFunctions.syncButtonsDisabled()
    });

    it('Ukončenie Hlavného súpisu',async () => {
        await TrainLog.trainLogClose(testData.trainLogEndStation)
        await ExpectedFunctions.EvodOpenButtonsDisabled()
    });
});
