class OpenApp {
    async restarteApp() {
        await driver.unlock()
        await driver.terminateApp("sk.prosoft.ptt.pop")
        await driver.activateApp("sk.prosoft.ptt.pop")
    }
    async openGoogleBrowser(){
        await driver.unlock()
        await driver.terminateApp("com.android.chrome")
        await driver.activateApp("com.android.chrome")
    }
}
export default new OpenApp()