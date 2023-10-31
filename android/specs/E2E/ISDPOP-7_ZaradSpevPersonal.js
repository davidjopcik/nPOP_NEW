import { HKVVehicles_7, ISDPOP_7, ZKVVehicles_7 } from "../../data/ISDPOP-7_ZaradSprevadzPersonal";
import { TrainTeam_7 } from "../../data/ISDPOP-7_ZaradSprevadzPersonal";
import BasicFunction from "../../pageobjects/BasicFunction";
import { default as EvodMainScreen } from "../../pageobjects/EvodMainScreen";
import { default as ExpectedFunctions } from "../../pageobjects/ExpectedFunctions";
import { default as HomeScreen } from "../../pageobjects/HomeScreen";
import Overview from "../../pageobjects/Overview";
import Sob from "../../pageobjects/Sob";
import Svod from "../../pageobjects/Svod";
import TrainDeparture from "../../pageobjects/TrainDeparture";
import { default as TrainLog } from "../../pageobjects/TrainLog";
import { default as TrainNumberInsert } from "../../pageobjects/TrainNumberInsert";
import TrainTeam from "../../pageobjects/TrainTeam";
import Utils from "../../pageobjects/Utils";
import { default as VehiclesAndDrivers } from "../../pageobjects/VehiclesAndDrivers";

const testData = ISDPOP_7
const HKVVehicles = HKVVehicles_7
const ZKVVehicles = ZKVVehicles_7
const TrainTeamData = TrainTeam_7


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
        await VehiclesAndDrivers.addHKVVehiclesAndDrivers(HKVVehicles)
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

describe('Zaradenie Sprevádzajúceho personál', () => {
    it('Zadanie stanice zmeny', async () => {
        await EvodMainScreen.enrollStation(testData.stationOfChange)
    });


    it('Zaradenie sprevádzajúceho personálu', async () => {
        await EvodMainScreen.sprevPersonalClick()
        await TrainTeam.expectDataInTrainTeam(testData)
        await TrainTeam.addTrainTeamItem(TrainTeamData, testData)
    });

    it('Kontrola záznamov v prehľade zmien', async () => {
        await EvodMainScreen.overviewBtnClick()
        await Overview.checkTrainTeam(testData, TrainTeamData)
        await BasicFunction.backBtnClick()
    });

});

describe('Sync, Ukončenie', () => {
    it('Synchronizácia', async () => {
        await EvodMainScreen.mainEvodSyncClick()
        await ExpectedFunctions.syncAfterChangeButtonsDisabled()
    });

    it('Ukončenie Hlavného súpisu', async () => {
        await TrainLog.trainLogClose(testData.trainLogEndStation)
        await ExpectedFunctions.EvodOpenButtonsDisabled()
    });
});





