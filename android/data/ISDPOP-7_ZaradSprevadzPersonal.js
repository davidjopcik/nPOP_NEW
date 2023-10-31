import { user_data } from "../../constant.config";

export const ISDPOP_7 = {
    userName: user_data.username,
    password: user_data.userpassword,
    role: "Sprievodca POP vo Vlaku",
    trainCheifContact: "+421123456789",
    trainNumber: "801",
    vehicleWagonorderBreakpercentage: "80",
    trainBreakingMode: "R+Mg",
    trainLogEndStation: "Košice",
    stationOfChange: "Zvolen",
    prepatoryTrainNumber: "",
    prepatoryTrainDate: "",
}

export const HKVVehicles_7 = [
    {
        HKVVehicleNumber: "955678120044",
        HKVType: "V - vlakové",
        trainDriverNumber: "23889", //Peter Bobáľ
        vehicleWagonorderBreakpercentage: "96",
        trainBreakingMode: "R",
    },
    {
        HKVVehicleNumber: "945604259511",
        HKVType: "L - vložené",
        trainDriverNumber: "", 
        vehicleWagonorderBreakpercentage: "96",
        trainBreakingMode: "R+Mg",
    }
]


export const ZKVVehicles_7 = [
    {
        vehicleNumber: "505420380105",
    },
    {
        vehicleNumber: "505420380170"
    },
]

export const TrainTeam_7 = [
    {
        trainerNumber: "6594",
        trainerName: "Almašiová001 Zdena"
    },
    {
        trainerNumber: "5659",
        trainerName: "Andrezál065 Štefan"
    },
]



