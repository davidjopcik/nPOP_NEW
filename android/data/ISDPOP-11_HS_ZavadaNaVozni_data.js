import { user_data } from "../../constant.config";

export const ISDPOP_11 = {
    userName: user_data.username,
    password: user_data.userpassword,
    role: "Sprievodca POP vo Vlaku",
    trainCheifContact: "+421123456789",
    trainNumber: "1905",
    HKVVehicles: "945606618078",
    HKVType: "V - vlakové",
    trainDriverNumber: "1714",
    vehicleWagonorderBreakpercentage: "80",
    trainBreakingMode: "R+Mg",
    trainLogEndStation: "Strážske",
    stationOfChange: "Čeľovce"
}

export const HKVVehicles_11 = [
    {
        HKVVehicleNumber: "945606618078",
        HKVType: "V - vlakové",
        trainDriverNumber: "1714",
        vehicleWagonorderBreakpercentage: "80",
        trainBreakingMode: "R+Mg",
    }
]

export const ZKVVehicles_11 = [
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
]

