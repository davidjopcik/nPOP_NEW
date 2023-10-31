import { user_data } from "../../constant.config";

export const ISDPOP_6 = {
    userName: user_data.username,
    password: user_data.userpassword,
    role: "Sprievodca POP vo Vlaku",
    trainCheifContact: "+421123456789",
    trainNumber: "800",
    vehicleWagonorderBreakpercentage: "80",
    trainBreakingMode: "R+Mg",
    trainLogEndStation: "Nové Zámky",
    stationOfChange: "Lučenec",
    prepatoryTrainNumber: "",
    prepatoryTrainDate: "",
}

export const HKVVehicles_6_FIRST = [
    {
        HKVVehicleNumber: "955678120044",
        HKVType: "V - vlakové",
        trainDriverNumber: "22282", //Pavel Adamek
    }
]

export const HKVVehicles_6_INSIDE = [
    {
        HKVVehicleNumber: "945604259511",
        HKVType: "L - vložené",
        trainDriverNumber: "25903", //Michl Babčan
    }
]

export const HKVVehicles_6_LAST = [
    {
        HKVVehicleNumber: "955678120069",
        HKVType: "Po - postrk",
        trainDriverNumber: "",
    }
]

export const ZKVVehicles_6_1 = [
    {
        vehicleNumber: "505420380105",
    },
    {
        vehicleNumber: "505420380170"
    },
]

export const ZKVVehicles_6_2 = [
    {
        vehicleNumber: "505621701422",
    },
]

