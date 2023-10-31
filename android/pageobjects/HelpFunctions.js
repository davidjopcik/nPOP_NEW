import { alertMsgTrainTimeDeparture } from "./TrainDeparture"

export let dateAlertMsgTrainTimeDeparture

class HelpFunctions{

    async timeDepartureFromAlert(text){
        text = text.split("(",)[1].split(" ")[1].split(")",)[0]
        /* dateAlertMsgTrainTimeDeparture = dateAlertMsgTrainTimeDeparture.split(" ")
        dateAlertMsgTrainTimeDeparture = dateAlertMsgTrainTimeDeparture[1]
        dateAlertMsgTrainTimeDeparture = dateAlertMsgTrainTimeDeparture.split(")",)
        dateAlertMsgTrainTimeDeparture = dateAlertMsgTrainTimeDeparture[0] */
        text = text.split("")
        console.log(text);
        return text
    }

}
export default new HelpFunctions