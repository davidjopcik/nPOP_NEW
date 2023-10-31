import { user_data } from "../../constant.config";

export const ISDPOP_12 = {
    userName: user_data.username,
    password: user_data.userpassword,
    role: "Sprievodca POP vo Vlaku",
    trainCheifContact: "+421123456789",
    trainNumber: "4422",
    HKVVehicles: "955678120481",
    HKVType: "V - vlakové",
    trainDriverNumber: "1714",
    vehicleWagonorderBreakpercentage: "93",
    trainBreakingMode: "R+Mg",
    trainLogEndStation: "Zwardoň",
    stationOfChange: "Skalité"
}

export const HKVVehicles_12 = [
    {
        HKVVehicleNumber: "955678120481",
        HKVType: "V - vlakové",
        trainDriverNumber: "1714",
        vehicleWagonorderBreakpercentage: "93",
        trainBreakingMode: "R",
    }
]

export const ZKVVehicles_12 = [
    {
        vehicleNumber: "615620702253",
        isDefect: true,
        konstrukcnyCelok: "KÚRENIE KLIMATIZÁCIA",
        druhZavady: "450 - Vetranie",
        detailnyPopisZavady: "test vymazania zavady",
        stationOfDefect: "Skalité",
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
        isDefect: true,
        konstrukcnyCelok: "SKRIŇA VOZŇA",
        druhZavady: "210 - Spodok vozňa",
        detailnyPopisZavady: "test spodku vozňa",
        stationOfDefect: "Čierne-Polesie",
        dopadNaVozen: "Vozeň ponechať nezmenený",
        stavVozna: "Bez zmeny",
        fotografie: "0"
    }, 
]

