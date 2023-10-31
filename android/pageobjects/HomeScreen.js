import OpenApp from "./OpenApp"
import TrainNumberInsert from "./TrainNumberInsert"

export let roleSelector

class HomeScreen {

    get MainUserLoginBtnSelector() {
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/iv_layout_main_user_login"]')
    }
    get LoginNameSelector (){
        return  $('//*[@resource-id="sk.prosoft.ptt.pop:id/et_login_name"]')
    }
    get LoginPasswordSelector (){
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/et_login_pass"]')
    }
    get LoginInBtn (){
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/btn_login"]')
    }
    get RoleSelectionContinue (){
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/btn_activity_role_selection_continue"]')
    }
    get infoTrainDetailSelector (){
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/iv_activity_main_traininfo_detail"]')
    }
    get changeTrainNumberBtn (){
        return $('//*[@resource-id="sk.prosoft.ptt.pop:id/btn_fragment_main_traininfo"]')
    }

    
    async OpenAndLogin(name, password, role){
        await OpenApp.restarteApp()
        await this.Login(name, password, role)
    }

    async Login(name, password, role) {
        await this.MainUserLoginBtnSelector.click()
        await this.LoginNameSelector.setValue(name)
        await this.LoginPasswordSelector.setValue(password)
        await this.LoginInBtn.click()
        roleSelector = $('//*[@text="'+role+'"]')
        await roleSelector.click()
        await this.RoleSelectionContinue.click()
    }

    async changeTrainNumber(trainNumber,trainNumber_change, date) {
        await this.infoTrainDetailSelector.click()

        expect(await $('//*[@resource-id="sk.prosoft.ptt.pop:id/tv_activity_main_traininfo_trainname"]').getText()).toContain(trainNumber)

        await this.changeTrainNumberBtn.click()
        await TrainNumberInsert.trainAndDateSelect(trainNumber_change, date)

        expect(await $('//*[@resource-id="sk.prosoft.ptt.pop:id/tv_activity_main_traininfo_trainname"]').getText()).toContain(trainNumber_change)
    }


}


export default new HomeScreen() 