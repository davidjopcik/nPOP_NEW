import { user_data } from "../../constant.config";

export const ISDPOP_14 = {
    userName: user_data.username,
    password: user_data.userpassword,
    role: "Sprievodca POP vo Vlaku",
    trainCheifContact: "+421123456789",
    trainNumber: "941",
    vehicleWagonorderBreakpercentage: "80",
    trainBreakingMode: "R+Mg",
    trainLogEndStation_first: "Zvolen",
    trainLogEndStation_last: "Vrútky",
    stationOfChange: "Martin",
    prepatoryTrainNumber: "943",
    prepatoryTrainDate: "ZAJTRA",
}

export const ISDPOP_14_change = {
    trainNumber: "942",
}

export const HKVVehicles_14_1 = [
    {
        HKVVehicleNumber: "945606618078",
        HKVType: "V - vlakové",
        trainDriverNumber: "1714",
        vehicleWagonorderBreakpercentage: "96",
        trainBreakingMode: "R",
    }
]

export const HKVVehicles_14_2 = [
    {
        HKVVehicleNumber: "955678120028",
        HKVType: "Po - postrk",
        trainDriverNumber: "19918",
        vehicleWagonorderBreakpercentage: "96",
        trainBreakingMode: "R",
    }
]

export const ZKVVehicles_14 = [
    {
        vehicleNumber: "615688700173",
        isDefect: true,
        konstrukcnyCelok: "POJAZD",
        druhZavady: "180 - Dvojkolesie",
        detailnyPopisZavady: "test zavady",
        stationOfDefect: "Čeľovce",
        dopadNaVozen: "Vozeň vyprázdniť",
        zmenaUdajovVozidla: true,
        stavVozna: "Vyprázdnený",
        fotografie: "0"

    },
    {
        vehicleNumber: "615688700132"
    },
    {
        vehicleNumber: "615688700157",
    },
]

